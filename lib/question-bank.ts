// Question Bank - Past Paper Resources, Question Styles, and Mark Schemes
// For UK GCSE 2025/2026 examinations

export interface PastPaperResource {
  examBoard: string;
  officialUrl: string;
  freeResources: string[];
  subscriptionResources: string[];
}

export interface QuestionType {
  type: string;
  marks: number[];
  timeGuide: string;
  structure: string;
  example: string;
  howToAnswer: string[];
  commonMistakes: string[];
}

export interface SubjectQuestionBank {
  subject: string;
  pastPaperSources: PastPaperResource[];
  questionTypes: QuestionType[];
  markSchemePatterns: string[];
  examTechnique: string[];
}

// Official Past Paper Sources
export const pastPaperSources: { [boardId: string]: PastPaperResource } = {
  aqa: {
    examBoard: "AQA",
    officialUrl: "https://www.aqa.org.uk/find-past-papers-and-mark-schemes",
    freeResources: [
      "AQA official website - all past papers from 2018+ free",
      "BBC Bitesize - linked past paper questions",
      "Physics & Maths Tutor - sorted by topic",
    ],
    subscriptionResources: [
      "Seneca Learning - categorised questions",
      "Save My Exams - topic questions with answers",
    ],
  },
  edexcel: {
    examBoard: "Edexcel",
    officialUrl: "https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html",
    freeResources: [
      "Pearson website - papers from 2017+ free",
      "Physics & Maths Tutor - organised by topic",
      "Maths Genie - all Edexcel maths papers",
    ],
    subscriptionResources: [
      "Save My Exams",
      "Seneca Learning",
    ],
  },
  ocr: {
    examBoard: "OCR",
    officialUrl: "https://www.ocr.org.uk/qualifications/past-paper-finder/",
    freeResources: [
      "OCR Interchange - free registration required",
      "Physics & Maths Tutor",
    ],
    subscriptionResources: [
      "Save My Exams",
      "Seneca Learning",
    ],
  },
  wjec: {
    examBoard: "WJEC/Eduqas",
    officialUrl: "https://www.wjec.co.uk/qualifications/past-papers/",
    freeResources: [
      "WJEC website - all papers free",
      "Eduqas website for England specs",
    ],
    subscriptionResources: [
      "GCSEPod",
    ],
  },
};

// MATHEMATICS Question Types
export const mathsQuestionBank: SubjectQuestionBank = {
  subject: "Mathematics",
  pastPaperSources: [pastPaperSources.aqa, pastPaperSources.edexcel],
  questionTypes: [
    {
      type: "Standard calculation",
      marks: [1, 2, 3],
      timeGuide: "1 mark = 1 minute",
      structure: "Direct calculation with clear method",
      example: "Work out 3/4 + 2/5",
      howToAnswer: [
        "Show ALL working - even if you can do it mentally",
        "Write the method steps clearly",
        "Check your answer at the end",
        "Circle or box your final answer",
      ],
      commonMistakes: [
        "Not showing working (lose method marks)",
        "Calculator errors - check by estimation",
        "Forgetting units",
      ],
    },
    {
      type: "Multi-step problem",
      marks: [4, 5, 6],
      timeGuide: "5-7 minutes",
      structure: "Problem requiring multiple steps, often in context",
      example: "A shop has a 20% sale. An item was originally £45. What is the sale price after an additional 10% loyalty discount?",
      howToAnswer: [
        "Identify what the question is asking",
        "Break into steps",
        "Show each calculation clearly",
        "Check answer makes sense in context",
      ],
      commonMistakes: [
        "Applying percentages in wrong order",
        "Not reading all parts of the question",
        "Rounding too early",
      ],
    },
    {
      type: "Prove/Show that",
      marks: [3, 4, 5],
      timeGuide: "4-6 minutes",
      structure: "Algebraic proof or demonstration",
      example: "Prove algebraically that (n+1)² - (n-1)² is always divisible by 4",
      howToAnswer: [
        "Start from the given expression",
        "Expand brackets fully",
        "Simplify step by step",
        "Show clearly why the result follows",
      ],
      commonMistakes: [
        "Starting with what you're trying to prove",
        "Missing steps in algebra",
        "Not concluding clearly",
      ],
    },
    {
      type: "Problem solving (worded)",
      marks: [5, 6],
      timeGuide: "6-8 minutes",
      structure: "Real-world context requiring mathematical modelling",
      example: "A water tank is being filled. After 2 hours it is 1/3 full. After 5 hours it is 5/6 full. How long to fill completely?",
      howToAnswer: [
        "Draw a diagram if helpful",
        "Define variables clearly",
        "Set up equations from the information",
        "Solve and check answer is sensible",
      ],
      commonMistakes: [
        "Misreading the context",
        "Not checking if answer is realistic",
        "Missing hidden information",
      ],
    },
  ],
  markSchemePatterns: [
    "M1 = Method mark (correct approach)",
    "A1 = Accuracy mark (correct answer)",
    "B1 = Independent mark (standalone correct statement)",
    "oe = or equivalent",
    "awrt = answers which round to",
    "ft = follow through (marks for correct method on wrong numbers)",
  ],
  examTechnique: [
    "Read the whole paper first - identify quick wins",
    "Non-calculator: show ALL arithmetic working",
    "Use spare graph paper for drawings",
    "Check reasonableness of answers",
    "If stuck, move on and come back",
  ],
};

