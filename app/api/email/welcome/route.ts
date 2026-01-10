import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendParentWelcomeEmail } from '@/lib/email/send-emails';

// Use service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, parentEmail } = body;

    if (!studentId) {
      return NextResponse.json(
        { error: 'studentId is required' },
        { status: 400 }
      );
    }

    const result = await sendWelcomeEmailForStudent(studentId, parentEmail);

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

async function sendWelcomeEmailForStudent(studentId: string, parentEmail?: string) {
  // Get student profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', studentId)
    .single();

  if (profileError || !profile) {
    throw new Error('Student not found');
  }

  // Get VARK profile
  const { data: varkProfile, error: varkError } = await supabase
    .from('student_vark_profiles')
    .select('*')
    .eq('student_id', studentId)
    .single();

  // If no VARK profile, try getting from results table (legacy)
  let styleBreakdown: Array<{
    style: 'visual' | 'auditory' | 'read_write' | 'kinesthetic';
    percentage: number;
    strength: 'very_strong' | 'strong' | 'moderate' | 'mild';
  }> = [];

  let primaryStyles: Array<'visual' | 'auditory' | 'read_write' | 'kinesthetic'> = [];
  let isMultimodal = false;

  if (varkProfile) {
    // Use the new VARK profile structure
    styleBreakdown = [
      {
        style: 'visual' as const,
        percentage: varkProfile.visual_score,
        strength: getStrength(varkProfile.visual_score),
      },
      {
        style: 'auditory' as const,
        percentage: varkProfile.auditory_score,
        strength: getStrength(varkProfile.auditory_score),
      },
      {
        style: 'read_write' as const,
        percentage: varkProfile.read_write_score,
        strength: getStrength(varkProfile.read_write_score),
      },
      {
        style: 'kinesthetic' as const,
        percentage: varkProfile.kinesthetic_score,
        strength: getStrength(varkProfile.kinesthetic_score),
      },
    ].sort((a, b) => b.percentage - a.percentage);

    primaryStyles = varkProfile.primary_styles || [styleBreakdown[0].style];
    isMultimodal = varkProfile.is_multimodal || false;
  } else {
    // Try legacy results table
    const { data: result } = await supabase
      .from('results')
      .select('*')
      .eq('user_id', studentId)
      .order('calculated_at', { ascending: false })
      .limit(1)
      .single();

    if (result) {
      styleBreakdown = [
        {
          style: 'visual' as const,
          percentage: result.visual_percentage,
          strength: getStrength(result.visual_percentage),
        },
        {
          style: 'auditory' as const,
          percentage: result.auditory_percentage,
          strength: getStrength(result.auditory_percentage),
        },
        {
          style: 'read_write' as const,
          percentage: result.read_write_percentage,
          strength: getStrength(result.read_write_percentage),
        },
        {
          style: 'kinesthetic' as const,
          percentage: result.kinesthetic_percentage,
          strength: getStrength(result.kinesthetic_percentage),
        },
      ].sort((a, b) => b.percentage - a.percentage);

      // Determine primary styles from percentage
      const threshold = 25;
      primaryStyles = styleBreakdown
        .filter(s => s.percentage >= threshold)
        .map(s => s.style);

      if (primaryStyles.length === 0) {
        primaryStyles = [styleBreakdown[0].style];
      }

      isMultimodal = result.is_multimodal || primaryStyles.length > 1;
    } else {
      // Default if no assessment completed
      styleBreakdown = [
        { style: 'visual' as const, percentage: 25, strength: 'moderate' as const },
        { style: 'auditory' as const, percentage: 25, strength: 'moderate' as const },
        { style: 'read_write' as const, percentage: 25, strength: 'moderate' as const },
        { style: 'kinesthetic' as const, percentage: 25, strength: 'moderate' as const },
      ];
      primaryStyles = ['visual'];
      isMultimodal = false;
    }
  }

  // Get enrolled subjects
  const { data: studentSubjects } = await supabase
    .from('student_subjects')
    .select(`
      subjects (name)
    `)
    .eq('student_id', studentId);

  const enrolledSubjects = studentSubjects
    ?.map(ss => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subjects = ss.subjects as any;
      return subjects?.name as string | undefined;
    })
    .filter((name): name is string => Boolean(name)) || ['Maths', 'English Language', 'English Literature'];

  // Prepare email data
  const emailData = {
    parentEmail: parentEmail || profile.email, // Use student email if no parent email
    parentName: 'Parent/Guardian', // Would come from parent profile
    childName: `${profile.first_name} ${profile.last_name || ''}`.trim(),
    primaryStyles,
    isMultimodal,
    styleBreakdown,
    enrolledSubjects,
  };

  return sendParentWelcomeEmail(emailData);
}

function getStrength(percentage: number): 'very_strong' | 'strong' | 'moderate' | 'mild' {
  if (percentage >= 35) return 'very_strong';
  if (percentage >= 25) return 'strong';
  if (percentage >= 15) return 'moderate';
  return 'mild';
}
