import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendParentWeeklyProgressEmail } from '@/lib/email/send-emails';

// Use service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify API key or cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { studentId, parentEmail } = body;

    // If studentId is provided, send for specific student
    // Otherwise, this would be called by a cron job for all students
    if (studentId) {
      const result = await sendWeeklyProgressForStudent(studentId, parentEmail);
      return NextResponse.json({ success: true, result });
    }

    // Batch send for all students (cron job)
    const results = await sendWeeklyProgressForAllStudents();
    return NextResponse.json({
      success: true,
      sent: results.sent,
      failed: results.failed
    });

  } catch (error) {
    console.error('Error sending weekly progress email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

async function sendWeeklyProgressForStudent(studentId: string, parentEmail?: string) {
  // Get student profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', studentId)
    .single();

  if (profileError || !profile) {
    throw new Error('Student not found');
  }

  // Get VARK profile for learning style
  const { data: varkProfile } = await supabase
    .from('student_vark_profiles')
    .select('*')
    .eq('student_id', studentId)
    .single();

  // Get this week's learning sessions
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  const { data: sessions } = await supabase
    .from('learning_sessions')
    .select('*')
    .eq('student_id', studentId)
    .gte('started_at', weekStart.toISOString())
    .lte('started_at', weekEnd.toISOString());

  // Get subject summaries
  const { data: studentSubjects } = await supabase
    .from('student_subjects')
    .select(`
      *,
      subjects (name, colour)
    `)
    .eq('student_id', studentId);

  // Get topic understanding changes this week
  const { data: understandingChanges } = await supabase
    .from('understanding_state_history')
    .select(`
      *,
      topics (name, subject_id, subjects (name))
    `)
    .eq('student_id', studentId)
    .gte('changed_at', weekStart.toISOString());

  // Get current topic understanding
  const { data: topicUnderstanding } = await supabase
    .from('student_topic_understanding')
    .select(`
      *,
      topics (name, subject_id)
    `)
    .eq('student_id', studentId);

  // Get engagement record for the week
  const { data: engagementRecord } = await supabase
    .from('engagement_weekly_records')
    .select('*')
    .eq('student_id', studentId)
    .eq('week_start_date', weekStart.toISOString().split('T')[0])
    .single();

  // Calculate metrics
  const totalSessions = sessions?.length || 0;
  const totalMinutes = sessions?.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) || 0;
  const daysActive = new Set(sessions?.map(s => new Date(s.started_at).toDateString())).size;

  const isInactive = totalSessions === 0;
  let inactivityDays = 0;

  if (isInactive) {
    // Calculate days since last session
    const { data: lastSession } = await supabase
      .from('learning_sessions')
      .select('started_at')
      .eq('student_id', studentId)
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    if (lastSession) {
      inactivityDays = Math.floor(
        (Date.now() - new Date(lastSession.started_at).getTime()) / (1000 * 60 * 60 * 24)
      );
    }
  }

  // Process topic improvements
  const topicsImproved = understandingChanges?.filter(
    c => getStateLevel(c.to_state) > getStateLevel(c.from_state)
  ).length || 0;

  const topicsSecured = understandingChanges?.filter(
    c => c.to_state === 'secure'
  ).length || 0;

  // Get top progress topics
  const topProgressTopics = understandingChanges
    ?.filter(c => getStateLevel(c.to_state) > getStateLevel(c.from_state))
    .slice(0, 3)
    .map(c => ({
      name: c.topics?.name || 'Unknown Topic',
      subject: c.topics?.subjects?.name || 'Unknown Subject',
      previousState: c.from_state || 'not_understood',
      currentState: c.to_state,
    })) || [];

  // Build subject summaries
  const subjectSummaries = studentSubjects?.map(ss => {
    const subjectTopics = topicUnderstanding?.filter(
      tu => tu.topics?.subject_id === ss.subject_id
    ) || [];
    const secure = subjectTopics.filter(t => t.understanding_state === 'secure').length;
    const total = subjectTopics.length || 1;
    const subjectSessions = sessions?.filter(s => s.primary_subject_id === ss.subject_id) || [];

    return {
      name: ss.subjects?.name || 'Unknown',
      colour: ss.subjects?.colour || '#3B82F6',
      topicsSecure: secure,
      topicsTotal: total,
      percentageComplete: Math.round((secure / total) * 100),
      sessionsThisWeek: subjectSessions.length,
      minutesThisWeek: subjectSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0),
    };
  }) || [];

  // Areas needing attention (not_understood or partially_understood topics)
  const areasNeedingAttention = topicUnderstanding
    ?.filter(t => t.understanding_state === 'not_understood' || t.understanding_state === 'partially_understood')
    .slice(0, 3)
    .map(t => t.topics?.name || 'Unknown topic') || [];

  // Upcoming focus (from plan if exists)
  const upcomingFocus = [
    'Continue building understanding in core topics',
    'Practice active recall with flashcards',
    'Review any fragile topics before moving on',
  ];

  // Determine primary learning style
  const primaryLearningStyle = varkProfile?.dominant_style ||
    varkProfile?.primary_styles?.[0] ||
    'visual';

  // Prepare email data
  const emailData = {
    parentEmail: parentEmail || profile.email, // Use student email if no parent email
    parentName: 'Parent/Guardian', // Would come from parent profile if we had one
    childName: `${profile.first_name} ${profile.last_name || ''}`.trim(),
    weekStartDate: formatDate(weekStart),
    weekEndDate: formatDate(weekEnd),
    totalSessions,
    totalMinutes,
    daysActive,
    topicsImproved,
    topicsSecured,
    newMisconceptionsCleared: 0, // Would calculate from misconception_resolution_logs
    momentumScore: engagementRecord?.momentum_score || 50,
    momentumTrend: (engagementRecord?.momentum_trend || 'stable') as 'improving' | 'stable' | 'declining',
    streakDays: 0, // Would calculate from consecutive session days
    subjectSummaries,
    topProgressTopics,
    areasNeedingAttention,
    upcomingFocus,
    primaryLearningStyle: primaryLearningStyle as 'visual' | 'auditory' | 'read_write' | 'kinesthetic',
    isInactive,
    inactivityDays,
  };

  return sendParentWeeklyProgressEmail(emailData);
}

async function sendWeeklyProgressForAllStudents() {
  // Get all active students
  const { data: students, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  const results = { sent: 0, failed: 0 };

  for (const student of students || []) {
    try {
      await sendWeeklyProgressForStudent(student.id);
      results.sent++;
    } catch (err) {
      console.error(`Failed to send email for student ${student.id}:`, err);
      results.failed++;
    }
  }

  return results;
}

// Helper functions
function getWeekStart(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function getWeekEnd(): Date {
  const weekStart = getWeekStart();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short'
  });
}

function getStateLevel(state: string | null): number {
  const levels: Record<string, number> = {
    'not_understood': 0,
    'partially_understood': 1,
    'understood_fragile': 2,
    'secure': 3,
  };
  return levels[state || 'not_understood'] || 0;
}
