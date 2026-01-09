// Learning Profile Generator
// Creates personalized learning profiles based on VARK results

export interface VARKScores {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

export interface LearningProfile {
  // Profile Summary
  profileType: string;
  profileDescription: string;
  strengthStatement: string;

  // Learning Approach
  bestTimeToStudy: string;
  idealSessionLength: string;
  breakStrategy: string;
  environmentTips: string[];

  // Revision Strategy
  revisionApproach: string;
  dailyRoutine: string[];
  weeklyGoals: string[];

  // Subject-Specific Strategies
  subjectStrategies: {
    subject: string;
    techniques: string[];
    resources: string[];
  }[];

  // Tools & Resources
  primaryTools: string[];
  recommendedApps: string[];
  youtubeChannels: string[];
  websites: string[];

  // Exam Techniques
  examPrep: string[];
  examDayTips: string[];

  // Motivation & Mindset
  motivationStyle: string;
  rewardSuggestions: string[];

  // Warnings & Pitfalls
  commonMistakes: string[];
  avoidThese: string[];
}

export function generateLearningProfile(vark: VARKScores): LearningProfile {
  const { visual, auditory, readWrite, kinesthetic, primaryStyles, isMultimodal } = vark;

  // Determine profile type
  const profileType = getProfileType(primaryStyles, isMultimodal);

  // Generate profile based on dominant style(s)
  const profile: LearningProfile = {
    profileType,
    profileDescription: getProfileDescription(primaryStyles, isMultimodal, vark),
    strengthStatement: getStrengthStatement(vark),

    bestTimeToStudy: getBestStudyTime(primaryStyles),
    idealSessionLength: getSessionLength(primaryStyles),
    breakStrategy: getBreakStrategy(primaryStyles),
    environmentTips: getEnvironmentTips(primaryStyles),

    revisionApproach: getRevisionApproach(primaryStyles, isMultimodal),
    dailyRoutine: getDailyRoutine(primaryStyles, vark),
    weeklyGoals: getWeeklyGoals(primaryStyles),

    subjectStrategies: getSubjectStrategies(primaryStyles),

    primaryTools: getPrimaryTools(primaryStyles),
    recommendedApps: getRecommendedApps(primaryStyles),
    youtubeChannels: getYouTubeChannels(primaryStyles),
    websites: getWebsites(primaryStyles),

    examPrep: getExamPrep(primaryStyles),
    examDayTips: getExamDayTips(primaryStyles),

    motivationStyle: getMotivationStyle(primaryStyles),
    rewardSuggestions: getRewardSuggestions(primaryStyles),

    commonMistakes: getCommonMistakes(primaryStyles),
    avoidThese: getAvoidThese(primaryStyles),
  };

  return profile;
}

function getProfileType(primaryStyles: string[], isMultimodal: boolean): string {
  if (isMultimodal) {
    if (primaryStyles.length === 4) return "The Complete Learner";
    if (primaryStyles.length === 3) return "The Versatile Learner";
    if (primaryStyles.includes("visual") && primaryStyles.includes("kinesthetic")) return "The Hands-On Visual";
    if (primaryStyles.includes("auditory") && primaryStyles.includes("read_write")) return "The Verbal Processor";
    if (primaryStyles.includes("visual") && primaryStyles.includes("auditory")) return "The Media Learner";
    if (primaryStyles.includes("read_write") && primaryStyles.includes("kinesthetic")) return "The Active Scholar";
    return "The Dual Learner";
  }

  switch (primaryStyles[0]) {
    case "visual": return "The Visual Mapper";
    case "auditory": return "The Verbal Learner";
    case "read_write": return "The Scholar";
    case "kinesthetic": return "The Hands-On Learner";
    default: return "The Balanced Learner";
  }
}

function getProfileDescription(primaryStyles: string[], isMultimodal: boolean, vark: VARKScores): string {
  if (isMultimodal) {
    return `You're a versatile learner who thrives when combining multiple approaches. Your brain processes information through ${primaryStyles.map(s => s.replace("_", "/")).join(" and ")} channels equally well. This is a superpower - use it by mixing different revision methods for maximum retention.`;
  }

  const descriptions: Record<string, string> = {
    visual: `Your brain is wired to process visual information (${vark.visual}% visual). You think in pictures, remember faces better than names, and understand concepts best when you can SEE them. Diagrams, colours, and spatial layouts are your secret weapons.`,
    auditory: `Your brain excels at processing sound (${vark.auditory}% auditory). You remember conversations, learn from lectures, and think in words and sounds. Discussion, explanation, and listening are your natural learning tools.`,
    read_write: `Your brain thrives on text (${vark.readWrite}% read/write). You process information best through reading and writing, love lists and notes, and remember written words. Traditional study methods work brilliantly for you.`,
    kinesthetic: `Your brain learns through doing (${vark.kinesthetic}% kinesthetic). You need to experience things to understand them, remember what you've practiced, and think best while moving. Action-based learning is your strength.`,
  };

  return descriptions[primaryStyles[0]] || descriptions.visual;
}

function getStrengthStatement(vark: VARKScores): string {
  const scores = [
    { style: "Visual", score: vark.visual },
    { style: "Auditory", score: vark.auditory },
    { style: "Read/Write", score: vark.readWrite },
    { style: "Kinesthetic", score: vark.kinesthetic },
  ].sort((a, b) => b.score - a.score);

  const strongest = scores[0];
  const secondStrong = scores[1];

  if (strongest.score - secondStrong.score <= 5) {
    return `Your ${strongest.style} and ${secondStrong.style} abilities are both strong (${strongest.score}% and ${secondStrong.score}%). Combine these for powerful revision sessions.`;
  }

  return `Your ${strongest.style} learning is your dominant strength at ${strongest.score}%. Lead with this in all your revision.`;
}

function getBestStudyTime(primaryStyles: string[]): string {
  if (primaryStyles.includes("kinesthetic")) {
    return "Study when you have energy to move - mornings or after exercise work well. Avoid studying when tired.";
  }
  if (primaryStyles.includes("auditory")) {
    return "Study when your environment is quiet enough to focus on audio, or when you can speak aloud without disturbing others.";
  }
  if (primaryStyles.includes("visual")) {
    return "Study in good lighting conditions. Natural daylight or bright artificial light helps visual processing.";
  }
  return "Study when you're most alert and can focus on reading. Many read/write learners prefer evening sessions.";
}

function getSessionLength(primaryStyles: string[]): string {
  if (primaryStyles.includes("kinesthetic")) {
    return "25-30 minute sessions maximum. Your brain needs movement breaks to process information.";
  }
  if (primaryStyles.includes("auditory")) {
    return "30-45 minute sessions. Audio learning can be sustained but needs variety to stay engaging.";
  }
  if (primaryStyles.includes("visual")) {
    return "35-45 minute sessions. Visual processing is efficient but eyes need regular breaks.";
  }
  return "45-60 minute sessions. Read/write learners can sustain longer focused reading periods.";
}

function getBreakStrategy(primaryStyles: string[]): string {
  if (primaryStyles.includes("kinesthetic")) {
    return "Take active breaks: walk, stretch, do jumping jacks, or grab a snack. Movement helps consolidate learning.";
  }
  if (primaryStyles.includes("auditory")) {
    return "Take quiet breaks or listen to music. Give your ears a rest from focused listening.";
  }
  if (primaryStyles.includes("visual")) {
    return "Look away from screens, gaze out the window at distant objects. Rest your eyes every 20 minutes.";
  }
  return "Step away from text completely. Do something non-reading related like a quick walk or snack.";
}

function getEnvironmentTips(primaryStyles: string[]): string[] {
  const tips: string[] = [];

  if (primaryStyles.includes("visual")) {
    tips.push("Good lighting is essential - natural light is best");
    tips.push("Clear desk with organised, colour-coded materials");
    tips.push("Wall space for mind maps and posters");
    tips.push("Use a large monitor or tablet for diagrams");
  }

  if (primaryStyles.includes("auditory")) {
    tips.push("Quiet space where you can speak aloud");
    tips.push("Good quality headphones for audio content");
    tips.push("Access to voice recording app on phone");
    tips.push("Space for pacing while talking through concepts");
  }

  if (primaryStyles.includes("read_write")) {
    tips.push("Comfortable desk and chair for long sessions");
    tips.push("Multiple notebooks and quality pens");
    tips.push("Access to textbooks and revision guides");
    tips.push("Minimal distractions from screens");
  }

  if (primaryStyles.includes("kinesthetic")) {
    tips.push("Space to move around and pace");
    tips.push("Standing desk option if possible");
    tips.push("Fidget tools for focused thinking");
    tips.push("Flashcards and physical sorting materials");
  }

  return tips;
}

function getRevisionApproach(primaryStyles: string[], isMultimodal: boolean): string {
  if (isMultimodal) {
    return "Use a rotation system: for each topic, cycle through different methods. Start with your strongest style, then reinforce with your secondary style. This multi-channel approach creates stronger memory connections.";
  }

  const approaches: Record<string, string> = {
    visual: "Transform everything into visuals. Before reading any topic, draw what you expect to learn. After studying, create a mind map from memory. Your revision should produce a wall full of colourful summaries.",
    auditory: "Make revision a conversation. Read aloud, explain to others, record yourself, and discuss with study partners. Your revision should sound like a podcast episode by the end.",
    read_write: "Write extensively. Summarise, list, rewrite, and condense. Your revision should produce notebooks full of organised notes and written practice answers.",
    kinesthetic: "Practice relentlessly. Do past papers, sort flashcards, walk while reviewing. Your revision should feel active, not passive. If you're sitting still too long, you're doing it wrong.",
  };

  return approaches[primaryStyles[0]] || approaches.visual;
}

function getDailyRoutine(primaryStyles: string[], vark: VARKScores): string[] {
  const routine: string[] = [];

  routine.push("📅 DAILY REVISION ROUTINE");

  if (primaryStyles.includes("visual")) {
    routine.push("1. Start: Quick review of yesterday's mind map (5 mins)");
    routine.push("2. Watch: Video explanation of new topic (15 mins)");
    routine.push("3. Create: Draw your own diagram/mind map (20 mins)");
    routine.push("4. Review: Look over your visual notes (10 mins)");
  }

  if (primaryStyles.includes("auditory")) {
    routine.push("1. Start: Listen to audio summary of yesterday's topic (5 mins)");
    routine.push("2. Learn: Watch/listen to new content (15 mins)");
    routine.push("3. Process: Explain the topic aloud to yourself (15 mins)");
    routine.push("4. Record: Make an audio note summarising key points (10 mins)");
  }

  if (primaryStyles.includes("read_write")) {
    routine.push("1. Start: Read over yesterday's notes (5 mins)");
    routine.push("2. Read: Study new content from textbook (20 mins)");
    routine.push("3. Write: Create detailed notes in own words (20 mins)");
    routine.push("4. Summarise: Write 5 key points from memory (10 mins)");
  }

  if (primaryStyles.includes("kinesthetic")) {
    routine.push("1. Start: Quick flashcard review while standing (5 mins)");
    routine.push("2. Learn: Active reading with highlighting (15 mins)");
    routine.push("3. Practice: Past paper questions (25 mins)");
    routine.push("4. Sort: Organise flashcards into know/don't know (10 mins)");
  }

  routine.push("5. End: Plan tomorrow's topics (5 mins)");

  return routine;
}

function getWeeklyGoals(primaryStyles: string[]): string[] {
  const goals: string[] = [];

  goals.push("📊 WEEKLY TARGETS");

  if (primaryStyles.includes("visual")) {
    goals.push("• Create 3-5 mind maps for different topics");
    goals.push("• Watch at least 10 educational videos");
    goals.push("• Add 5 new visual summaries to your wall");
  }

  if (primaryStyles.includes("auditory")) {
    goals.push("• Record 5 audio summaries of topics");
    goals.push("• Have 2 study discussions with friends/family");
    goals.push("• Listen to 1 hour of GCSE Pod content");
  }

  if (primaryStyles.includes("read_write")) {
    goals.push("• Write detailed notes for 5 topics");
    goals.push("• Complete 3 full written past paper answers");
    goals.push("• Create 10 pages of revision summaries");
  }

  if (primaryStyles.includes("kinesthetic")) {
    goals.push("• Complete 5 timed past papers");
    goals.push("• Make and sort 50 new flashcards");
    goals.push("• Do 3 practical experiments or activities");
  }

  goals.push("• Review all weak areas identified");
  goals.push("• Take at least 1 full mock exam");

  return goals;
}

function getSubjectStrategies(primaryStyles: string[]): { subject: string; techniques: string[]; resources: string[] }[] {
  const strategies = [];

  // Maths
  const mathsTechniques: string[] = [];
  const mathsResources: string[] = [];

  if (primaryStyles.includes("visual")) {
    mathsTechniques.push("Draw diagrams for every word problem");
    mathsTechniques.push("Use colour-coded formula sheets");
    mathsTechniques.push("Watch worked examples on video");
    mathsResources.push("Cognito Maths YouTube");
  }
  if (primaryStyles.includes("auditory")) {
    mathsTechniques.push("Talk through each step of problems aloud");
    mathsTechniques.push("Create rhymes for formulas");
    mathsResources.push("HegartyMaths video explanations");
  }
  if (primaryStyles.includes("read_write")) {
    mathsTechniques.push("Write out method steps in words");
    mathsTechniques.push("Keep a formula notebook");
    mathsResources.push("CGP Maths Revision Guide");
  }
  if (primaryStyles.includes("kinesthetic")) {
    mathsTechniques.push("Practice, practice, practice past papers");
    mathsTechniques.push("Use physical objects for geometry");
    mathsResources.push("Corbettmaths worksheets");
  }

  strategies.push({ subject: "Mathematics", techniques: mathsTechniques, resources: mathsResources });

  // English
  const englishTechniques: string[] = [];
  const englishResources: string[] = [];

  if (primaryStyles.includes("visual")) {
    englishTechniques.push("Create character/theme mind maps");
    englishTechniques.push("Visualise scenes from texts");
    englishResources.push("Mr Bruff YouTube");
  }
  if (primaryStyles.includes("auditory")) {
    englishTechniques.push("Listen to audiobook versions of texts");
    englishTechniques.push("Discuss themes with study partners");
    englishResources.push("GCSE Pod English");
  }
  if (primaryStyles.includes("read_write")) {
    englishTechniques.push("Write essay plans and full essays");
    englishTechniques.push("Create quote banks with analysis");
    englishResources.push("York Notes revision guides");
  }
  if (primaryStyles.includes("kinesthetic")) {
    englishTechniques.push("Act out key scenes");
    englishTechniques.push("Write timed essay practice");
    englishResources.push("Past paper practice");
  }

  strategies.push({ subject: "English", techniques: englishTechniques, resources: englishResources });

  // Science
  const scienceTechniques: string[] = [];
  const scienceResources: string[] = [];

  if (primaryStyles.includes("visual")) {
    scienceTechniques.push("Draw and label diagrams");
    scienceTechniques.push("Watch practical demonstrations");
    scienceResources.push("FreeScienceLessons YouTube");
  }
  if (primaryStyles.includes("auditory")) {
    scienceTechniques.push("Explain processes aloud step by step");
    scienceTechniques.push("Create mnemonics for sequences");
    scienceResources.push("Cognito Science");
  }
  if (primaryStyles.includes("read_write")) {
    scienceTechniques.push("Write detailed notes on each topic");
    scienceTechniques.push("Create definition lists");
    scienceResources.push("CGP Science guides");
  }
  if (primaryStyles.includes("kinesthetic")) {
    scienceTechniques.push("Do practicals and experiments");
    scienceTechniques.push("Build models of structures");
    scienceResources.push("Required practicals revision");
  }

  strategies.push({ subject: "Science", techniques: scienceTechniques, resources: scienceResources });

  return strategies;
}

function getPrimaryTools(primaryStyles: string[]): string[] {
  const tools: string[] = [];

  if (primaryStyles.includes("visual")) {
    tools.push("🎨 Mind mapping software (MindMeister, SimpleMind)");
    tools.push("🖍️ Coloured pens, highlighters, sticky notes");
    tools.push("📺 YouTube for video explanations");
    tools.push("📸 Phone camera for visual note-taking");
  }

  if (primaryStyles.includes("auditory")) {
    tools.push("🎧 Quality headphones");
    tools.push("🎤 Voice recording app");
    tools.push("🎵 GCSE Pod subscription");
    tools.push("👥 Study group or revision partner");
  }

  if (primaryStyles.includes("read_write")) {
    tools.push("📓 Quality notebooks (multiple subjects)");
    tools.push("🖊️ Good pens for extended writing");
    tools.push("📚 CGP/revision guide collection");
    tools.push("📋 Specification checklist printouts");
  }

  if (primaryStyles.includes("kinesthetic")) {
    tools.push("🃏 Flashcard system (physical or Anki)");
    tools.push("⏱️ Timer for Pomodoro sessions");
    tools.push("📝 Past paper collection");
    tools.push("🎯 Whiteboard for active problem solving");
  }

  return tools;
}

function getRecommendedApps(primaryStyles: string[]): string[] {
  const apps: string[] = [];

  if (primaryStyles.includes("visual")) {
    apps.push("Quizlet (visual flashcards)");
    apps.push("SimpleMind (mind mapping)");
    apps.push("Canva (create visual summaries)");
  }

  if (primaryStyles.includes("auditory")) {
    apps.push("GCSE Pod (audio lessons)");
    apps.push("Voice Memos (record yourself)");
    apps.push("Spotify (study playlists)");
  }

  if (primaryStyles.includes("read_write")) {
    apps.push("Notion (organised notes)");
    apps.push("Google Docs (writing practice)");
    apps.push("Forest (focus timer)");
  }

  if (primaryStyles.includes("kinesthetic")) {
    apps.push("Anki (spaced repetition)");
    apps.push("Seneca (interactive quizzes)");
    apps.push("Forest (Pomodoro timer)");
  }

  return Array.from(new Set(apps)); // Remove duplicates
}

function getYouTubeChannels(primaryStyles: string[]): string[] {
  return [
    "Cognito (Maths & Science)",
    "FreeScienceLessons (Science)",
    "Mr Bruff (English)",
    "TLMaths (Mathematics)",
    "History Matters (History)",
    "MrMcMillanREvis (Religious Studies)",
  ];
}

function getWebsites(primaryStyles: string[]): string[] {
  return [
    "BBC Bitesize - bbc.co.uk/bitesize",
    "Seneca Learning - senecalearning.com",
    "Physics & Maths Tutor - physicsandmathstutor.com",
    "Corbettmaths - corbettmaths.com",
    "Oak National Academy - thenational.academy",
  ];
}

function getExamPrep(primaryStyles: string[]): string[] {
  const prep: string[] = [];

  prep.push("📝 EXAM PREPARATION STRATEGY");

  if (primaryStyles.includes("visual")) {
    prep.push("Create a visual 'cheat sheet' for each subject (won't use in exam but helps memorise)");
    prep.push("Review all your mind maps and diagrams");
    prep.push("Visualise yourself succeeding in the exam");
  }

  if (primaryStyles.includes("auditory")) {
    prep.push("Record key facts and listen on repeat");
    prep.push("Explain topics to family the night before");
    prep.push("Use verbal affirmations: 'I know this material'");
  }

  if (primaryStyles.includes("read_write")) {
    prep.push("Write a condensed summary of key points");
    prep.push("Review all your written notes");
    prep.push("Write out any formulas or quotes from memory");
  }

  if (primaryStyles.includes("kinesthetic")) {
    prep.push("Do a final timed past paper");
    prep.push("Quick flashcard sort of key topics");
    prep.push("Take a walk to burn nervous energy");
  }

  prep.push("Get 8 hours sleep - your brain consolidates learning while sleeping");
  prep.push("Prepare everything the night before (pens, calculator, ID)");

  return prep;
}

function getExamDayTips(primaryStyles: string[]): string[] {
  const tips: string[] = [];

  if (primaryStyles.includes("visual")) {
    tips.push("Quickly sketch any diagrams you might need in the margin");
    tips.push("Visualise your revision wall before starting");
    tips.push("Use spacing and layout to organise your answers");
  }

  if (primaryStyles.includes("auditory")) {
    tips.push("Silently 'hear' the question being asked");
    tips.push("Mentally talk through your answers before writing");
    tips.push("If stuck, imagine explaining the topic to a friend");
  }

  if (primaryStyles.includes("read_write")) {
    tips.push("Read each question twice, underlining key words");
    tips.push("Write brief plans before long answers");
    tips.push("Check your written answers make sense when read back");
  }

  if (primaryStyles.includes("kinesthetic")) {
    tips.push("Physically cross off completed questions");
    tips.push("Move position if you feel stuck");
    tips.push("Use finger to track as you read questions");
  }

  tips.push("Stay calm - you've prepared in the way that works for YOUR brain");

  return tips;
}

function getMotivationStyle(primaryStyles: string[]): string {
  if (primaryStyles.includes("kinesthetic")) {
    return "You're motivated by progress and action. Track completed past papers, celebrate finished topics, and keep moving forward. Visible progress charts work well for you.";
  }
  if (primaryStyles.includes("visual")) {
    return "You're motivated by seeing your progress. Use a visual tracker, colour in completed topics, and create a 'vision board' of your goals.";
  }
  if (primaryStyles.includes("auditory")) {
    return "You're motivated by positive self-talk and encouragement from others. Study with supportive friends and verbally acknowledge your achievements.";
  }
  return "You're motivated by ticking off lists and completing tasks. Keep detailed to-do lists and enjoy crossing off completed revision.";
}

function getRewardSuggestions(primaryStyles: string[]): string[] {
  const rewards: string[] = [];

  if (primaryStyles.includes("visual")) {
    rewards.push("Watch an episode of your favourite show");
    rewards.push("Scroll through social media for 10 mins");
  }
  if (primaryStyles.includes("auditory")) {
    rewards.push("Listen to your favourite playlist");
    rewards.push("Call or text a friend");
  }
  if (primaryStyles.includes("kinesthetic")) {
    rewards.push("Go for a walk or workout");
    rewards.push("Play a video game for 20 mins");
  }
  if (primaryStyles.includes("read_write")) {
    rewards.push("Read a chapter of a book for fun");
    rewards.push("Write in your journal");
  }

  rewards.push("Have your favourite snack");
  rewards.push("Take a proper break outside");

  return rewards;
}

function getCommonMistakes(primaryStyles: string[]): string[] {
  const mistakes: string[] = [];

  mistakes.push("⚠️ COMMON MISTAKES TO AVOID");

  if (primaryStyles.includes("visual")) {
    mistakes.push("Spending too long making notes 'pretty' instead of learning");
    mistakes.push("Only watching videos without active engagement");
    mistakes.push("Creating mind maps but never reviewing them");
  }

  if (primaryStyles.includes("auditory")) {
    mistakes.push("Listening passively without engaging with content");
    mistakes.push("Relying only on others to explain things");
    mistakes.push("Not practicing written answers for exams");
  }

  if (primaryStyles.includes("read_write")) {
    mistakes.push("Just reading without testing yourself");
    mistakes.push("Copying notes without understanding");
    mistakes.push("Avoiding practice questions");
  }

  if (primaryStyles.includes("kinesthetic")) {
    mistakes.push("Doing past papers without reviewing mistakes");
    mistakes.push("Getting frustrated when sitting still too long");
    mistakes.push("Not taking enough structured breaks");
  }

  return mistakes;
}

function getAvoidThese(primaryStyles: string[]): string[] {
  const avoid: string[] = [];

  if (primaryStyles.includes("visual")) {
    avoid.push("Long text-heavy notes without visuals");
    avoid.push("Studying in poor lighting");
  }

  if (primaryStyles.includes("auditory")) {
    avoid.push("Studying in complete silence (some background helps)");
    avoid.push("Only reading without speaking aloud");
  }

  if (primaryStyles.includes("read_write")) {
    avoid.push("Just highlighting without rewriting");
    avoid.push("Relying only on video content");
  }

  if (primaryStyles.includes("kinesthetic")) {
    avoid.push("Long passive study sessions");
    avoid.push("Studying in one position for hours");
  }

  avoid.push("Comparing yourself to others who learn differently");
  avoid.push("Using revision methods that don't match your style");

  return avoid;
}
