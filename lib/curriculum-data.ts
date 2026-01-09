// UK GCSE Curriculum Data 2025/2026
// Comprehensive exam board information for RevisionAI

export interface ExamBoard {
  id: string;
  name: string;
  fullName: string;
  website: string;
  keyDates2026: {
    examStart: string;
    examEnd: string;
    resultsDay: string;
  };
}

export interface Subject {
  name: string;
  examBoards: {
    boardId: string;
    specCode: string;
    tier?: "foundation" | "higher" | "single";
    papers: {
      name: string;
      duration: string;
      marks: number;
      percentage: number;
      content: string[];
    }[];
    assessmentObjectives?: {
      code: string;
      description: string;
      percentage: string;
    }[];
    keyTopics: string[];
    practicalRequirements?: string[];
    coursework?: {
      name: string;
      percentage: number;
      description: string;
    };
  }[];
}

export const examBoards: ExamBoard[] = [
  {
    id: "aqa",
    name: "AQA",
    fullName: "Assessment and Qualifications Alliance",
    website: "https://www.aqa.org.uk",
    keyDates2026: {
      examStart: "12 May 2026",
      examEnd: "26 June 2026",
      resultsDay: "20 August 2026",
    },
  },
  {
    id: "edexcel",
    name: "Edexcel",
    fullName: "Pearson Edexcel",
    website: "https://qualifications.pearson.com",
    keyDates2026: {
      examStart: "11 May 2026",
      examEnd: "26 June 2026",
      resultsDay: "20 August 2026",
    },
  },
  {
    id: "ocr",
    name: "OCR",
    fullName: "Oxford, Cambridge and RSA Examinations",
    website: "https://www.ocr.org.uk",
    keyDates2026: {
      examStart: "11 May 2026",
      examEnd: "26 June 2026",
      resultsDay: "20 August 2026",
    },
  },
  {
    id: "wjec",
    name: "WJEC/Eduqas",
    fullName: "Welsh Joint Education Committee",
    website: "https://www.wjec.co.uk",
    keyDates2026: {
      examStart: "11 May 2026",
      examEnd: "26 June 2026",
      resultsDay: "20 August 2026",
    },
  },
];

