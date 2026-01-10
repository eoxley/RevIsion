import { resend, FROM_EMAIL } from './resend';
import { ParentWeeklyProgressEmail } from './templates/parent-weekly-progress';
import { ParentWelcomeEmail } from './templates/parent-welcome';
import { createElement } from 'react';

type LearningStyle = 'visual' | 'auditory' | 'read_write' | 'kinesthetic';

// ═══════════════════════════════════════════════════════════════════════════════
// PARENT TIPS BY LEARNING STYLE
// ═══════════════════════════════════════════════════════════════════════════════

const parentTipsByStyle: Record<LearningStyle, Array<{ tip: string; reason: string }>> = {
  visual: [
    {
      tip: 'Ask to see their notes or diagrams',
      reason: 'Visual learners often remember better when they can show you what they created.',
    },
    {
      tip: 'Help create a colourful revision timetable',
      reason: 'Colour-coding subjects helps visual learners organise and remember their schedule.',
    },
    {
      tip: 'Consider getting a whiteboard for their room',
      reason: 'Being able to draw and erase helps them work through problems visually.',
    },
    {
      tip: 'Watch educational videos together',
      reason: 'Visual explanations stick better - try BBC Bitesize or YouTube explainers.',
    },
  ],
  auditory: [
    {
      tip: 'Ask them to explain a topic to you',
      reason: 'Auditory learners cement knowledge by talking through it out loud.',
    },
    {
      tip: 'Suggest recording themselves reading notes',
      reason: 'Listening back helps auditory learners retain information.',
    },
    {
      tip: 'Create a quiet study environment',
      reason: 'Auditory learners are sensitive to noise distractions.',
    },
    {
      tip: 'Discuss their subjects over dinner',
      reason: 'Casual conversation about topics helps auditory learners process information.',
    },
  ],
  read_write: [
    {
      tip: 'Provide plenty of notebooks and stationery',
      reason: 'Read/write learners need to write things down to remember them.',
    },
    {
      tip: 'Print out revision materials',
      reason: 'Physical text they can annotate is more effective than screens for these learners.',
    },
    {
      tip: 'Encourage making lists and summaries',
      reason: 'Condensing information into written form aids their memory.',
    },
    {
      tip: 'Ask to read their written summaries',
      reason: 'Knowing someone will read their work motivates more thorough note-taking.',
    },
  ],
  kinesthetic: [
    {
      tip: 'Allow movement breaks during revision',
      reason: 'Kinesthetic learners think better when they can move around.',
    },
    {
      tip: 'Try walking discussions about topics',
      reason: 'Movement helps kinesthetic learners process and remember information.',
    },
    {
      tip: 'Suggest hands-on projects related to topics',
      reason: 'Making models or experiments helps concepts stick.',
    },
    {
      tip: 'Let them use fidget tools while studying',
      reason: 'Light physical activity actually improves focus for kinesthetic learners.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEND WEEKLY PROGRESS EMAIL TO PARENT
// ═══════════════════════════════════════════════════════════════════════════════

interface WeeklyProgressData {
  parentEmail: string;
  parentName: string;
  childName: string;
  weekStartDate: string;
  weekEndDate: string;
  totalSessions: number;
  totalMinutes: number;
  daysActive: number;
  topicsImproved: number;
  topicsSecured: number;
  newMisconceptionsCleared: number;
  momentumScore: number;
  momentumTrend: 'improving' | 'stable' | 'declining';
  streakDays: number;
  subjectSummaries: Array<{
    name: string;
    colour: string;
    topicsSecure: number;
    topicsTotal: number;
    percentageComplete: number;
    sessionsThisWeek: number;
    minutesThisWeek: number;
  }>;
  topProgressTopics: Array<{
    name: string;
    subject: string;
    previousState: string;
    currentState: string;
  }>;
  areasNeedingAttention: string[];
  upcomingFocus: string[];
  primaryLearningStyle: LearningStyle;
  isInactive: boolean;
  inactivityDays?: number;
}

export async function sendParentWeeklyProgressEmail(data: WeeklyProgressData) {
  const childFirstName = data.childName.split(' ')[0];

  // Generate dynamic messages based on activity
  const summaryMessage = generateSummaryMessage(data);
  const encouragementForParent = generateParentEncouragement(data);
  const parentTips = parentTipsByStyle[data.primaryLearningStyle].slice(0, 3);

  const emailComponent = createElement(ParentWeeklyProgressEmail, {
    parentName: data.parentName,
    childName: data.childName,
    weekStartDate: data.weekStartDate,
    weekEndDate: data.weekEndDate,
    totalSessions: data.totalSessions,
    totalMinutes: data.totalMinutes,
    daysActive: data.daysActive,
    topicsImproved: data.topicsImproved,
    topicsSecured: data.topicsSecured,
    newMisconceptionsCleared: data.newMisconceptionsCleared,
    momentumScore: data.momentumScore,
    momentumTrend: data.momentumTrend,
    streakDays: data.streakDays,
    subjectSummaries: data.subjectSummaries,
    topProgressTopics: data.topProgressTopics,
    areasNeedingAttention: data.areasNeedingAttention,
    upcomingFocus: data.upcomingFocus,
    primaryLearningStyle: data.primaryLearningStyle,
    parentTips,
    summaryMessage,
    encouragementForParent,
    isInactive: data.isInactive,
    inactivityDays: data.inactivityDays,
  });

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.parentEmail,
    subject: data.isInactive
      ? `${childFirstName} hasn't revised this week - a gentle reminder`
      : `${childFirstName}'s Weekly Progress Report 📊`,
    react: emailComponent,
  });

  if (error) {
    console.error('Failed to send weekly progress email:', error);
    throw error;
  }

  return result;
}

function generateSummaryMessage(data: WeeklyProgressData): string {
  const name = data.childName.split(' ')[0];

  if (data.isInactive) {
    return `${name} didn't have any revision sessions this week. Let's get back on track!`;
  }

  if (data.momentumTrend === 'improving' && data.topicsSecured > 0) {
    return `Fantastic week! ${name} is building great momentum with ${data.topicsSecured} topics now secure.`;
  }

  if (data.daysActive >= 5) {
    return `${name} showed excellent consistency this week, revising on ${data.daysActive} days!`;
  }

  if (data.topicsImproved > 3) {
    return `Great progress! ${name} improved understanding in ${data.topicsImproved} topics this week.`;
  }

  if (data.totalSessions > 0) {
    return `${name} completed ${data.totalSessions} revision session${data.totalSessions > 1 ? 's' : ''} this week.`;
  }

  return `Here's ${name}'s revision summary for this week.`;
}

function generateParentEncouragement(data: WeeklyProgressData): string {
  const name = data.childName.split(' ')[0];

  if (data.isInactive) {
    return `Don't worry - sometimes students need a break. A quick chat about what's been difficult might help ${name} get back into revision.`;
  }

  if (data.streakDays >= 7) {
    return `Amazing! ${name}'s week-long streak shows real dedication. A little recognition from you would mean the world to them!`;
  }

  if (data.momentumTrend === 'declining') {
    return `${name}'s momentum has dipped a bit this week. Sometimes just asking "How's revision going?" can help them refocus.`;
  }

  if (data.topicsSecured > 2) {
    return `${name} is making solid progress. Consider celebrating these wins together - positive reinforcement really helps!`;
  }

  return `Keep encouraging ${name}'s revision efforts. Your support makes a bigger difference than you might think!`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEND WELCOME EMAIL TO PARENT
// ═══════════════════════════════════════════════════════════════════════════════

interface WelcomeEmailData {
  parentEmail: string;
  parentName: string;
  childName: string;
  primaryStyles: LearningStyle[];
  isMultimodal: boolean;
  styleBreakdown: Array<{
    style: LearningStyle;
    percentage: number;
    strength: 'very_strong' | 'strong' | 'moderate' | 'mild';
  }>;
  enrolledSubjects: string[];
}

export async function sendParentWelcomeEmail(data: WelcomeEmailData) {
  const childFirstName = data.childName.split(' ')[0];
  const primaryStyle = data.primaryStyles[0];

  // Generate learning description based on style
  const learningDescription = generateLearningDescription(
    data.primaryStyles,
    data.isMultimodal,
    childFirstName
  );

  // Get study tips for primary style
  const studyTips = getStudyTips(primaryStyle);

  // Define next steps
  const nextSteps = [
    {
      step: 'Initial Diagnostic',
      description: `We'll assess where ${childFirstName} currently stands in each subject to find gaps and strengths.`,
      icon: '🔍',
    },
    {
      step: 'Personalised Revision Plan',
      description: `Based on the diagnostic, we'll create a tailored plan focusing on what ${childFirstName} needs most.`,
      icon: '📋',
    },
    {
      step: 'Adaptive Learning Sessions',
      description: `Each session adapts to ${childFirstName}'s learning style and current understanding.`,
      icon: '🎯',
    },
    {
      step: 'Weekly Progress Reports',
      description: `You'll receive updates every Sunday showing progress, wins, and areas needing attention.`,
      icon: '📊',
    },
  ];

  const emailComponent = createElement(ParentWelcomeEmail, {
    parentName: data.parentName,
    childName: data.childName,
    primaryStyles: data.primaryStyles,
    isMultimodal: data.isMultimodal,
    styleBreakdown: data.styleBreakdown,
    learningDescription,
    studyTips,
    nextSteps,
    enrolledSubjects: data.enrolledSubjects,
    dashboardUrl: 'https://myrevisionary.com/parent-dashboard',
  });

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.parentEmail,
    subject: `Welcome to myrevisionary! ${childFirstName}'s Learning Profile is Ready`,
    react: emailComponent,
  });

  if (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }

  return result;
}

