// Revision Planning and Timelines for UK GCSE Students
// Covers all timeframes from 2 weeks to full Year 10-11 journey

export interface RevisionPhase {
  name: string;
  timeframe: string;
  priority: "critical" | "high" | "medium" | "foundation";
  focus: string[];
  dailyHours: { min: number; max: number };
  techniques: string[];
  avoid: string[];
  milestones: string[];
}

export interface WeeklyPlan {
  week: number;
  theme: string;
  goals: string[];
  subjects: string[];
  practiceTests: number;
}

export interface DailySchedule {
  timeSlot: string;
  duration: string;
  activity: string;
  notes: string;
}

// Key UK School Calendar Dates
export const ukSchoolCalendar2025_2026 = {
  yearStart: "September 2025",
  halfTerm1: "26 October - 1 November 2025",
  christmasBreak: "20 December 2025 - 4 January 2026",
  halfTerm2: "14 - 22 February 2026",
  easterBreak: "28 March - 12 April 2026",
  mayBankHoliday: "4 May 2026",
  halfTerm3: "23 - 31 May 2026",
  gcseExamsStart: "11 May 2026",
  gcseExamsEnd: "26 June 2026",
  resultsDay: "20 August 2026",

  // Key revision periods
  mockExams: "December 2025 / January 2026",
  finalRevisionPeriod: "April - May 2026",
  studyLeaveStarts: "Approximately 8 May 2026"
};