export const subjects: Subject[] = [
  // MATHEMATICS
  {
    name: "Mathematics",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8300",
        papers: [
          {
            name: "Paper 1 (Non-calculator)",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 33.3,
            content: ["Number", "Algebra", "Ratio", "Geometry", "Probability", "Statistics"],
          },
          {
            name: "Paper 2 (Calculator)",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 33.3,
            content: ["Number", "Algebra", "Ratio", "Geometry", "Probability", "Statistics"],
          },
          {
            name: "Paper 3 (Calculator)",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 33.3,
            content: ["Number", "Algebra", "Ratio", "Geometry", "Probability", "Statistics"],
          },
        ],
        keyTopics: [
          "Number - fractions, decimals, percentages, indices, standard form",
          "Algebra - equations, inequalities, sequences, graphs, quadratics",
          "Ratio, proportion and rates of change",
          "Geometry and measures - angles, shapes, transformations, vectors, trigonometry",
          "Probability - experimental and theoretical",
          "Statistics - averages, data representation, sampling",
        ],
      },
      {
        boardId: "edexcel",
        specCode: "1MA1",
        papers: [
          {
            name: "Paper 1 (Non-calculator)",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 33.3,
            content: ["Number", "Algebra", "Ratio", "Geometry", "Probability", "Statistics"],
          },
          {
            name: "Paper 2 (Calculator)",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 33.3,
            content: ["Number", "Algebra", "Ratio", "Geometry", "Probability", "Statistics"],
          },
          {
            name: "Paper 3 (Calculator)",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 33.3,
            content: ["Number", "Algebra", "Ratio", "Geometry", "Probability", "Statistics"],
          },
        ],
        keyTopics: [
          "Number operations and fractions",
          "Algebraic manipulation and solving equations",
          "Coordinate geometry and graphs",
          "Trigonometry and Pythagoras",
          "Statistics and probability",
          "Vectors and transformations",
        ],
      },
    ],
  },

  // ENGLISH LANGUAGE
  {
    name: "English Language",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8700",
        papers: [
          {
            name: "Paper 1: Explorations in Creative Reading and Writing",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Section A: Reading - one literature fiction text",
              "Section B: Writing - descriptive or narrative writing",
            ],
          },
          {
            name: "Paper 2: Writers' Viewpoints and Perspectives",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Section A: Reading - one non-fiction text and one literary non-fiction text",
              "Section B: Writing - writing to present a viewpoint",
            ],
          },
        ],
        assessmentObjectives: [
          { code: "AO1", description: "Identify and interpret explicit and implicit information", percentage: "~12%" },
          { code: "AO2", description: "Explain, comment on and analyse language and structure", percentage: "~12%" },
          { code: "AO3", description: "Compare writers' ideas and perspectives", percentage: "~8%" },
          { code: "AO4", description: "Evaluate texts critically", percentage: "~8%" },
          { code: "AO5", description: "Communicate clearly, effectively and imaginatively", percentage: "~30%" },
          { code: "AO6", description: "Technical accuracy of spelling, punctuation and grammar", percentage: "~30%" },
        ],
        keyTopics: [
          "Inference and deduction from texts",
          "Language analysis (word choice, imagery, rhetoric)",
          "Structure analysis (narrative perspective, organisation)",
          "Comparison of viewpoints",
          "Descriptive writing techniques",
          "Narrative writing techniques",
          "Persuasive/argumentative writing",
          "SPaG (spelling, punctuation, grammar)",
        ],
      },
      {
        boardId: "edexcel",
        specCode: "1EN0",
        papers: [
          {
            name: "Paper 1: Fiction and Imaginative Writing",
            duration: "1 hour 45 minutes",
            marks: 64,
            percentage: 40,
            content: [
              "Section A: Reading - 19th century fiction extract",
              "Section B: Imaginative writing",
            ],
          },
          {
            name: "Paper 2: Non-Fiction and Transactional Writing",
            duration: "2 hours 5 minutes",
            marks: 96,
            percentage: 60,
            content: [
              "Section A: Reading - two non-fiction texts",
              "Section B: Two transactional writing tasks",
            ],
          },
        ],
        keyTopics: [
          "19th century fiction analysis",
          "Non-fiction text analysis",
          "Comparison skills",
          "Imaginative and creative writing",
          "Transactional writing (letters, articles, speeches)",
        ],
      },
    ],
  },

  // ENGLISH LITERATURE
  {
    name: "English Literature",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8702",
        papers: [
          {
            name: "Paper 1: Shakespeare and the 19th-century novel",
            duration: "1 hour 45 minutes",
            marks: 64,
            percentage: 40,
            content: [
              "Section A: Shakespeare - one question on set play",
              "Section B: 19th-century novel - one question on set text",
            ],
          },
          {
            name: "Paper 2: Modern texts and poetry",
            duration: "2 hours 15 minutes",
            marks: 96,
            percentage: 60,
            content: [
              "Section A: Modern prose or drama",
              "Section B: Poetry anthology comparison",
              "Section C: Unseen poetry",
            ],
          },
        ],
        keyTopics: [
          "Shakespeare: Macbeth, Romeo and Juliet, The Tempest, Merchant of Venice, Much Ado About Nothing, Julius Caesar",
          "19th-century novels: A Christmas Carol, Jekyll and Hyde, Frankenstein, Pride and Prejudice, Jane Eyre, Great Expectations, Sherlock Holmes",
          "Modern texts: An Inspector Calls, Blood Brothers, Lord of the Flies, Animal Farm, Never Let Me Go, DNA, Telling Tales",
          "Poetry: Power and Conflict cluster OR Love and Relationships cluster",
          "Unseen poetry analysis",
        ],
      },
    ],
  },

  // COMBINED SCIENCE (TRILOGY)
  {
    name: "Combined Science: Trilogy",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8464",
        papers: [
          {
            name: "Biology Paper 1",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 16.7,
            content: ["Cell biology", "Organisation", "Infection and response", "Bioenergetics"],
          },
          {
            name: "Biology Paper 2",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 16.7,
            content: ["Homeostasis", "Inheritance", "Variation", "Evolution", "Ecology"],
          },
          {
            name: "Chemistry Paper 1",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 16.7,
            content: ["Atomic structure", "Bonding", "Quantitative chemistry", "Chemical changes", "Energy changes"],
          },
          {
            name: "Chemistry Paper 2",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 16.7,
            content: ["Rates", "Organic chemistry", "Chemical analysis", "Atmosphere", "Resources"],
          },
          {
            name: "Physics Paper 1",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 16.7,
            content: ["Energy", "Electricity", "Particle model", "Atomic structure"],
          },
          {
            name: "Physics Paper 2",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 16.7,
            content: ["Forces", "Waves", "Magnetism", "Space (higher tier only)"],
          },
        ],
        practicalRequirements: [
          "21 required practicals across Biology, Chemistry, and Physics",
          "Questions based on practical skills in all papers (15% of marks)",
        ],
        keyTopics: [
          // Biology
          "Cell structure and transport, mitosis, stem cells",
          "Digestive system, heart, blood, plant organs",
          "Communicable diseases, immune system, antibiotics",
          "Photosynthesis, respiration",
          "Nervous system, hormones, homeostasis",
          "DNA, genetics, evolution, classification, ecology",
          // Chemistry
          "Atoms, periodic table, ionic/covalent/metallic bonding",
          "Moles, concentration, percentage yield",
          "Reactivity series, electrolysis, acids/bases",
          "Exothermic/endothermic, rates of reaction",
          "Crude oil, polymers, chromatography",
          // Physics
          "Energy stores and transfers, power, efficiency",
          "Circuits, resistance, mains electricity",
          "Density, states of matter, pressure",
          "Forces, motion, momentum",
          "Waves, electromagnetic spectrum",
          "Magnets, electromagnets, motors",
        ],
      },
    ],
  },

  // SEPARATE SCIENCES
  {
    name: "Biology",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8461",
        papers: [
          {
            name: "Paper 1",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Cell biology", "Organisation", "Infection and response", "Bioenergetics"],
          },
          {
            name: "Paper 2",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Homeostasis", "Inheritance", "Variation and evolution", "Ecology"],
          },
        ],
        practicalRequirements: [
          "10 required practicals",
          "Microscopy, osmosis, food tests, enzymes",
          "Photosynthesis, reaction time, plant growth",
          "Field investigations, decay",
        ],
        keyTopics: [
          "Cell structure (prokaryotic/eukaryotic), microscopy",
          "Cell division (mitosis/meiosis), stem cells",
          "Transport in cells (diffusion, osmosis, active transport)",
          "Organisation in animals and plants",
          "Enzymes and digestion",
          "Blood, heart, and circulation",
          "Communicable diseases and immunity",
          "Antibiotics and drug development",
          "Photosynthesis and respiration",
          "Homeostasis and the nervous system",
          "Hormonal coordination and reproduction",
          "DNA, genes, and inheritance",
          "Evolution and natural selection",
          "Classification and ecosystems",
          "Biodiversity and human impacts",
        ],
      },
    ],
  },
  {
    name: "Chemistry",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8462",
        papers: [
          {
            name: "Paper 1",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Atomic structure", "Bonding", "Quantitative chemistry", "Chemical changes", "Energy changes"],
          },
          {
            name: "Paper 2",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Rate and equilibrium", "Organic chemistry", "Chemical analysis", "Chemistry of atmosphere", "Using resources"],
          },
        ],
        practicalRequirements: [
          "8 required practicals",
          "Making salts, electrolysis, temperature changes",
          "Rates of reaction, chromatography, water purification",
          "Identifying ions",
        ],
        keyTopics: [
          "Atomic structure and the periodic table",
          "Ionic, covalent and metallic bonding",
          "Structure and properties of substances",
          "Moles, equations, and calculations",
          "Reactivity series and extraction of metals",
          "Acids, bases, and making salts",
          "Electrolysis",
          "Energy changes in reactions",
          "Rates of reaction and reversible reactions",
          "Crude oil, hydrocarbons, and polymers",
          "Alcohols, carboxylic acids",
          "Testing for ions and gases",
          "Earth's atmosphere and climate change",
          "Using Earth's resources sustainably",
        ],
      },
    ],
  },
  {
    name: "Physics",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8463",
        papers: [
          {
            name: "Paper 1",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Energy", "Electricity", "Particle model of matter", "Atomic structure"],
          },
          {
            name: "Paper 2",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Forces", "Waves", "Magnetism and electromagnetism", "Space physics"],
          },
        ],
        practicalRequirements: [
          "10 required practicals",
          "Specific heat capacity, thermal insulation",
          "Resistance, I-V characteristics",
          "Density, force and extension",
          "Acceleration, waves, radiation absorption",
        ],
        keyTopics: [
          "Energy stores and energy transfers",
          "Power, efficiency, and energy resources",
          "Electric circuits and resistance",
          "Domestic electricity and the national grid",
          "Static electricity",
          "Density and states of matter",
          "Internal energy and specific heat capacity",
          "Pressure in gases and liquids",
          "Atomic structure and radioactive decay",
          "Nuclear fission and fusion",
          "Forces, resultant forces, and work done",
          "Speed, velocity, and acceleration",
          "Newton's laws and momentum",
          "Wave properties and the EM spectrum",
          "Light, sound, and ultrasound",
          "Magnets, electromagnets, and motors",
          "The solar system and the Big Bang (Triple only)",
        ],
      },
    ],
  },

  // HISTORY
  {
    name: "History",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8145",
        papers: [
          {
            name: "Paper 1: Understanding the Modern World",
            duration: "2 hours",
            marks: 84,
            percentage: 50,
            content: [
              "Section A: Period study (e.g., Germany 1890-1945, America 1920-1973)",
              "Section B: Wider world depth study (e.g., Conflict and Tension)",
            ],
          },
          {
            name: "Paper 2: Shaping the Nation",
            duration: "2 hours",
            marks: 84,
            percentage: 50,
            content: [
              "Section A: Thematic study (e.g., Health and the People, Power and the People)",
              "Section B: British depth study (e.g., Elizabethan England, Norman England)",
            ],
          },
        ],
        keyTopics: [
          "Germany 1890-1945: Kaiser Wilhelm, WW1, Weimar Republic, Nazi Germany",
          "America 1920-1973: Boom, Depression, Civil Rights",
          "Conflict and Tension 1918-1939: League of Nations, causes of WW2",
          "Conflict and Tension 1945-1972: Cold War, Korea, Vietnam",
          "Health and the People c1000-present",
          "Power and the People c1170-present",
          "Elizabethan England 1568-1603",
          "Norman England 1066-1100",
          "Source analysis and interpretation skills",
        ],
      },
      {
        boardId: "edexcel",
        specCode: "1HI0",
        papers: [
          {
            name: "Paper 1: Thematic Study and Historic Environment",
            duration: "1 hour 15 minutes",
            marks: 52,
            percentage: 30,
            content: ["Crime and Punishment OR Medicine Through Time", "Historic environment study"],
          },
          {
            name: "Paper 2: Period Study and British Depth Study",
            duration: "1 hour 45 minutes",
            marks: 64,
            percentage: 40,
            content: ["e.g., Superpower Relations 1941-91", "e.g., Early Elizabethan England 1558-88"],
          },
          {
            name: "Paper 3: Modern Depth Study",
            duration: "1 hour 20 minutes",
            marks: 52,
            percentage: 30,
            content: ["e.g., Weimar and Nazi Germany 1918-39"],
          },
        ],
        keyTopics: [
          "Medicine through time (medieval to modern)",
          "Crime and punishment (c1000-present)",
          "Early Elizabethan England 1558-88",
          "Superpower relations and the Cold War",
          "Weimar and Nazi Germany 1918-39",
        ],
      },
    ],
  },

  // GEOGRAPHY
  {
    name: "Geography",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8035",
        papers: [
          {
            name: "Paper 1: Living with the Physical Environment",
            duration: "1 hour 30 minutes",
            marks: 88,
            percentage: 35,
            content: [
              "Section A: The challenge of natural hazards",
              "Section B: The living world",
              "Section C: Physical landscapes in the UK",
            ],
          },
          {
            name: "Paper 2: Challenges in the Human Environment",
            duration: "1 hour 30 minutes",
            marks: 88,
            percentage: 35,
            content: [
              "Section A: Urban issues and challenges",
              "Section B: The changing economic world",
              "Section C: The challenge of resource management",
            ],
          },
          {
            name: "Paper 3: Geographical Applications",
            duration: "1 hour 15 minutes",
            marks: 76,
            percentage: 30,
            content: [
              "Section A: Issue evaluation (pre-release material)",
              "Section B: Fieldwork",
            ],
          },
        ],
        keyTopics: [
          "Tectonic hazards: earthquakes and volcanoes",
          "Weather hazards: tropical storms, UK weather",
          "Climate change: causes, effects, mitigation",
          "Ecosystems: tropical rainforests, hot deserts, cold environments",
          "UK physical landscapes: coasts and rivers",
          "Urban issues: urbanisation, sustainable cities",
          "Economic development: TNCs, aid, trade",
          "Resource management: food, water, energy",
          "Geographical skills: maps, graphs, statistics",
          "Fieldwork: human and physical investigation",
        ],
      },
    ],
  },

  // RELIGIOUS STUDIES
  {
    name: "Religious Studies",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8062",
        papers: [
          {
            name: "Paper 1: Study of Religions",
            duration: "1 hour 45 minutes",
            marks: 96,
            percentage: 50,
            content: [
              "Beliefs and teachings of two religions",
              "Practices of two religions",
            ],
          },
          {
            name: "Paper 2: Thematic Studies",
            duration: "1 hour 45 minutes",
            marks: 96,
            percentage: 50,
            content: [
              "Four themes from: relationships, life & death, existence of God, religion & peace, religion & crime, religion & human rights, religion & media",
            ],
          },
        ],
        keyTopics: [
          "Christianity: beliefs, practices, Trinity, salvation, worship",
          "Islam: beliefs, practices, Five Pillars, Tawhid",
          "Buddhism, Hinduism, Judaism, Sikhism (depending on school choice)",
          "Theme A: Relationships and families",
          "Theme B: Religion and life (abortion, euthanasia)",
          "Theme C: Existence of God and revelation",
          "Theme D: Religion, peace and conflict",
          "Theme E: Religion, crime and punishment",
        ],
      },
    ],
  },

  // COMPUTER SCIENCE
  {
    name: "Computer Science",
    examBoards: [
      {
        boardId: "ocr",
        specCode: "J277",
        papers: [
          {
            name: "Paper 1: Computer Systems",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Systems architecture",
              "Memory and storage",
              "Computer networks",
              "Network security",
              "System software",
              "Ethical, legal, cultural issues",
            ],
          },
          {
            name: "Paper 2: Computational Thinking, Algorithms and Programming",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Algorithms",
              "Programming fundamentals",
              "Producing robust programs",
              "Boolean logic",
              "Programming languages",
              "Data representation",
            ],
          },
        ],
        keyTopics: [
          "CPU architecture: fetch-decode-execute cycle",
          "Types of memory: RAM, ROM, cache",
          "Secondary storage devices",
          "Network topologies and protocols",
          "Cyber security threats and prevention",
          "Operating systems and utility software",
          "Ethical and legal issues: data protection, copyright",
          "Algorithms: searching (linear, binary), sorting (bubble, merge, insertion)",
          "Programming: variables, selection, iteration, arrays",
          "Testing and validation",
          "Boolean logic: AND, OR, NOT, truth tables",
          "Binary, hexadecimal, character encoding",
        ],
      },
      {
        boardId: "aqa",
        specCode: "8525",
        papers: [
          {
            name: "Paper 1: Computational Thinking and Programming Skills",
            duration: "2 hours",
            marks: 90,
            percentage: 50,
            content: ["Programming skills in Python or VB.Net", "Algorithms", "Data representation"],
          },
          {
            name: "Paper 2: Computing Concepts",
            duration: "1 hour 45 minutes",
            marks: 90,
            percentage: 50,
            content: ["Systems architecture", "Networks", "Cyber security", "Ethical issues"],
          },
        ],
        keyTopics: [
          "Programming in Python: syntax, data types, procedures",
          "File handling and databases",
          "Computational thinking and problem solving",
          "Systems architecture and memory",
          "Networking fundamentals",
        ],
      },
    ],
  },

  // MODERN FOREIGN LANGUAGES (example: French)
  {
    name: "French",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8658",
        papers: [
          {
            name: "Paper 1: Listening",
            duration: "35 minutes (F) / 45 minutes (H)",
            marks: 40,
            percentage: 25,
            content: ["Understanding spoken French in various contexts"],
          },
          {
            name: "Paper 2: Speaking",
            duration: "7-9 minutes (F) / 10-12 minutes (H)",
            marks: 60,
            percentage: 25,
            content: ["Role play", "Photo card discussion", "General conversation"],
          },
          {
            name: "Paper 3: Reading",
            duration: "45 minutes (F) / 1 hour (H)",
            marks: 60,
            percentage: 25,
            content: ["Understanding written French texts"],
          },
          {
            name: "Paper 4: Writing",
            duration: "1 hour (F) / 1 hour 15 minutes (H)",
            marks: 50,
            percentage: 25,
            content: ["Structured writing tasks", "Open-ended writing (H)", "Translation into French"],
          },
        ],
        keyTopics: [
          "Theme 1: Identity and culture (family, technology, free time)",
          "Theme 2: Local, national, international and global areas of interest (holidays, environment, social issues)",
          "Theme 3: Current and future study and employment (school, jobs, ambitions)",
          "Grammar: tenses (present, past, future, conditional), pronouns, agreements",
          "Vocabulary: high-frequency words, topic-specific vocabulary",
        ],
      },
    ],
  },

  // SPANISH
  {
    name: "Spanish",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8698",
        papers: [
          {
            name: "Paper 1: Listening",
            duration: "35 minutes (F) / 45 minutes (H)",
            marks: 40,
            percentage: 25,
            content: ["Understanding spoken Spanish"],
          },
          {
            name: "Paper 2: Speaking",
            duration: "7-9 minutes (F) / 10-12 minutes (H)",
            marks: 60,
            percentage: 25,
            content: ["Role play", "Photo card", "General conversation"],
          },
          {
            name: "Paper 3: Reading",
            duration: "45 minutes (F) / 1 hour (H)",
            marks: 60,
            percentage: 25,
            content: ["Understanding written Spanish"],
          },
          {
            name: "Paper 4: Writing",
            duration: "1 hour (F) / 1 hour 15 minutes (H)",
            marks: 50,
            percentage: 25,
            content: ["Structured and open writing", "Translation"],
          },
        ],
        keyTopics: [
          "Theme 1: Identity and culture",
          "Theme 2: Local, national, international areas",
          "Theme 3: Study and employment",
          "Grammar: all tenses, subjunctive (H), pronouns",
        ],
      },
    ],
  },

  // ART AND DESIGN
  {
    name: "Art and Design",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8201-8206",
        papers: [
          {
            name: "Component 1: Portfolio",
            duration: "Coursework",
            marks: 96,
            percentage: 60,
            content: ["Personal portfolio developed during course", "Selection of work showing development"],
          },
          {
            name: "Component 2: Externally Set Assignment",
            duration: "10 hours supervised",
            marks: 96,
            percentage: 40,
            content: ["Response to exam board set starting points", "Preparatory period + 10-hour exam"],
          },
        ],
        keyTopics: [
          "AO1: Develop ideas through investigations, demonstrating critical understanding",
          "AO2: Refine work by exploring ideas, selecting and experimenting with media",
          "AO3: Record ideas, observations and insights relevant to intentions",
          "AO4: Present a personal and meaningful response with connections",
          "Endorsements: Art, Craft and Design, Fine Art, Graphic Communication, Textile Design, Three-Dimensional Design, Photography",
        ],
      },
    ],
  },

  // PHYSICAL EDUCATION
  {
    name: "Physical Education",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8582",
        papers: [
          {
            name: "Paper 1: The Human Body and Movement in Physical Activity and Sport",
            duration: "1 hour 15 minutes",
            marks: 78,
            percentage: 30,
            content: [
              "Applied anatomy and physiology",
              "Movement analysis",
              "Physical training",
              "Use of data",
            ],
          },
          {
            name: "Paper 2: Socio-cultural Influences and Well-being in Physical Activity and Sport",
            duration: "1 hour 15 minutes",
            marks: 78,
            percentage: 30,
            content: [
              "Sports psychology",
              "Socio-cultural influences",
              "Health, fitness and well-being",
              "Use of data",
            ],
          },
          {
            name: "Non-Exam Assessment",
            duration: "Practical assessment",
            marks: 100,
            percentage: 40,
            content: [
              "Practical performance in three physical activities (105 marks)",
              "Written analysis and evaluation (25 marks)",
            ],
          },
        ],
        keyTopics: [
          "Musculoskeletal system: bones, joints, muscles",
          "Cardio-respiratory system: heart, lungs, blood",
          "Movement analysis: levers, planes, axes",
          "Components of fitness and training methods",
          "Preventing injury and warm-up/cool-down",
          "Sports psychology: arousal, aggression, feedback, guidance",
          "Socio-cultural influences: engagement, commercialisation, ethics",
          "Health, fitness and well-being definitions",
        ],
      },
    ],
  },

  // DESIGN AND TECHNOLOGY
  {
    name: "Design and Technology",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8552",
        papers: [
          {
            name: "Written Paper",
            duration: "2 hours",
            marks: 100,
            percentage: 50,
            content: [
              "Core technical principles",
              "Specialist technical principles",
              "Designing and making principles",
            ],
          },
        ],
        coursework: {
          name: "Non-Exam Assessment",
          percentage: 50,
          description: "Substantial design and make task, 30-35 hours, contextual challenge set by AQA",
        },
        keyTopics: [
          "New and emerging technologies",
          "Energy generation and storage",
          "Materials and their working properties (timber, metals, polymers, textiles, papers)",
          "Systems approach to designing",
          "Mechanical devices (levers, linkages, cams)",
          "Electronic systems (inputs, processes, outputs)",
          "Design strategies and communication",
          "Prototype development and iteration",
        ],
      },
    ],
  },

  // MUSIC
  {
    name: "Music",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8271",
        papers: [
          {
            name: "Component 1: Understanding Music",
            duration: "1 hour 30 minutes",
            marks: 96,
            percentage: 40,
            content: [
              "Listening and appraising",
              "Study pieces from set areas of study",
            ],
          },
        ],
        coursework: {
          name: "Component 2 & 3: Performing and Composing",
          percentage: 60,
          description: "Performance (30%): solo and ensemble. Composing (30%): free choice and brief composition",
        },
        keyTopics: [
          "Area of Study 1: Western Classical Tradition 1650-1910",
          "Area of Study 2: Popular Music",
          "Area of Study 3: Traditional Music",
          "Area of Study 4: Western Classical Tradition since 1910",
          "Elements of music: melody, harmony, rhythm, texture, structure, timbre",
          "Set works analysis",
          "Dictation and aural skills",
        ],
      },
    ],
  },

  // DRAMA
  {
    name: "Drama",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8261",
        papers: [
          {
            name: "Component 1: Understanding Drama",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 40,
            content: [
              "Section A: Theatre roles and terminology",
              "Section B: Study of set text (Blood Brothers)",
              "Section C: Live theatre evaluation",
            ],
          },
        ],
        coursework: {
          name: "Components 2 & 3: Devising and Performance",
          percentage: 60,
          description: "Devising drama (40%): create and perform original drama. Texts in Practice (20%): perform extract from play text",
        },
        keyTopics: [
          "Theatre roles: actor, director, designer",
          "Set text: Blood Brothers by Willy Russell",
          "Staging configurations and theatre types",
          "Design elements: lighting, sound, costume, set",
          "Performance skills and techniques",
          "Live theatre review and analysis",
          "Devising process and log",
        ],
      },
    ],
  },

  // GERMAN
  {
    name: "German",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8668",
        papers: [
          {
            name: "Paper 1: Listening",
            duration: "35 minutes (F) / 45 minutes (H)",
            marks: 40,
            percentage: 25,
            content: ["Understanding spoken German in various contexts"],
          },
          {
            name: "Paper 2: Speaking",
            duration: "7-9 minutes (F) / 10-12 minutes (H)",
            marks: 60,
            percentage: 25,
            content: ["Role play", "Photo card discussion", "General conversation"],
          },
          {
            name: "Paper 3: Reading",
            duration: "45 minutes (F) / 1 hour (H)",
            marks: 60,
            percentage: 25,
            content: ["Understanding written German texts"],
          },
          {
            name: "Paper 4: Writing",
            duration: "1 hour (F) / 1 hour 15 minutes (H)",
            marks: 50,
            percentage: 25,
            content: ["Structured writing tasks", "Translation into German"],
          },
        ],
        keyTopics: [
          "Theme 1: Identity and culture (family, technology, free time, customs)",
          "Theme 2: Local, national, international areas (holidays, social issues, environment)",
          "Theme 3: Current and future study and employment (school, jobs, ambitions)",
          "Grammar: cases (nominative, accusative, dative, genitive), word order, tenses",
          "Vocabulary: high-frequency words, topic-specific vocabulary",
        ],
      },
    ],
  },

  // BUSINESS STUDIES
  {
    name: "Business",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8132",
        papers: [
          {
            name: "Paper 1: Influences of Operations and HRM on Business Activity",
            duration: "1 hour 45 minutes",
            marks: 90,
            percentage: 50,
            content: [
              "Business in the real world",
              "Influences on business",
              "Business operations",
              "Human resources",
            ],
          },
          {
            name: "Paper 2: Influences of Marketing and Finance on Business Activity",
            duration: "1 hour 45 minutes",
            marks: 90,
            percentage: 50,
            content: [
              "Business in the real world",
              "Influences on business",
              "Marketing",
              "Finance",
            ],
          },
        ],
        keyTopics: [
          "Business activity: purpose, ownership, stakeholders, location",
          "Marketing: market research, marketing mix (4Ps), product life cycle",
          "Finance: sources of finance, cash flow, break-even, profit and loss",
          "Operations: production methods, quality, supply chain, technology",
          "Human resources: recruitment, training, motivation, organisational structures",
          "External influences: economic, legal, environmental, ethical",
          "Business growth: internal vs external, mergers, takeovers",
        ],
      },
      {
        boardId: "edexcel",
        specCode: "1BS0",
        papers: [
          {
            name: "Paper 1: Investigating Small Business",
            duration: "1 hour 30 minutes",
            marks: 90,
            percentage: 50,
            content: ["Enterprise and entrepreneurship", "Spotting business opportunities", "Putting a business idea into practice", "Making the business effective", "External influences"],
          },
          {
            name: "Paper 2: Building a Business",
            duration: "1 hour 30 minutes",
            marks: 90,
            percentage: 50,
            content: ["Growing the business", "Making marketing decisions", "Making operational decisions", "Making financial decisions", "Making HR decisions"],
          },
        ],
        keyTopics: [
          "Enterprise: risk and reward, role of business enterprise",
          "Business calculations: revenue, costs, profit, interest, exchange rates",
          "Market segmentation and targeting",
          "Business plans and cash flow forecasts",
          "Legislation: consumer, employment, health and safety",
        ],
      },
    ],
  },

  // ECONOMICS
  {
    name: "Economics",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8136",
        papers: [
          {
            name: "Paper 1: How Markets Work",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Economic foundations",
              "Resource allocation",
              "How prices are determined",
              "Production, costs, revenue and profit",
              "Competitive and concentrated markets",
              "Market failure",
            ],
          },
          {
            name: "Paper 2: How the Economy Works",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Economic objectives",
              "Macroeconomic indicators",
              "Government policy",
              "International trade and the global economy",
            ],
          },
        ],
        keyTopics: [
          "Scarcity, choice, opportunity cost",
          "Supply and demand curves, equilibrium price",
          "Price elasticity of demand (PED) and supply (PES)",
          "Market failure: externalities, public goods, merit goods",
          "Economic growth, inflation, unemployment, balance of payments",
          "Fiscal policy: taxation and government spending",
          "Monetary policy: interest rates, money supply",
          "International trade: imports, exports, exchange rates, globalisation",
        ],
      },
      {
        boardId: "ocr",
        specCode: "J205",
        papers: [
          {
            name: "Paper 1: Introduction to Economics",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 50,
            content: ["Main economic groups", "Markets", "Market failure and government intervention"],
          },
          {
            name: "Paper 2: National and International Economics",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 50,
            content: ["Role of money and financial markets", "Economic objectives", "How the government manages the economy"],
          },
        ],
        keyTopics: [
          "Economic problem: scarcity, choice, opportunity cost",
          "Production possibility frontiers",
          "Markets: demand, supply, price determination",
          "Role of banks and financial institutions",
          "Government objectives: growth, employment, inflation, trade",
        ],
      },
    ],
  },

  // PSYCHOLOGY
  {
    name: "Psychology",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8182",
        papers: [
          {
            name: "Paper 1: Cognition and Behaviour",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: [
              "Memory",
              "Perception",
              "Development",
              "Research methods",
            ],
          },
          {
            name: "Paper 2: Social Context and Behaviour",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: [
              "Social influence",
              "Language, thought and communication",
              "Brain and neuropsychology",
              "Psychological problems",
            ],
          },
        ],
        keyTopics: [
          "Memory: multi-store model, working memory, forgetting",
          "Perception: theories (Gregory, Gibson), factors affecting perception",
          "Development: Piaget's stages, Vygotsky, learning theories",
          "Social influence: conformity, obedience, prosocial behaviour",
          "Language and thought: Piaget vs Sapir-Whorf hypothesis",
          "Brain and neuropsychology: brain structure, localisation of function",
          "Psychological problems: depression, addiction - characteristics and treatments",
          "Research methods: experiments, observations, self-reports, correlations",
        ],
      },
      {
        boardId: "edexcel",
        specCode: "1PS0",
        papers: [
          {
            name: "Paper 1",
            duration: "1 hour 45 minutes",
            marks: 98,
            percentage: 50,
            content: ["Development", "Memory", "Psychological problems", "The brain and neuropsychology", "Social influence"],
          },
          {
            name: "Paper 2",
            duration: "1 hour 45 minutes",
            marks: 98,
            percentage: 50,
            content: ["Criminal psychology", "Sleep and dreaming", "Research methods"],
          },
        ],
        keyTopics: [
          "Criminal psychology: what makes a criminal, eyewitness testimony",
          "Sleep and dreaming: stages of sleep, theories of dreaming",
          "Research methods: experimental design, ethics, data analysis",
        ],
      },
    ],
  },

  // SOCIOLOGY
  {
    name: "Sociology",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8192",
        papers: [
          {
            name: "Paper 1: The Sociology of Families and Education",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: [
              "The sociology of families",
              "The sociology of education",
              "Relevant areas of social theory and methodology",
            ],
          },
          {
            name: "Paper 2: The Sociology of Crime and Deviance and Social Stratification",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: [
              "The sociology of crime and deviance",
              "Social stratification",
              "Relevant areas of social theory and methodology",
            ],
          },
        ],
        keyTopics: [
          "Families: functions of family, family diversity, changing family patterns",
          "Education: role of education, class/gender/ethnicity differences in achievement",
          "Crime and deviance: definitions, patterns, explanations, social control",
          "Social stratification: class, gender, ethnicity, age",
          "Sociological theories: functionalism, Marxism, feminism, interactionism",
          "Research methods: surveys, interviews, observations, secondary data",
        ],
      },
    ],
  },

  // MEDIA STUDIES
  {
    name: "Media Studies",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8572",
        papers: [
          {
            name: "Paper 1: Media One",
            duration: "1 hour 30 minutes",
            marks: 84,
            percentage: 35,
            content: [
              "Section A: Media language and representation",
              "Section B: Media industries and audiences",
            ],
          },
          {
            name: "Paper 2: Media Two",
            duration: "1 hour 30 minutes",
            marks: 84,
            percentage: 35,
            content: [
              "Television",
              "Music (music video and online media)",
            ],
          },
        ],
        coursework: {
          name: "Non-Exam Assessment",
          percentage: 30,
          description: "Create media product from set brief - e.g., website pages, TV sequence, magazine",
        },
        keyTopics: [
          "Media language: codes and conventions, genre, narrative, representation",
          "Media representations: gender, ethnicity, age, issues and events",
          "Media industries: ownership, production, distribution, regulation",
          "Media audiences: target audiences, uses and gratifications, effects theories",
          "Close study products (CSPs): set texts for detailed analysis",
          "Theoretical perspectives: Barthes, Todorov, Levi-Strauss, Gauntlett",
        ],
      },
      {
        boardId: "ocr",
        specCode: "J200",
        papers: [
          {
            name: "Paper 1: Media Messages",
            duration: "1 hour 45 minutes",
            marks: 70,
            percentage: 35,
            content: ["News and film industry", "Media language and representation"],
          },
          {
            name: "Paper 2: Evolving Media",
            duration: "1 hour 15 minutes",
            marks: 70,
            percentage: 35,
            content: ["Gaming, radio and music industry", "Audiences and industries"],
          },
        ],
        coursework: {
          name: "NEA Production",
          percentage: 30,
          description: "Create cross-media production from choice of briefs",
        },
        keyTopics: [
          "Media language across forms",
          "Representation and stereotyping",
          "Industry: production, distribution, exhibition",
          "Audience theories and targeting",
        ],
      },
    ],
  },

  // FOOD PREPARATION AND NUTRITION
  {
    name: "Food Preparation and Nutrition",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8585",
        papers: [
          {
            name: "Paper 1: Food Preparation and Nutrition",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: [
              "Food, nutrition and health",
              "Food science",
              "Food safety",
              "Food choice",
              "Food provenance",
            ],
          },
        ],
        coursework: {
          name: "Non-Exam Assessment",
          percentage: 50,
          description: "Task 1: Food investigation (15%). Task 2: Food preparation assessment (35%) - 3 hours practical",
        },
        keyTopics: [
          "Macronutrients: proteins, fats, carbohydrates - functions and sources",
          "Micronutrients: vitamins and minerals - functions and deficiencies",
          "Energy needs, balanced diet, diet-related health problems",
          "Food science: dextrinisation, caramelisation, Maillard reaction, gelatinisation",
          "Functional properties of ingredients: raising agents, setting, shortening",
          "Food safety: bacteria, food poisoning, storage, cross-contamination",
          "Food provenance: where food comes from, food miles, sustainability",
          "Food choice: religion, culture, ethics, cost, availability",
          "Practical skills: knife skills, sauces, pastry, bread, cook methods",
        ],
      },
      {
        boardId: "wjec",
        specCode: "C560",
        papers: [
          {
            name: "Component 1: Principles of Food Preparation and Nutrition",
            duration: "1 hour 45 minutes",
            marks: 100,
            percentage: 50,
            content: ["Food commodities", "Principles of nutrition", "Diet and good health", "The science of food", "Where food comes from", "Cooking and food preparation"],
          },
        ],
        coursework: {
          name: "Component 2: NEA",
          percentage: 50,
          description: "Food Investigation (15%) and Food Preparation (35%)",
        },
        keyTopics: [
          "Food commodities: meat, fish, eggs, dairy, cereals, fruit, vegetables",
          "Nutritional needs across life stages",
          "Diet-related health: obesity, CHD, diabetes, anaemia",
          "Food science and cooking methods",
          "Sustainability and food provenance",
        ],
      },
    ],
  },

  // HEALTH AND SOCIAL CARE
  {
    name: "Health and Social Care",
    examBoards: [
      {
        boardId: "ocr",
        specCode: "J835",
        papers: [
          {
            name: "R032: Principles of Care in Health and Social Care Settings",
            duration: "1 hour 15 minutes",
            marks: 80,
            percentage: 40,
            content: [
              "The rights of individuals",
              "Person-centred values",
              "Communication in health and social care",
              "Protecting service users from harm",
            ],
          },
        ],
        coursework: {
          name: "R033 & R034 (choose 2 from 5 units)",
          percentage: 60,
          description: "Coursework units covering: Life stages, Health and wellbeing, Body systems, Diseases and disorders, Health promotion",
        },
        keyTopics: [
          "Care values: dignity, respect, privacy, confidentiality, safety",
          "Person-centred care: empowerment, choice, independence",
          "Communication: verbal, non-verbal, written, barriers to communication",
          "Safeguarding: abuse types, signs, reporting procedures",
          "Life stages: infancy, childhood, adolescence, adulthood, later adulthood",
          "PIES: physical, intellectual, emotional, social development",
          "Factors affecting health: lifestyle, genetics, environment, socioeconomic",
          "Health services: NHS structure, primary/secondary/tertiary care",
        ],
      },
    ],
  },

  // DANCE
  {
    name: "Dance",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8236",
        papers: [
          {
            name: "Component 1: Performance and Choreography",
            duration: "Practical",
            marks: 80,
            percentage: 60,
            content: [
              "Set phrases (through a solo performance)",
              "Duet/trio performance",
              "Solo choreography (based on choreographic task)",
            ],
          },
          {
            name: "Component 2: Dance Appreciation",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 40,
            content: [
              "Knowledge and understanding of choreographic processes and performance skills",
              "Critical appreciation of own work",
              "Critical appreciation of professional works",
            ],
          },
        ],
        keyTopics: [
          "Set phrases: six choreographed phrases to learn and perform",
          "Actions: travel, turn, elevation, gesture, stillness, transfer of weight",
          "Dynamics: speed, flow, weight, quality of movement",
          "Choreographic devices: motif, development, contrast, climax, highlights",
          "Dance for camera and site-sensitive dance",
          "Professional works: detailed study of anthology works",
          "Safe practice: warm-up, cool-down, nutrition, injury prevention",
          "Dance styles and practitioners",
        ],
      },
    ],
  },

  // CITIZENSHIP
  {
    name: "Citizenship Studies",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8100",
        papers: [
          {
            name: "Paper 1: Active Citizenship",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Citizenship action - investigating, planning, action, evaluation",
              "Politics and participation",
            ],
          },
          {
            name: "Paper 2: Citizenship",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: [
              "Life in modern Britain",
              "Rights and responsibilities",
              "Law and the justice system",
            ],
          },
        ],
        keyTopics: [
          "Democracy and government: Parliament, elections, political parties",
          "The UK constitution and monarchy",
          "Rights and responsibilities: human rights, legal rights",
          "The justice system: courts, criminal vs civil law, young offenders",
          "Identity and diversity in the UK",
          "The media and free press",
          "The UK's role in the world: UN, NATO, EU, Commonwealth",
          "Taking citizenship action: investigating issues, campaigning",
        ],
      },
    ],
  },

  // STATISTICS
  {
    name: "Statistics",
    examBoards: [
      {
        boardId: "edexcel",
        specCode: "1ST0",
        papers: [
          {
            name: "Paper 1",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 50,
            content: ["Collection of data", "Processing, representing and analysing data", "Probability"],
          },
          {
            name: "Paper 2",
            duration: "1 hour 30 minutes",
            marks: 80,
            percentage: 50,
            content: ["Collection of data", "Processing, representing and analysing data", "Probability"],
          },
        ],
        keyTopics: [
          "Data collection: sampling methods, questionnaires, experiments",
          "Types of data: primary/secondary, qualitative/quantitative, discrete/continuous",
          "Representing data: histograms, cumulative frequency, box plots",
          "Averages: mean, median, mode from tables and grouped data",
          "Spread: range, IQR, standard deviation",
          "Correlation and regression: scatter diagrams, line of best fit",
          "Index numbers and time series",
          "Probability: tree diagrams, Venn diagrams, conditional probability",
        ],
      },
    ],
  },

  // ASTRONOMY
  {
    name: "Astronomy",
    examBoards: [
      {
        boardId: "edexcel",
        specCode: "1AS0",
        papers: [
          {
            name: "Paper 1: Naked Eye Astronomy",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: ["Planet Earth", "The Moon and the Sun", "The night sky", "Planetary systems"],
          },
          {
            name: "Paper 2: Telescopic Astronomy",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: ["Exploring the solar system", "Stars", "Galaxies", "Cosmology"],
          },
        ],
        keyTopics: [
          "Earth's rotation, seasons, time zones",
          "Moon: phases, eclipses, tides",
          "Solar system: planets, dwarf planets, comets, asteroids",
          "Constellations and star patterns",
          "Telescopes: types, resolution, magnification",
          "Stellar evolution: life cycle of stars, HR diagram",
          "Galaxies: types, Milky Way structure",
          "Big Bang theory, expansion of universe, dark matter/energy",
        ],
      },
    ],
  },

  // LATIN
  {
    name: "Latin",
    examBoards: [
      {
        boardId: "ocr",
        specCode: "J282",
        papers: [
          {
            name: "Language (Latin)",
            duration: "1 hour 30 minutes",
            marks: 100,
            percentage: 50,
            content: ["Translation from Latin", "Comprehension", "Grammar questions"],
          },
          {
            name: "Literature (Prose and Verse)",
            duration: "1 hour",
            marks: 50,
            percentage: 25,
            content: ["Study of prescribed prose and verse texts"],
          },
          {
            name: "Literature (Sources)",
            duration: "1 hour",
            marks: 50,
            percentage: 25,
            content: ["Roman Civilisation topics OR Ancient History topics"],
          },
        ],
        keyTopics: [
          "Latin grammar: cases, tenses, conjugations, participles",
          "Translation skills: Latin to English",
          "Defined vocabulary list (400+ words)",
          "Prescribed texts: prose (e.g., Pliny, Tacitus) and verse (e.g., Virgil, Ovid)",
          "Literary techniques: scansion, figures of speech",
          "Roman civilisation: daily life, entertainment, religion, army",
        ],
      },
    ],
  },

  // FILM STUDIES
  {
    name: "Film Studies",
    examBoards: [
      {
        boardId: "wjec",
        specCode: "C670",
        papers: [
          {
            name: "Component 1: US Film",
            duration: "1 hour 30 minutes",
            marks: 60,
            percentage: 35,
            content: ["Hollywood 1930-1960 (comparative study)", "Hollywood 1961-1990", "Contemporary US film"],
          },
          {
            name: "Component 2: Global Film",
            duration: "1 hour 30 minutes",
            marks: 60,
            percentage: 35,
            content: ["Global English-language films", "Non-English language films"],
          },
        ],
        coursework: {
          name: "Component 3: Production",
          percentage: 30,
          description: "Screenplay or short film (3-5 minutes) plus evaluative analysis",
        },
        keyTopics: [
          "Film form: cinematography, mise-en-scene, editing, sound",
          "Narrative theory: Todorov, Propp, Levi-Strauss",
          "Genre: conventions, hybrid genres",
          "Representation: gender, ethnicity, age",
          "Contexts: social, cultural, political, historical",
          "US film industry: studio system, stars, New Hollywood",
          "Global cinema: national cinemas, film movements",
        ],
      },
    ],
  },

  // ENGINEERING
  {
    name: "Engineering",
    examBoards: [
      {
        boardId: "ocr",
        specCode: "J830",
        papers: [
          {
            name: "R038: Principles of Engineering Design",
            duration: "1 hour 15 minutes",
            marks: 60,
            percentage: 40,
            content: ["Engineering sectors", "Design strategies", "Engineering materials", "Production techniques"],
          },
        ],
        coursework: {
          name: "R039-R043 (Specialist Units)",
          percentage: 60,
          description: "Coursework units: Communicating designs, Creating electronic products, Responding to briefs, Using CAD, Creating engineered products",
        },
        keyTopics: [
          "Engineering sectors: mechanical, electrical, aerospace, civil",
          "Design process: briefs, specifications, iteration",
          "Materials: metals, polymers, composites - properties and uses",
          "Manufacturing processes: cutting, shaping, joining, finishing",
          "Engineering drawings and CAD",
          "Electronics: components, circuits, inputs/outputs",
          "Quality control and testing",
          "Health and safety in engineering",
        ],
      },
    ],
  },

  // FURTHER MATHS (often Level 2)
  {
    name: "Further Maths (Level 2)",
    examBoards: [
      {
        boardId: "aqa",
        specCode: "8365",
        papers: [
          {
            name: "Paper 1 (Non-Calculator)",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: ["Pure mathematics", "Statistics"],
          },
          {
            name: "Paper 2 (Calculator)",
            duration: "1 hour 45 minutes",
            marks: 80,
            percentage: 50,
            content: ["Pure mathematics", "Mechanics"],
          },
        ],
        keyTopics: [
          "Algebra: factor theorem, algebraic fractions, functions",
          "Coordinate geometry: circles, parametric equations",
          "Calculus: differentiation, integration (basics)",
          "Matrices: operations, transformations",
          "Trigonometry: identities, sine and cosine rules, radians",
          "Statistics: binomial distribution, hypothesis testing",
          "Mechanics: kinematics, forces, Newton's laws, momentum",
          "Sequences: arithmetic, geometric, sigma notation",
        ],
      },
    ],
  },
];