// ENGLISH LANGUAGE Question Types
export const englishLanguageQuestionBank: SubjectQuestionBank = {
  subject: "English Language",
  pastPaperSources: [pastPaperSources.aqa, pastPaperSources.edexcel],
  questionTypes: [
    {
      type: "Retrieval (AO1)",
      marks: [4],
      timeGuide: "5 minutes",
      structure: "List 4 things you learn about [character/setting] from lines X-Y",
      example: "List four things you learn about the village from lines 1-15",
      howToAnswer: [
        "Find FOUR distinct points",
        "Use short quotes or paraphrase",
        "One point per line is enough",
        "Stay within the line references",
      ],
      commonMistakes: [
        "Going outside given lines",
        "Writing too much - it's only 4 marks",
        "Repeating similar points",
        "Adding analysis (not needed)",
      ],
    },
    {
      type: "Language analysis (AO2)",
      marks: [8],
      timeGuide: "10-12 minutes",
      structure: "How does the writer use language to... [create effect/present theme]?",
      example: "How does the writer use language to create a sense of fear?",
      howToAnswer: [
        "Use WHAT-HOW-WHY structure",
        "WHAT: Quote the technique",
        "HOW: Name the technique (metaphor, adjective, etc.)",
        "WHY: Explain the effect on the reader",
        "Write 3 detailed paragraphs",
      ],
      commonMistakes: [
        "Feature spotting without analysis",
        "Not explaining effect on reader",
        "Using too many quotes without analysis",
        "Being vague ('creates imagery')",
      ],
    },
    {
      type: "Structure analysis (AO2)",
      marks: [8],
      timeGuide: "10-12 minutes",
      structure: "How does the writer structure the text to interest the reader?",
      example: "How has the writer structured the text to interest you as a reader?",
      howToAnswer: [
        "Comment on: opening, development, ending",
        "Discuss shifts in focus (time, place, perspective)",
        "Analyse narrative perspective changes",
        "Note sentence/paragraph length changes",
      ],
      commonMistakes: [
        "Only commenting on language (wrong AO)",
        "Not covering whole text",
        "Missing structural shifts",
        "Forgetting to link to reader interest",
      ],
    },
    {
      type: "Evaluation (AO4)",
      marks: [4],
      timeGuide: "20 minutes",
      structure: "To what extent do you agree with the statement about the text?",
      example: "'The writer makes the reader feel sympathy for the main character.' To what extent do you agree?",
      howToAnswer: [
        "State your viewpoint clearly",
        "Use PEEL paragraphs (Point, Evidence, Explain, Link)",
        "Write 4 paragraphs with detailed analysis",
        "Consider alternative interpretations",
      ],
      commonMistakes: [
        "Not giving an opinion",
        "Retelling the story",
        "Not using quotes to support",
        "One-sided argument only",
      ],
    },
    {
      type: "Descriptive/Narrative writing (AO5/AO6)",
      marks: [40],
      timeGuide: "45 minutes",
      structure: "Write a description/story suggested by the image OR continue the story",
      example: "Describe a place that holds special memories for you",
      howToAnswer: [
        "Plan for 5 minutes (structure, vocabulary, techniques)",
        "Use varied sentence structures",
        "Include sensory details (5 senses)",
        "Use ambitious vocabulary",
        "Leave 5 minutes for proofreading",
      ],
      commonMistakes: [
        "Not planning - rambling structure",
        "Boring openings",
        "Weak endings",
        "SPaG errors (spelling, punctuation, grammar)",
        "Using 'and then' repeatedly",
      ],
    },
    {
      type: "Viewpoint writing (AO5/AO6)",
      marks: [40],
      timeGuide: "45 minutes",
      structure: "Write an article/letter/speech giving your views on a topic",
      example: "Write an article for a broadsheet newspaper arguing that schools should start later",
      howToAnswer: [
        "Match form (article = headline, subheadings; letter = addresses, sign-off)",
        "Use AFOREST techniques (Anecdote, Facts, Opinion, Rhetorical questions, Emotive language, Statistics, Three)",
        "Clear argument with counter-argument",
        "Strong opening and conclusion",
      ],
      commonMistakes: [
        "Wrong form conventions",
        "No clear argument structure",
        "Forgetting audience and purpose",
        "Too informal for broadsheet",
      ],
    },
  ],
  markSchemePatterns: [
    "AO1 (4 marks): Identify explicit information",
    "AO2 (16 marks): Analyse language and structure",
    "AO3 (8 marks): Compare writers' ideas (Paper 2)",
    "AO4 (4 marks): Evaluate critically",
    "AO5 (24 marks): Content and organisation",
    "AO6 (16 marks): Technical accuracy (SPaG)",
  ],
  examTechnique: [
    "Spend 1 hour on Section A (Reading), 45 mins on Section B (Writing)",
    "Answer in order - questions increase in marks",
    "Always use quotes for reading questions",
    "Leave time for proofreading writing",
    "Use paragraphs in all answers",
  ],
};