// Different Revision Phases Based on Time Remaining
export const revisionPhases: { [timeframe: string]: RevisionPhase } = {

  // EMERGENCY: 2 weeks or less
  "2_weeks": {
    name: "Crisis Mode - Last 2 Weeks",
    timeframe: "14 days or less before exams",
    priority: "critical",
    focus: [
      "Past papers under timed conditions",
      "Mark schemes - learn what examiners want",
      "Key topics ONLY - don't try to learn new content",
      "Exam technique refinement",
      "Memory tricks for must-know facts"
    ],
    dailyHours: { min: 4, max: 6 },
    techniques: [
      "Do one full past paper per subject per day",
      "Review mark schemes immediately after",
      "Create one-page summary sheets for each topic",
      "Use flashcards for key facts/formulas",
      "Practice 6-mark questions",
      "Focus on your STRONGEST topics first (secure marks)",
      "Then tackle topics worth most marks"
    ],
    avoid: [
      "Learning entirely new topics from scratch",
      "Rewriting all your notes",
      "Panicking - you know more than you think",
      "All-nighters - sleep is essential for memory",
      "Comparing yourself to others"
    ],
    milestones: [
      "Day 1-3: Identify your 5 weakest topics per subject",
      "Day 4-7: Complete 2-3 past papers per subject",
      "Day 8-10: Focus on exam technique and timing",
      "Day 11-13: Quick review of all summary sheets",
      "Day 14: Light review only, prepare for exam day"
    ]
  },

  // SHORT: 1 month
  "1_month": {
    name: "Intensive Mode - 1 Month",
    timeframe: "4-5 weeks before exams",
    priority: "high",
    focus: [
      "Complete syllabus review (rapid)",
      "Identify and target weak areas",
      "Regular past paper practice",
      "Build exam stamina",
      "Active revision techniques"
    ],
    dailyHours: { min: 3, max: 5 },
    techniques: [
      "Week 1: Rapid review of all topics, make condensed notes",
      "Week 2-3: Focus on weak areas, daily past paper questions",
      "Week 4: Full past papers, exam conditions",
      "Use Pomodoro technique (25 min work, 5 min break)",
      "Teach topics to someone else",
      "Create mind maps for connections",
      "Daily flashcard review (10-15 mins)"
    ],
    avoid: [
      "Passive reading without testing yourself",
      "Skipping subjects you find boring",
      "Burning out with too many hours",
      "Ignoring required practicals (Science)",
      "Forgetting to do timed practice"
    ],
    milestones: [
      "End of Week 1: Completed topic checklist, identified weak areas",
      "End of Week 2: Addressed 50% of weak topics",
      "End of Week 3: All weak topics covered, 2+ papers done per subject",
      "End of Week 4: Exam ready, 3+ papers done per subject, timing perfected"
    ]
  },

  // MEDIUM: 2-3 months (Easter revision period)
  "2_3_months": {
    name: "Strategic Mode - 2-3 Months",
    timeframe: "8-12 weeks before exams (Easter period)",
    priority: "high",
    focus: [
      "Complete content coverage",
      "Build strong foundations in weak areas",
      "Regular testing and feedback",
      "Develop exam technique",
      "Balance all subjects"
    ],
    dailyHours: { min: 2, max: 4 },
    techniques: [
      "Create a revision timetable covering all subjects",
      "Allocate more time to weaker subjects",
      "Complete one topic per day with notes + questions",
      "Weekly past paper practice (at least 1 per subject)",
      "Use specification as checklist",
      "Join study groups for discussion",
      "Regular self-testing with retrieval practice"
    ],
    avoid: [
      "Leaving any subject untouched for weeks",
      "Only revising favourite subjects",
      "Making notes without testing",
      "Ignoring mark schemes",
      "Procrastinating on hard topics"
    ],
    milestones: [
      "Month 1: All content reviewed once, notes complete",
      "Month 2: Weak areas improved, regular testing routine",
      "Month 3 (if applicable): Exam conditions practice, timing perfect"
    ]
  },

  // LONG: Full Year 11 (September start)
  "full_year": {
    name: "Journey Mode - Full Year 11",
    timeframe: "September to May (9 months)",
    priority: "foundation",
    focus: [
      "Complete new content alongside revision",
      "Build consistent revision habits",
      "Gradual skill development",
      "Mock exam preparation",
      "Long-term retention strategies"
    ],
    dailyHours: { min: 1, max: 2.5 },
    techniques: [
      "Revise what you learned that day/week in class",
      "Create notes as you go (not all at once later)",
      "Weekly review of previous week's content",
      "Monthly past paper questions on completed topics",
      "Use spaced repetition (review after 1 day, 1 week, 1 month)",
      "Build flashcard deck throughout the year",
      "Aim for 1 hour revision per school day, more at weekends"
    ],
    avoid: [
      "Thinking 'I have loads of time'",
      "Leaving revision until after mocks",
      "Only revising before tests",
      "Not keeping organised notes",
      "Forgetting content from early in the year"
    ],
    milestones: [
      "October Half-term: Year 10 content reviewed",
      "Christmas: Mock exam preparation complete",
      "February Half-term: All Year 11 content covered once",
      "Easter: Intensive revision begins, all content known",
      "May: Exam ready, past papers completed"
    ]
  },

  // VERY LONG: Year 10 + Year 11
  "two_year": {
    name: "Foundation Mode - Year 10 Start",
    timeframe: "September Year 10 to May Year 11 (21 months)",
    priority: "foundation",
    focus: [
      "Build strong understanding of concepts",
      "Develop good study habits",
      "Regular low-intensity revision",
      "Connect topics across subjects",
      "Enjoy learning - avoid burnout"
    ],
    dailyHours: { min: 0.5, max: 1.5 },
    techniques: [
      "Review class notes weekly",
      "Complete all homework thoroughly",
      "Start flashcard collections early",
      "Read around subjects for interest",
      "Practice exam questions from Year 10",
      "Use summer between Year 10-11 productively",
      "Build core skills (essay writing, calculations)"
    ],
    avoid: [
      "Ignoring Year 10 - it counts!",
      "Intensive revision this early (pace yourself)",
      "Falling behind in class",
      "Not asking questions when confused",
      "Comparing to students in Year 11"
    ],
    milestones: [
      "Year 10 End: All Year 10 content understood and noted",
      "Summer: Light review, reading, skill building",
      "Year 11 Autumn: Ready for new content + review",
      "Year 11 Spring: Exam preparation mode",
      "Year 11 Summer: Exam success!"
    ]
  }
};