// Command words used in GCSE exams
export const commandWords: { [key: string]: { meaning: string; subjects: string[] } } = {
  "Analyse": {
    meaning: "Break down into components; examine in detail; identify patterns or relationships",
    subjects: ["All"],
  },
  "Calculate": {
    meaning: "Work out the value using appropriate mathematical methods. Show your working.",
    subjects: ["Maths", "Science", "Geography", "Business"],
  },
  "Compare": {
    meaning: "Identify similarities and differences between two or more things",
    subjects: ["All"],
  },
  "Describe": {
    meaning: "Give an account of the main characteristics or features",
    subjects: ["All"],
  },
  "Discuss": {
    meaning: "Present key points about different ideas or arguments, consider multiple perspectives",
    subjects: ["English", "History", "RS", "Geography"],
  },
  "Evaluate": {
    meaning: "Make a judgement weighing up evidence, considering strengths and weaknesses",
    subjects: ["All"],
  },
  "Explain": {
    meaning: "Give reasons for something; say how or why something happens",
    subjects: ["All"],
  },
  "Give/State/Name": {
    meaning: "Provide a short, factual answer without explanation",
    subjects: ["Science", "Geography"],
  },
  "How far do you agree": {
    meaning: "Consider evidence both for and against, then make a supported judgement",
    subjects: ["History", "RS", "English Literature"],
  },
  "Justify": {
    meaning: "Give reasons to support a conclusion or argument",
    subjects: ["Geography", "Business", "History"],
  },
  "Outline": {
    meaning: "Give the main features or general principles without detail",
    subjects: ["Geography", "History", "Science"],
  },
  "Prove": {
    meaning: "Use logical steps to demonstrate that something is true (usually in Maths)",
    subjects: ["Maths"],
  },
  "Show that": {
    meaning: "Demonstrate that a statement is true using calculation or reasoning",
    subjects: ["Maths", "Science"],
  },
  "Suggest": {
    meaning: "Apply knowledge to propose a reasonable answer; there may be more than one acceptable answer",
    subjects: ["Science", "Geography"],
  },
  "To what extent": {
    meaning: "Consider how much something is true, usually requiring a balanced argument with a conclusion",
    subjects: ["History", "Geography", "RS"],
  },
};