// SCIENCE Question Types (applicable to Biology, Chemistry, Physics)
export const scienceQuestionBank: SubjectQuestionBank = {
  subject: "Science (Biology, Chemistry, Physics)",
  pastPaperSources: [pastPaperSources.aqa, pastPaperSources.edexcel, pastPaperSources.ocr],
  questionTypes: [
    {
      type: "Define/State",
      marks: [1],
      timeGuide: "30 seconds",
      structure: "State/Define/Name/Give",
      example: "State what is meant by the term 'osmosis'",
      howToAnswer: [
        "Give a precise definition",
        "Use key scientific terms",
        "Be specific, not vague",
      ],
      commonMistakes: [
        "Being too vague",
        "Missing key words from definition",
        "Writing too much for 1 mark",
      ],
    },
    {
      type: "Describe",
      marks: [2, 3, 4],
      timeGuide: "1-2 minutes per mark",
      structure: "Describe the process/what happens/how...",
      example: "Describe how a vaccine protects against disease",
      howToAnswer: [
        "Give a step-by-step account",
        "Use scientific terminology",
        "Number of points = number of marks",
        "Don't explain WHY unless asked",
      ],
      commonMistakes: [
        "Explaining instead of describing",
        "Missing steps in a process",
        "Not enough points for marks available",
      ],
    },
    {
      type: "Explain",
      marks: [2, 3, 4, 6],
      timeGuide: "2-3 minutes per mark",
      structure: "Explain why/how... (requires reasoning)",
      example: "Explain why the rate of photosynthesis increases with light intensity up to a point",
      howToAnswer: [
        "Give reasons using 'because/therefore/so'",
        "Link cause and effect",
        "Use scientific concepts",
        "More marks = more depth needed",
      ],
      commonMistakes: [
        "Describing instead of explaining",
        "Not giving reasons",
        "Missing the link to scientific concepts",
      ],
    },
    {
      type: "Calculate",
      marks: [2, 3, 4],
      timeGuide: "2-4 minutes",
      structure: "Calculate... Show your working",
      example: "Calculate the resistance. Use the equation R = V/I",
      howToAnswer: [
        "Write out the formula",
        "Substitute values with units",
        "Show calculation",
        "Give answer with correct units",
      ],
      commonMistakes: [
        "Forgetting units",
        "Wrong number of significant figures",
        "Not showing working (lose marks)",
        "Unit conversion errors",
      ],
    },
    {
      type: "Compare",
      marks: [2, 3, 4],
      timeGuide: "2-3 minutes",
      structure: "Compare X and Y",
      example: "Compare aerobic and anaerobic respiration",
      howToAnswer: [
        "Identify similarities AND differences",
        "Use comparative language (whereas, but, both)",
        "Be specific, not vague",
        "Cover both items equally",
      ],
      commonMistakes: [
        "Only describing one thing",
        "No comparative language",
        "Missing key differences",
      ],
    },
    {
      type: "Evaluate",
      marks: [3, 4, 6],
      timeGuide: "4-6 minutes",
      structure: "Evaluate the method/data/argument",
      example: "Evaluate the student's method for measuring the rate of reaction",
      howToAnswer: [
        "Give positives AND negatives",
        "Suggest improvements",
        "Consider reliability and validity",
        "Make a judgement",
      ],
      commonMistakes: [
        "Only giving positives",
        "Not suggesting improvements",
        "Missing key evaluation points",
      ],
    },
    {
      type: "6-mark extended response",
      marks: [6],
      timeGuide: "8-10 minutes",
      structure: "Extended answer requiring QWC (Quality of Written Communication)",
      example: "Describe and explain how the body responds to an increase in blood glucose concentration",
      howToAnswer: [
        "Plan answer briefly first",
        "Use clear paragraphs",
        "Include scientific terminology",
        "Write in full sentences",
        "Cover all parts of the question",
      ],
      commonMistakes: [
        "Not planning - answer is muddled",
        "Missing key scientific terms",
        "Not answering all parts",
        "Poor spelling of scientific words",
      ],
    },
    {
      type: "Required Practical questions",
      marks: [2, 3, 4, 6],
      timeGuide: "Variable",
      structure: "Questions about methods, variables, equipment, results",
      example: "Describe how you would investigate the effect of temperature on enzyme activity",
      howToAnswer: [
        "Know all required practicals thoroughly",
        "State independent, dependent, control variables",
        "Describe method step by step",
        "Include safety precautions",
        "Explain how to ensure reliability",
      ],
      commonMistakes: [
        "Not knowing the practicals",
        "Mixing up variable types",
        "Forgetting controls",
        "Missing safety points",
      ],
    },
  ],
  markSchemePatterns: [
    "1 mark = 1 correct point usually",
    "Indicative content lists expected points",
    "Level-based marking for 6-mark questions (L1=1-2, L2=3-4, L3=5-6)",
    "QWC marks for spelling scientific terms correctly",
    "Allow = acceptable alternative answers",
    "Ignore = statement neither gains nor loses marks",
  ],
  examTechnique: [
    "Read equations/data carefully before answering",
    "Show ALL working for calculations",
    "Use scientific terminology throughout",
    "6-mark questions: quality over quantity",
    "Check units are correct",
    "If asked for 2 things, give exactly 2 things",
  ],
};