// Sample Timetable Templates
export const sampleTimetables = {

  // 2-week intensive timetable
  twoWeekPlan: {
    name: "2-Week Intensive Plan",
    weekdays: [
      { timeSlot: "9:00-10:30", duration: "90 min", activity: "Subject 1: Past paper", notes: "Full timed paper or 2x 45-min sections" },
      { timeSlot: "10:30-10:45", duration: "15 min", activity: "Break", notes: "Move around, get a snack" },
      { timeSlot: "10:45-12:00", duration: "75 min", activity: "Subject 2: Weak topics", notes: "Target specific weak areas" },
      { timeSlot: "12:00-13:00", duration: "60 min", activity: "Lunch", notes: "Proper break - eat well" },
      { timeSlot: "13:00-14:00", duration: "60 min", activity: "Subject 3: Active revision", notes: "Mind maps, flashcards, practice Qs" },
      { timeSlot: "14:00-14:15", duration: "15 min", activity: "Break", notes: "Short walk if possible" },
      { timeSlot: "14:15-15:15", duration: "60 min", activity: "Subject 4: Mark scheme review", notes: "Study mark schemes and model answers" },
      { timeSlot: "15:15-16:00", duration: "45 min", activity: "Quick fire review", notes: "Flashcards, key facts, formulas" }
    ],
    weekend: "Longer sessions OK but include proper breaks. Aim for 2 full past papers per day max.",
    totalHours: "5-6 hours/day"
  },

  // 1-month balanced timetable
  oneMonthPlan: {
    name: "1-Month Balanced Plan",
    weekStructure: [
      { day: "Monday", focus: "English + Maths", hours: 3 },
      { day: "Tuesday", focus: "Science (Bio/Chem/Phys rotation)", hours: 3 },
      { day: "Wednesday", focus: "Option Subject 1 + Review", hours: 3 },
      { day: "Thursday", focus: "Option Subject 2 + Weak areas", hours: 3 },
      { day: "Friday", focus: "Mixed practice + Past papers", hours: 3 },
      { day: "Saturday", focus: "Full past paper + Review", hours: 4 },
      { day: "Sunday", focus: "Light revision + Rest", hours: 2 }
    ],
    tips: [
      "Rotate subjects to avoid fatigue",
      "Do hardest subjects when most alert",
      "End each day by planning next day",
      "Take one full evening off per week"
    ]
  },

  // Full year weekly plan
  fullYearWeek: {
    name: "Year 11 Weekly Template",
    schoolDays: [
      { timeSlot: "After school (4-5pm)", activity: "Review today's lessons", notes: "Make notes while fresh" },
      { timeSlot: "Evening (7-8pm)", activity: "Subject revision", notes: "One subject per evening" }
    ],
    weekend: [
      { timeSlot: "Saturday morning (10-12)", activity: "Catch up/Weak areas", notes: "2 hours focused work" },
      { timeSlot: "Saturday afternoon", activity: "FREE TIME", notes: "Important for wellbeing!" },
      { timeSlot: "Sunday afternoon (2-4pm)", activity: "Plan week ahead + light review", notes: "Prepare for Monday" }
    ],
    totalWeeklyHours: "8-10 hours outside school"
  }
};

// Subject Priority Calculator
export function calculateSubjectPriority(subjects: { name: string; currentGrade: number; targetGrade: number; hoursToExam: number }[]) {
  return subjects.map(subject => {
    const gradeGap = subject.targetGrade - subject.currentGrade;
    const urgency = Math.min(10, 100 / subject.hoursToExam);
    const priority = (gradeGap * 2) + urgency;

    return {
      ...subject,
      gradeGap,
      priority,
      recommendation: gradeGap >= 2 ? "High focus needed" : gradeGap >= 1 ? "Regular revision" : "Maintain and practice"
    };
  }).sort((a, b) => b.priority - a.priority);
}

// Recommended Hours by Timeframe
export const recommendedHours = {
  "2_weeks": {
    weekday: { min: 4, max: 6 },
    weekend: { min: 5, max: 7 },
    total_per_week: { min: 30, max: 44 }
  },
  "1_month": {
    weekday: { min: 3, max: 4 },
    weekend: { min: 4, max: 6 },
    total_per_week: { min: 23, max: 32 }
  },
  "2_3_months": {
    weekday: { min: 2, max: 3 },
    weekend: { min: 3, max: 5 },
    total_per_week: { min: 16, max: 25 }
  },
  "full_year": {
    weekday: { min: 1, max: 2 },
    weekend: { min: 2, max: 3 },
    total_per_week: { min: 9, max: 16 }
  }
};