// Grade boundaries (approximate - varies by year and paper difficulty)
export const gradeBoundaries = {
  note: "Grade boundaries vary each year. These are approximate percentages for guidance only.",
  grades: [
    { grade: 9, percentage: "~85%+", description: "Exceptional performance" },
    { grade: 8, percentage: "~75-84%", description: "Outstanding" },
    { grade: 7, percentage: "~65-74%", description: "Excellent (old A)" },
    { grade: 6, percentage: "~55-64%", description: "Strong (old high B)" },
    { grade: 5, percentage: "~45-54%", description: "Strong pass (old low B/high C)" },
    { grade: 4, percentage: "~35-44%", description: "Standard pass (old C)" },
    { grade: 3, percentage: "~25-34%", description: "Below standard pass (old D)" },
    { grade: 2, percentage: "~15-24%", description: "Old E/F" },
    { grade: 1, percentage: "~5-14%", description: "Old G" },
  ],
};

// Revision timeline for 2026 exams
export const revisionTimeline2026 = {
  september2025: "Start of Year 11 - Begin revision timetable planning, identify weak areas",
  october2025: "Focus on understanding course content, complete any coursework/NEA",
  november2025: "First round of past paper practice, mock exam preparation",
  december2025: "Mock exams in many schools, Christmas revision sessions for weak areas",
  january2026: "Analyse mock results, intensive revision of problem topics",
  february2026: "Half-term intensive revision, past paper practice under timed conditions",
  march2026: "Speaking exams for MFL begin, final coursework deadlines",
  april2026: "Easter revision - final push, complete all content revision",
  may2026: "Exams begin (usually second week of May), focus on upcoming papers",
  june2026: "Continue exams until late June, targeted revision between papers",
  august2026: "Results day (typically third Thursday of August - 20 August 2026)",
};

// Helper function to get curriculum summary for AI
export function getCurriculumSummary(): string {
  return `
UK GCSE 2026 Curriculum Summary

EXAM DATES: May 12 - June 26, 2026
RESULTS DAY: August 20, 2026

MAIN EXAM BOARDS:
- AQA (Assessment and Qualifications Alliance)
- Edexcel (Pearson)
- OCR (Oxford, Cambridge and RSA)
- WJEC/Eduqas (mainly Wales)

KEY SUBJECTS:
- English Language & Literature (compulsory)
- Mathematics (compulsory, Foundation/Higher tier)
- Combined Science Trilogy (2 GCSEs) or Separate Sciences (3 GCSEs)
- Optional subjects: History, Geography, Languages, Computer Science, Art, Music, Drama, PE, RE, D&T

GRADING: 9-1 scale (9 highest, 4 = standard pass, 5 = strong pass)

Current month: January 2026
Focus areas: Mock exam analysis, intensive revision of weak topics, past paper practice

EXAM TECHNIQUE REMINDERS:
- Read questions carefully - underline command words
- Show all working in calculations
- Use technical terminology
- Manage time (marks = minutes as rough guide)
- Check answers if time allows
`;
}