// HISTORY Question Types
export const historyQuestionBank: SubjectQuestionBank = {
  subject: "History",
  pastPaperSources: [pastPaperSources.aqa, pastPaperSources.edexcel],
  questionTypes: [
    {
      type: "Inference from source (AQA)",
      marks: [4],
      timeGuide: "5 minutes",
      structure: "What can you learn from Source A about...?",
      example: "What can you learn from Source A about life in Nazi Germany?",
      howToAnswer: [
        "Make 2 developed inferences",
        "Each inference needs a quote from source",
        "Explain what the inference tells us",
        "Go beyond obvious surface meaning",
      ],
      commonMistakes: [
        "Just describing the source",
        "Making claims without quotes",
        "Only making one inference",
        "Surface-level reading",
      ],
    },
    {
      type: "Explain significance/importance",
      marks: [8],
      timeGuide: "10-12 minutes",
      structure: "Explain the significance/importance of...",
      example: "Explain the significance of the Treaty of Versailles",
      howToAnswer: [
        "Write 2-3 paragraphs",
        "Each paragraph = different reason for significance",
        "Include specific knowledge (dates, names, facts)",
        "Link to wider consequences",
      ],
      commonMistakes: [
        "Just describing what happened",
        "Not explaining WHY significant",
        "Lacking specific detail",
        "Not linking to consequences",
      ],
    },
    {
      type: "Source utility (AQA/Edexcel)",
      marks: [8, 12],
      timeGuide: "12-15 minutes",
      structure: "How useful is Source X for studying...?",
      example: "How useful is Source B for a historian studying the causes of WW2?",
      howToAnswer: [
        "Analyse content - what does it tell us?",
        "Analyse provenance (Nature, Origin, Purpose)",
        "Consider limitations",
        "Reach a judgement on usefulness",
        "Use contextual knowledge to support/challenge",
      ],
      commonMistakes: [
        "Just describing the source",
        "Ignoring provenance",
        "Saying it's biased therefore useless (wrong!)",
        "Not using own knowledge",
      ],
    },
    {
      type: "Compare sources",
      marks: [4],
      timeGuide: "6 minutes",
      structure: "In what ways do Sources A and B differ about...?",
      example: "In what ways do Sources A and B differ about Hitler's rise to power?",
      howToAnswer: [
        "Find one clear difference",
        "Support with quotes from BOTH sources",
        "Explain the difference",
        "Consider why they differ (provenance)",
      ],
      commonMistakes: [
        "Only using one source",
        "Finding similarities not differences",
        "No quotes",
        "Not explaining the difference",
      ],
    },
    {
      type: "Essay: 'How far do you agree'",
      marks: [16, 20],
      timeGuide: "25-30 minutes",
      structure: "Essay with argument and counter-argument",
      example: "How far do you agree that the main reason for Nazi popularity was propaganda?",
      howToAnswer: [
        "Brief introduction with argument preview",
        "Agree paragraph(s) with evidence",
        "Disagree paragraph(s) with evidence",
        "Conclusion with clear judgement",
        "Use specific factual knowledge throughout",
      ],
      commonMistakes: [
        "No clear argument",
        "Only one-sided",
        "Weak conclusion",
        "Generalised statements without specifics",
        "Not answering the actual question",
      ],
    },
    {
      type: "Narrative account",
      marks: [8],
      timeGuide: "10-12 minutes",
      structure: "Write a narrative account analysing...",
      example: "Write a narrative account analysing the key events leading to the start of WW1",
      howToAnswer: [
        "Tell the story in chronological order",
        "Include key events and dates",
        "Explain links between events (cause/consequence)",
        "Show how one thing led to another",
      ],
      commonMistakes: [
        "Just listing events (no links)",
        "Missing key events",
        "No analysis of connections",
        "Wrong chronology",
      ],
    },
  ],
  markSchemePatterns: [
    "AQA uses levels (L1-L4) for most questions",
    "Level 4: Complex explanation, sustained analysis, specific knowledge",
    "Level 3: Developed explanation, good knowledge",
    "Level 2: Simple explanation, some knowledge",
    "Level 1: Basic/generalised statements",
    "SPaG marks on some questions (up to 4 extra)",
  ],
  examTechnique: [
    "Always use specific knowledge (dates, names, statistics)",
    "For sources: Content + Provenance + Own Knowledge",
    "Plan essays before writing",
    "Answer the question set, not the one you wanted",
    "Time management is crucial - don't overrun",
  ],
};