// Spaced Repetition Schedule
export const spacedRepetitionSchedule = {
  description: "Review content at increasing intervals for long-term retention",
  intervals: [
    { review: 1, timing: "Same day (evening)", duration: "10 mins", purpose: "Initial encoding" },
    { review: 2, timing: "Next day", duration: "10 mins", purpose: "Strengthen memory" },
    { review: 3, timing: "3 days later", duration: "5-10 mins", purpose: "Reinforce" },
    { review: 4, timing: "1 week later", duration: "5 mins", purpose: "Test retention" },
    { review: 5, timing: "2 weeks later", duration: "5 mins", purpose: "Long-term storage" },
    { review: 6, timing: "1 month later", duration: "5 mins", purpose: "Permanent memory" }
  ],
  tools: ["Anki (free app)", "Quizlet", "Physical flashcards with dated piles"]
};

// Break and Wellbeing Guidelines
export const wellbeingGuidelines = {
  breakFrequency: "Every 25-45 minutes (Pomodoro technique)",
  breakActivities: [
    "Walk around, stretch",
    "Get a drink or snack",
    "Look out the window (rest eyes)",
    "Brief chat with family",
    "5 minutes of fresh air"
  ],
  sleepRecommendation: {
    minimum: "8 hours",
    ideal: "9 hours",
    beforeExam: "Never sacrifice sleep for last-minute cramming"
  },
  exerciseRecommendation: "30 minutes daily - improves focus and reduces stress",
  nutrition: [
    "Regular meals - don't skip breakfast",
    "Brain foods: nuts, berries, fish, wholegrains",
    "Stay hydrated - water helps concentration",
    "Limit caffeine - max 1-2 cups coffee/tea per day",
    "Avoid energy drinks"
  ],
  stressManagement: [
    "Talk to someone if feeling overwhelmed",
    "Take full days off occasionally",
    "Remember: GCSEs are important but not everything",
    "Practice breathing exercises",
    "Celebrate small wins"
  ]
};

// Countdown Milestones
export const countdownMilestones = {
  months_6: {
    name: "6 months to go",
    focus: "All content should be covered in class. Start active revision.",
    action: "Create revision timetable, gather resources, start past paper practice"
  },
  months_3: {
    name: "3 months to go",
    focus: "Easter holidays = intensive revision period",
    action: "Complete topic reviews, do 1-2 papers per subject, address weak areas"
  },
  months_2: {
    name: "2 months to go",
    focus: "Consolidation and practice",
    action: "Regular past papers, refine technique, build exam stamina"
  },
  weeks_6: {
    name: "6 weeks to go",
    focus: "Final push preparation",
    action: "Exam board specific preparation, focus on highest-mark questions"
  },
  weeks_4: {
    name: "4 weeks to go",
    focus: "Intensive practice",
    action: "Daily past paper practice, mark scheme study"
  },
  weeks_2: {
    name: "2 weeks to go",
    focus: "Taper and refine",
    action: "Full papers under timed conditions, no new content"
  },
  week_1: {
    name: "Final week",
    focus: "Light revision and preparation",
    action: "Review summary sheets, early nights, prepare equipment"
  },
  day_before: {
    name: "Day before exam",
    focus: "Rest and prepare",
    action: "Light review only, prepare bag, early night, stay calm"
  }
};

// Helper: Get appropriate revision phase
export function getRevisionPhase(daysToExam: number): RevisionPhase {
  if (daysToExam <= 14) return revisionPhases["2_weeks"];
  if (daysToExam <= 35) return revisionPhases["1_month"];
  if (daysToExam <= 90) return revisionPhases["2_3_months"];
  return revisionPhases["full_year"];
}

// Helper: Calculate days until GCSE exams
export function daysUntilGCSE(): number {
  const gcseStart = new Date("2026-05-11");
  const today = new Date();
  const diffTime = gcseStart.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}