function generateLearningDescription(
  styles: LearningStyle[],
  isMultimodal: boolean,
  childName: string
): string {
  const styleDescriptions: Record<LearningStyle, string> = {
    visual: 'processes information best through images, diagrams, and visual representations. They tend to think in pictures and benefit from colour-coding, mind maps, and charts',
    auditory: 'learns most effectively through listening and verbal communication. They remember better when information is spoken and benefit from discussions, audio content, and explaining concepts aloud',
    read_write: 'prefers learning through written words. They excel with reading, note-taking, and written explanations. Lists, written summaries, and text-based resources work best for them',
    kinesthetic: 'learns through hands-on experience and movement. They need to actively engage with material - through practice, experiments, or physical interaction with concepts',
  };

  if (isMultimodal && styles.length > 1) {
    const styleNames = styles.map(s => s === 'read_write' ? 'Read/Write' : s.charAt(0).toUpperCase() + s.slice(1));
    return `${childName} is a multimodal learner, which means they can effectively use multiple learning approaches. Their strongest styles are ${styleNames.join(' and ')}. This flexibility is an advantage - they can adapt to different teaching methods and use various study techniques effectively.`;
  }

  const primaryStyle = styles[0];
  return `${childName} ${styleDescriptions[primaryStyle]}.`;
}

function getStudyTips(style: LearningStyle): string[] {
  const tips: Record<LearningStyle, string[]> = {
    visual: [
      'Use colour-coded notes and highlighters',
      'Create mind maps and flow charts',
      'Watch video explanations and tutorials',
      'Draw diagrams to represent concepts',
      'Use flashcards with images',
    ],
    auditory: [
      'Listen to audio explanations and podcasts',
      'Discuss topics with others',
      'Read notes aloud when studying',
      'Use mnemonic devices and rhymes',
      'Record yourself explaining topics to play back later',
    ],
    read_write: [
      'Take detailed written notes',
      'Rewrite information in your own words',
      'Create lists and bullet points',
      'Read textbooks and written guides',
      'Write practice essays and answers',
    ],
    kinesthetic: [
      'Take frequent study breaks with movement',
      'Use physical objects to represent concepts',
      'Practice past papers and worked examples',
      'Create models or demonstrations',
      'Study while walking or moving',
    ],
  };
  return tips[style];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export { parentTipsByStyle };