// GEOGRAPHY Question Types
export const geographyQuestionBank: SubjectQuestionBank = {
  subject: "Geography",
  pastPaperSources: [pastPaperSources.aqa, pastPaperSources.edexcel],
  questionTypes: [
    {
      type: "Define",
      marks: [1],
      timeGuide: "30 seconds",
      structure: "Define the term...",
      example: "Define the term 'sustainable development'",
      howToAnswer: [
        "Give precise definition",
        "Use key geographical terms",
        "Keep it concise",
      ],
      commonMistakes: [
        "Being too vague",
        "Missing key words from definition",
      ],
    },
    {
      type: "Describe pattern/distribution",
      marks: [2, 3, 4],
      timeGuide: "3-5 minutes",
      structure: "Describe the pattern shown...",
      example: "Describe the distribution of earthquakes shown in Figure 2",
      howToAnswer: [
        "Use map/figure evidence",
        "Quote specific data/locations",
        "Describe overall pattern",
        "Note anomalies/exceptions",
      ],
      commonMistakes: [
        "Not using data from the figure",
        "Too vague ('lots in some places')",
        "Missing anomalies",
      ],
    },
    {
      type: "Explain",
      marks: [4, 6],
      timeGuide: "5-8 minutes",
      structure: "Explain why/how...",
      example: "Explain how coastal erosion creates caves, arches and stacks",
      howToAnswer: [
        "Use geographical terminology",
        "Explain processes in sequence",
        "Link cause and effect",
        "Include formation diagrams if helpful",
      ],
      commonMistakes: [
        "Describing instead of explaining",
        "Not using correct terminology",
        "Missing key processes",
      ],
    },
    {
      type: "Assess/Evaluate",
      marks: [6, 9],
      timeGuide: "8-12 minutes",
      structure: "Assess the effectiveness of... / Evaluate the impacts of...",
      example: "Assess the effectiveness of strategies used to manage flood risk",
      howToAnswer: [
        "Consider positives AND negatives",
        "Use case study evidence",
        "Make judgements",
        "Reach overall conclusion",
      ],
      commonMistakes: [
        "Only positives OR negatives",
        "No case study evidence",
        "No overall judgement",
      ],
    },
    {
      type: "9-mark essay",
      marks: [9],
      timeGuide: "12-15 minutes",
      structure: "Discuss... / To what extent... / Evaluate...",
      example: "'Globalisation has had more positive than negative impacts on people.' Do you agree?",
      howToAnswer: [
        "Brief intro with definition if needed",
        "Argue for (with evidence)",
        "Argue against (with evidence)",
        "Conclusion with clear judgement",
        "Use case studies throughout",
      ],
      commonMistakes: [
        "One-sided argument",
        "No case study evidence",
        "Weak/no conclusion",
        "Not answering the question directly",
      ],
    },
    {
      type: "Fieldwork questions",
      marks: [3, 4, 6, 9],
      timeGuide: "Variable",
      structure: "Questions about your fieldwork methodology and findings",
      example: "Justify one primary data collection method you used in your physical geography fieldwork",
      howToAnswer: [
        "Reference YOUR actual fieldwork",
        "Be specific about methods used",
        "Explain why methods were appropriate",
        "Discuss limitations and improvements",
      ],
      commonMistakes: [
        "Being too vague/generic",
        "Not justifying choices",
        "Forgetting to mention limitations",
      ],
    },
  ],
  markSchemePatterns: [
    "AO1: Knowledge and understanding",
    "AO2: Application of knowledge",
    "AO3: Skills (interpreting data, maps, graphs)",
    "AO4: Making judgements",
    "Case study knowledge expected for higher marks",
    "+3 SPaG marks on 9-mark questions",
  ],
  examTechnique: [
    "Always use specific place examples",
    "Quote figures from resources",
    "Know your fieldwork inside out",
    "Use geographical terminology",
    "For 9-markers: quality + balance + judgement",
  ],
};

// Consolidate all question banks
export const allQuestionBanks: SubjectQuestionBank[] = [
  mathsQuestionBank,
  englishLanguageQuestionBank,
  scienceQuestionBank,
  historyQuestionBank,
  geographyQuestionBank,
];

// Generic question stems by command word
export const commandWordQuestions: { [command: string]: string[] } = {
  "State": [
    "State one...",
    "State the meaning of...",
    "State two features of...",
  ],
  "Describe": [
    "Describe the pattern shown...",
    "Describe the process of...",
    "Describe how...",
    "Describe what happens when...",
  ],
  "Explain": [
    "Explain why...",
    "Explain how...",
    "Explain the reasons for...",
    "Using your own knowledge, explain...",
  ],
  "Compare": [
    "Compare the advantages of...",
    "Compare X and Y",
    "What are the similarities and differences between...",
  ],
  "Evaluate": [
    "Evaluate the effectiveness of...",
    "Evaluate the impact of...",
    "To what extent do you agree...",
  ],
  "Discuss": [
    "Discuss the view that...",
    "Discuss the advantages and disadvantages...",
    "Discuss the factors that...",
  ],
  "Calculate": [
    "Calculate the value of...",
    "Work out...",
    "Find the...",
    "Use the formula to calculate...",
  ],
  "Analyse": [
    "Analyse the reasons for...",
    "Analyse the data in Figure X...",
    "Analyse how the writer...",
  ],
};

// Mark per minute guide
export const timingGuide = {
  general: "Aim for roughly 1 mark per minute",
  maths: "1-2 marks = 1-2 mins, 5 marks = 5-6 mins",
  english: "Reading: 1 hour total. Writing: 45-50 mins per piece",
  science: "6-mark questions: 8-10 mins",
  humanities: "Essay questions (16-20 marks): 25-30 mins",
};

// Helper function to get question bank for a subject
export function getQuestionBank(subject: string): SubjectQuestionBank | null {
  const normalised = subject.toLowerCase();
  if (normalised.includes("math")) return mathsQuestionBank;
  if (normalised.includes("english") && normalised.includes("lang")) return englishLanguageQuestionBank;
  if (normalised.includes("biology") || normalised.includes("chemistry") || normalised.includes("physics") || normalised.includes("science")) return scienceQuestionBank;
  if (normalised.includes("history")) return historyQuestionBank;
  if (normalised.includes("geography")) return geographyQuestionBank;
  return null;
}

// Get past paper sources
export function getPastPaperSources(examBoard: string): PastPaperResource | null {
  const boardId = examBoard.toLowerCase();
  return pastPaperSources[boardId] || null;
}
