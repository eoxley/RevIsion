// English Literature GCSE Knowledge Bank
// Set texts, key quotes, themes, characters, and analysis

export interface SetText {
  title: string;
  author: string;
  examBoard: string[];
  category: "shakespeare" | "19th_century" | "modern_prose" | "modern_drama" | "poetry";
  year?: string;
  keyThemes: string[];
  keyCharacters?: { name: string; description: string; keyQuotes: string[] }[];
  context: string[];
  keyQuotes: { quote: string; speaker?: string; analysis: string; themes: string[] }[];
  structureNotes?: string[];
  examTips: string[];
}

export const shakespeareTexts: SetText[] = [
  {
    title: "Macbeth",
    author: "William Shakespeare",
    examBoard: ["AQA", "Edexcel", "OCR"],
    category: "shakespeare",
    year: "c. 1606",
    keyThemes: [
      "Ambition and its corrupting power",
      "Guilt and conscience",
      "The supernatural (witches, visions)",
      "Masculinity and gender roles",
      "Kingship and tyranny",
      "Appearance vs reality",
      "Fate vs free will",
      "Violence and its consequences"
    ],
    keyCharacters: [
      {
        name: "Macbeth",
        description: "Scottish nobleman who becomes king through murder. Tragic hero whose ambition leads to his downfall.",
        keyQuotes: [
          "I have no spur to prick the sides of my intent, but only vaulting ambition",
          "Is this a dagger which I see before me?",
          "Will all great Neptune's ocean wash this blood clean from my hand?",
          "Tomorrow, and tomorrow, and tomorrow"
        ]
      },
      {
        name: "Lady Macbeth",
        description: "Macbeth's wife who initially drives the murder plot. Strong but ultimately destroyed by guilt.",
        keyQuotes: [
          "Unsex me here, and fill me from the crown to the toe top-full of direst cruelty",
          "Look like th' innocent flower, but be the serpent under 't",
          "Out, damned spot! Out, I say!",
          "What, will these hands ne'er be clean?"
        ]
      },
      {
        name: "The Witches",
        description: "Supernatural beings who prophesy Macbeth's rise and fall. Agents of chaos and evil.",
        keyQuotes: [
          "Fair is foul, and foul is fair",
          "All hail, Macbeth, that shalt be king hereafter!",
          "Double, double, toil and trouble"
        ]
      },
      {
        name: "Banquo",
        description: "Macbeth's friend who resists temptation. His ghost haunts Macbeth.",
        keyQuotes: [
          "Thou hast it now: King, Cawdor, Glamis, all",
          "What, can the devil speak true?"
        ]
      }
    ],
    context: [
      "Written for King James I, who was Scottish and interested in witchcraft",
      "The Gunpowder Plot (1605) made regicide a sensitive topic",
      "James I wrote a book on witchcraft (Daemonologie)",
      "Great Chain of Being - disrupting natural order brings chaos",
      "Divine Right of Kings - kings are chosen by God"
    ],
    keyQuotes: [
      {
        quote: "Fair is foul, and foul is fair",
        speaker: "Witches",
        analysis: "Establishes the theme of appearance vs reality. The world of the play is morally inverted - nothing is as it seems. The chiasmus creates a sense of confusion.",
        themes: ["Appearance vs reality", "Supernatural", "Moral inversion"]
      },
      {
        quote: "Look like th' innocent flower, but be the serpent under 't",
        speaker: "Lady Macbeth",
        analysis: "Lady Macbeth instructs Macbeth to deceive. Biblical imagery (serpent = Satan in Eden). Shows her Machiavellian nature and manipulation of appearances.",
        themes: ["Appearance vs reality", "Deception", "Evil"]
      },
      {
        quote: "Is this a dagger which I see before me, the handle toward my hand?",
        speaker: "Macbeth",
        analysis: "Macbeth hallucinates before murdering Duncan. Question shows his uncertainty. The supernatural manifests his inner turmoil and guilty conscience even before the murder.",
        themes: ["Supernatural", "Guilt", "Ambition"]
      },
      {
        quote: "Will all great Neptune's ocean wash this blood clean from my hand?",
        speaker: "Macbeth",
        analysis: "Hyperbole shows Macbeth's overwhelming guilt. Water imagery (purification) is insufficient. Classical reference elevates the crime to cosmic significance.",
        themes: ["Guilt", "Violence", "Conscience"]
      },
      {
        quote: "Out, damned spot! Out, I say!",
        speaker: "Lady Macbeth",
        analysis: "Lady Macbeth's guilt manifests physically. Ironic reversal - she dismissed blood easily before. Sleepwalking shows unconscious guilt. 'Damned' suggests spiritual consequences.",
        themes: ["Guilt", "Madness", "Irony"]
      },
      {
        quote: "Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day",
        speaker: "Macbeth",
        analysis: "Nihilistic soliloquy after Lady Macbeth's death. Repetition creates weariness. Life is reduced to meaningless repetition. Tragic recognition of futility of his actions.",
        themes: ["Despair", "Meaninglessness", "Tragedy"]
      }
    ],
    structureNotes: [
      "Five-act structure following classical tragedy",
      "Act 3 = turning point (Banquo's murder)",
      "Parallel structure: Lady Macbeth's confidence decreases as Macbeth's increases",
      "Equivocation throughout - things are never what they seem",
      "Ends with restoration of rightful order (Malcolm crowned)"
    ],
    examTips: [
      "Always consider how Shakespeare presents theme X, not just what happens",
      "Link to Jacobean context - regicide, witchcraft, divine right",
      "Track character development across the play",
      "Use precise terminology: soliloquy, aside, dramatic irony",
      "Compare characters: Macbeth/Lady Macbeth, Macbeth/Banquo"
    ]
  },
  {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    examBoard: ["AQA", "Edexcel"],
    category: "shakespeare",
    year: "c. 1597",
    keyThemes: [
      "Love (romantic, passionate, tragic)",
      "Fate and destiny",
      "Family loyalty and conflict",
      "Youth vs age",
      "Violence and honour",
      "Light and dark imagery",
      "Time and haste",
      "Death"
    ],
    keyCharacters: [
      {
        name: "Romeo",
        description: "Young Montague who falls instantly in love with Juliet. Impulsive and passionate.",
        keyQuotes: [
          "But soft, what light through yonder window breaks?",
          "My only love sprung from my only hate!",
          "Then I defy you, stars!"
        ]
      },
      {
        name: "Juliet",
        description: "Young Capulet, only 13. Matures rapidly through love. More practical than Romeo.",
        keyQuotes: [
          "What's in a name? That which we call a rose by any other name would smell as sweet",
          "My bounty is as boundless as the sea, my love as deep",
          "O happy dagger, this is thy sheath"
        ]
      },
      {
        name: "Tybalt",
        description: "Juliet's cousin. Hot-headed and aggressive. Represents the feud's violence.",
        keyQuotes: [
          "What, drawn and talk of peace? I hate the word, as I hate hell, all Montagues, and thee"
        ]
      },
      {
        name: "Mercutio",
        description: "Romeo's friend. Witty and bawdy. His death triggers the tragedy.",
        keyQuotes: [
          "A plague o' both your houses!",
          "Queen Mab speech (describing dreams)"
        ]
      }
    ],
    context: [
      "Elizabethan marriage - arranged by parents, especially for wealthy families",
      "Patriarchal society - daughters were property",
      "Honour culture - men fought to defend family honour",
      "Plague was common - 'A plague o' both your houses' had real resonance",
      "Courtly love traditions influenced Romeo's language"
    ],
    keyQuotes: [
      {
        quote: "But soft, what light through yonder window breaks? It is the east, and Juliet is the sun",
        speaker: "Romeo",
        analysis: "Light/dark imagery dominates. Juliet = sun shows she is life-giving, central to his world. Religious imagery elevates love. Hyperbole typical of Romeo's passion.",
        themes: ["Love", "Light imagery", "Idealisation"]
      },
      {
        quote: "What's in a name? That which we call a rose by any other name would smell as sweet",
        speaker: "Juliet",
        analysis: "Juliet questions if names (family identity) matter. Philosophical questioning of identity. Dramatic irony - their names DO matter and will kill them.",
        themes: ["Identity", "Family conflict", "Fate"]
      },
      {
        quote: "A plague o' both your houses!",
        speaker: "Mercutio",
        analysis: "Dying curse on both families. Breaking point of the play. Takes sides out of it - blames both equally. Proves prophetic as both families lose their children.",
        themes: ["Violence", "Consequences", "Fate"]
      },
      {
        quote: "Then I defy you, stars!",
        speaker: "Romeo",
        analysis: "Romeo challenges fate upon hearing of Juliet's 'death'. Shows his impulsiveness. Ironic - he cannot escape fate. Star imagery links to 'star-crossed' prologue.",
        themes: ["Fate", "Defiance", "Tragedy"]
      }
    ],
    examTips: [
      "Prologue tells us the ending - focus on HOW, not what happens",
      "Track the speed of events - the whole play takes place over 4 days",
      "Compare Romeo's love for Rosaline vs Juliet",
      "Consider the role of fate vs free will",
      "Light and dark imagery appears throughout - analyse it"
    ]
  }
];

export const nineteenthCenturyTexts: SetText[] = [
  {
    title: "A Christmas Carol",
    author: "Charles Dickens",
    examBoard: ["AQA", "Edexcel", "OCR"],
    category: "19th_century",
    year: "1843",
    keyThemes: [
      "Redemption and transformation",
      "Social responsibility and poverty",
      "Christmas spirit and generosity",
      "Family and isolation",
      "Memory and time",
      "Greed and materialism",
      "Class and inequality"
    ],
    keyCharacters: [
      {
        name: "Ebenezer Scrooge",
        description: "Miserly businessman who transforms from cold-hearted to generous through supernatural intervention.",
        keyQuotes: [
          "Bah! Humbug!",
          "I wear the chain I forged in life",
          "I will honour Christmas in my heart, and try to keep it all the year"
        ]
      },
      {
        name: "Bob Cratchit",
        description: "Scrooge's underpaid clerk. Represents the worthy poor. Cheerful despite poverty.",
        keyQuotes: []
      },
      {
        name: "Tiny Tim",
        description: "Bob's disabled son. Symbol of innocent suffering. His potential death moves Scrooge.",
        keyQuotes: [
          "God bless us, every one!"
        ]
      },
      {
        name: "Jacob Marley",
        description: "Scrooge's dead partner, damned for his greed. Warns Scrooge to change.",
        keyQuotes: [
          "Mankind was my business!"
        ]
      }
    ],
    context: [
      "1843 - height of Industrial Revolution, huge wealth inequality",
      "Poor Law Amendment Act 1834 - workhouses for poor (Scrooge supports this)",
      "Dickens had personal experience of poverty as a child",
      "Written in 6 weeks to make money and raise awareness of poverty",
      "Christmas was becoming more commercialised - Dickens shaped modern Christmas"
    ],
    keyQuotes: [
      {
        quote: "a squeezing, wrenching, grasping, scraping, clutching, covetous old sinner",
        speaker: "Narrator",
        analysis: "List of negative verbs emphasises Scrooge's miserly nature. Sibilance creates unpleasant, snake-like effect. 'Sinner' introduces moral/religious dimension.",
        themes: ["Greed", "Sin", "Characterisation"]
      },
      {
        quote: "Are there no prisons? Are there no workhouses?",
        speaker: "Scrooge",
        analysis: "Scrooge's callous response to charity collectors. Rhetorical questions show dismissive attitude. Reflects Victorian attitude of deserving/undeserving poor.",
        themes: ["Social responsibility", "Poverty", "Callousness"]
      },
      {
        quote: "Mankind was my business!",
        speaker: "Marley",
        analysis: "Marley realises too late what matters. Emphatic repetition. 'Mankind' = all people, not just money-making. Moral message of the novella in one line.",
        themes: ["Social responsibility", "Redemption", "Warning"]
      },
      {
        quote: "I will honour Christmas in my heart, and try to keep it all the year",
        speaker: "Scrooge",
        analysis: "Scrooge's transformation complete. Future tense shows commitment. 'Heart' shows emotional change. 'All the year' extends beyond Christmas - permanent change.",
        themes: ["Redemption", "Transformation", "Christmas"]
      }
    ],
    structureNotes: [
      "Novella in 5 staves (like a Christmas carol/song)",
      "Begins and ends with Scrooge - circular but transformed",
      "Past, Present, Future structure = complete journey",
      "Counting down to Christmas Day - urgency",
      "Supernatural framing device allows social commentary"
    ],
    examTips: [
      "Link to Victorian context - poverty, workhouses, industrialisation",
      "Track Scrooge's transformation through the staves",
      "Consider Dickens' purpose - to change readers' attitudes",
      "Analyse the role of each ghost and what they show",
      "Compare Scrooge before and after transformation"
    ]
  },
  {
    title: "Dr Jekyll and Mr Hyde",
    author: "Robert Louis Stevenson",
    examBoard: ["AQA", "Edexcel"],
    category: "19th_century",
    year: "1886",
    keyThemes: [
      "Duality of human nature",
      "Science and its dangers",
      "Victorian respectability vs hidden vice",
      "Good vs evil",
      "Repression and release",
      "Secrecy and reputation",
      "Urban danger (London setting)"
    ],
    keyCharacters: [
      {
        name: "Dr Jekyll",
        description: "Respected scientist who creates Hyde to indulge his dark desires. Gradually loses control.",
        keyQuotes: [
          "Man is not truly one, but truly two",
          "I learned to recognise the thorough and primitive duality of man"
        ]
      },
      {
        name: "Mr Hyde",
        description: "Jekyll's evil alter-ego. Described as deformed, ape-like, repulsive. Grows stronger over time.",
        keyQuotes: [
          "If I am the chief of sinners, I am the chief of sufferers also"
        ]
      },
      {
        name: "Mr Utterson",
        description: "Lawyer and narrator. Represents Victorian restraint. Investigates the mystery.",
        keyQuotes: []
      }
    ],
    context: [
      "Victorian society demanded respectability but had 'hidden' vices",
      "Darwin's evolution theory (1859) - idea that humans have animal nature",
      "Concerns about unchecked scientific progress",
      "London's dark alleys represented moral danger",
      "Freud's later ideas about id/ego/superego relate to the duality"
    ],
    keyQuotes: [
      {
        quote: "Man is not truly one, but truly two",
        speaker: "Jekyll",
        analysis: "Central message of the novella. Challenges Victorian belief in unified self. Suggests everyone has capacity for good and evil. Scientific tone.",
        themes: ["Duality", "Human nature", "Science"]
      },
      {
        quote: "There was something wrong with his appearance; something displeasing, something downright detestable",
        speaker: "Enfield",
        analysis: "Hyde is indescribable - evil beyond words. Repetition of 'something' shows inability to articulate. Evil is felt instinctively but cannot be named.",
        themes: ["Evil", "Appearance", "Instinct"]
      },
      {
        quote: "It was Hyde, after all, and Hyde alone, that was guilty",
        speaker: "Jekyll",
        analysis: "Jekyll tries to deny responsibility. Ironic - Hyde IS Jekyll. Shows human tendency to blame 'other' for our sins. Self-deception.",
        themes: ["Duality", "Denial", "Responsibility"]
      }
    ],
    examTips: [
      "Consider Victorian context - public respectability, private vice",
      "Analyse how Hyde is presented as increasingly evil/animal",
      "Note the layered narrative structure - mystery revealed gradually",
      "Link to Darwinism - regression, 'ape-like' descriptions",
      "Consider why Hyde is 'smaller' than Jekyll"
    ]
  }
];

export const modernTexts: SetText[] = [
  {
    title: "An Inspector Calls",
    author: "J.B. Priestley",
    examBoard: ["AQA", "Edexcel", "OCR", "WJEC"],
    category: "modern_drama",
    year: "1945 (set in 1912)",
    keyThemes: [
      "Social responsibility",
      "Class and inequality",
      "Generational divide",
      "Capitalism and socialism",
      "Gender and power",
      "Guilt and responsibility",
      "Time and dramatic irony"
    ],
    keyCharacters: [
      {
        name: "Inspector Goole",
        description: "Mysterious inspector who exposes the family's guilt. Possibly supernatural. Represents conscience.",
        keyQuotes: [
          "We don't live alone. We are members of one body. We are responsible for each other",
          "Fire and blood and anguish"
        ]
      },
      {
        name: "Arthur Birling",
        description: "Wealthy factory owner. Capitalist. Represents old-fashioned, selfish attitudes. Never learns.",
        keyQuotes: [
          "a man has to mind his own business and look after himself",
          "The Titanic... absolutely unsinkable"
        ]
      },
      {
        name: "Sheila Birling",
        description: "Arthur's daughter. Begins shallow, becomes socially aware. Represents hope for change.",
        keyQuotes: [
          "But these girls aren't cheap labour – they're people",
          "I'll never, never do it again to anybody"
        ]
      },
      {
        name: "Eric Birling",
        description: "Arthur's son. Alcoholic. Got Eva pregnant. Learns from experience. Represents younger generation.",
        keyQuotes: [
          "I was in that state when a chap easily turns nasty"
        ]
      },
      {
        name: "Sybil Birling",
        description: "Arthur's wife. Snobbish and cold. Refuses to accept responsibility. Represents class prejudice.",
        keyQuotes: [
          "Girls of that class"
        ]
      },
      {
        name: "Gerald Croft",
        description: "Sheila's fiancé. Had affair with Eva. Partial acceptance of responsibility but returns to old ways.",
        keyQuotes: []
      }
    ],
    context: [
      "Written 1945, set 1912 - audience knows WW1 and WW2 happened",
      "1912: Titanic, rigid class system, workers exploited",
      "1945: Welfare state being created, desire for social change",
      "Priestley was a socialist - play promotes collective responsibility",
      "Post-war context - 'fire and blood and anguish' refers to war"
    ],
    keyQuotes: [
      {
        quote: "We don't live alone. We are members of one body. We are responsible for each other",
        speaker: "Inspector",
        analysis: "Central message of the play. Collective responsibility. Biblical echo ('one body'). Direct address to audience through the characters. Socialist ideology.",
        themes: ["Social responsibility", "Socialism", "Community"]
      },
      {
        quote: "a man has to mind his own business and look after himself",
        speaker: "Arthur Birling",
        analysis: "Capitalist, individualist philosophy. Directly contrasts with Inspector's message. Dramatic irony - we know this leads to war. Presented as ignorant and selfish.",
        themes: ["Capitalism", "Individualism", "Dramatic irony"]
      },
      {
        quote: "The Titanic... absolutely unsinkable",
        speaker: "Arthur Birling",
        analysis: "Dramatic irony - 1945 audience knows Titanic sank. Undermines everything Birling says. Shows his arrogance and false confidence. Symbolic of his flawed worldview.",
        themes: ["Dramatic irony", "Arrogance", "Foreshadowing"]
      },
      {
        quote: "Fire and blood and anguish",
        speaker: "Inspector",
        analysis: "Prophetic warning of WW1 (and WW2). Biblical apocalyptic language. Consequence of not learning lesson. Chilling warning to audience as well.",
        themes: ["War", "Warning", "Consequences"]
      }
    ],
    structureNotes: [
      "Unity of time, place, action (classical structure)",
      "Real-time action - creates tension",
      "Lighting change when Inspector arrives (brighter, harder)",
      "Circular ending - phone rings, new inspector coming",
      "Each family member interrogated in turn"
    ],
    examTips: [
      "ALWAYS use dramatic irony - 1945 audience knows 1912 context",
      "Compare older generation (don't change) vs younger (learn)",
      "Consider the Inspector's role - conscience? ghost? time-traveller?",
      "Link to Priestley's socialist message and context",
      "Analyse stage directions as well as dialogue"
    ]
  }
];

// AQA Poetry Anthology - Power and Conflict Cluster
export const powerAndConflictPoems = [
  {
    title: "Ozymandias",
    poet: "Percy Bysshe Shelley",
    keyThemes: ["Power of nature", "Transience of power", "Pride and arrogance", "Art's longevity"],
    keyQuotes: [
      { quote: "Look on my works, ye Mighty, and despair!", analysis: "Ironic - nothing remains of his works. Shows the futility of human arrogance against time." },
      { quote: "The lone and level sands stretch far away", analysis: "Sibilance creates emptiness. Sand = time. All human achievement reduced to nothing." }
    ],
    context: "Written 1818. Ozymandias = Ramesses II, Egyptian pharaoh. Romantic poets criticised tyranny."
  },
  {
    title: "London",
    poet: "William Blake",
    keyThemes: ["Corruption of authority", "Suffering of ordinary people", "Industrial oppression", "Loss of innocence"],
    keyQuotes: [
      { quote: "In every cry of every man, / In every infant's cry of fear", analysis: "Repetition of 'every' = universal suffering. Infant = innocent suffering." },
      { quote: "mind-forged manacles", analysis: "Mental imprisonment. People are trapped by society's rules and their own acceptance of it." }
    ],
    context: "1794. Industrial Revolution causing poverty. French Revolution made power of people relevant."
  },
  {
    title: "The Charge of the Light Brigade",
    poet: "Alfred, Lord Tennyson",
    keyThemes: ["Honour and duty", "Futility of war", "Bravery", "Leadership failures"],
    keyQuotes: [
      { quote: "Theirs not to reason why, / Theirs but to do and die", analysis: "Soldiers must obey without question. Celebrates obedience but also shows its tragic consequences." },
      { quote: "Into the valley of Death / Rode the six hundred", analysis: "Biblical echo (valley of shadow of death). Capitalised Death personifies it. Soldiers as heroes." }
    ],
    context: "Crimean War 1854. Light Brigade charged into Russian guns due to miscommunication. 118 killed."
  },
  {
    title: "Exposure",
    poet: "Wilfred Owen",
    keyThemes: ["Futility of war", "Suffering of soldiers", "Nature as enemy", "Waiting and inaction"],
    keyQuotes: [
      { quote: "But nothing happens", analysis: "Repeated refrain. Anti-climactic. War is waiting, boredom, suffering - not glory." },
      { quote: "the merciless iced east winds that knive us", analysis: "Personified wind as attacker. Soldiers killed by weather, not enemy. Irony of their situation." }
    ],
    context: "WW1 trench warfare. Owen was soldier who died 1918. Wanted to show real horror of war."
  },
  {
    title: "Remains",
    poet: "Simon Armitage",
    keyThemes: ["PTSD and trauma", "Guilt", "Memory", "Violence"],
    keyQuotes: [
      { quote: "his blood-Loss: shadow stays on the street", analysis: "Colon creates pause. Shadow = guilt that remains. Memory cannot be erased." },
      { quote: "he's here in my head when I close my eyes", analysis: "Trauma invades soldier's mind. No escape from what he did. PTSD symptoms." }
    ],
    context: "Iraq War. Based on real soldier's account. Modern war poetry. PTSD recognition."
  },
  {
    title: "Poppies",
    poet: "Jane Weir",
    keyThemes: ["Mother's loss", "Memories", "Letting go", "Grief"],
    keyQuotes: [
      { quote: "the world had tilted", analysis: "Everything changed when son left. Grief distorts perception. Physical metaphor for emotional impact." },
      { quote: "I wanted to graze my nose / across the tip of your nose, playful", analysis: "Tender, physical memories. Intimacy of mother-child relationship. Pain of separation." }
    ],
    context: "Written for memorial. Mother's perspective on son going to war. Domestic focus."
  },
  {
    title: "War Photographer",
    poet: "Carol Ann Duffy",
    keyThemes: ["Trauma of witness", "Apathy of public", "Memory and pain", "Art and suffering"],
    keyQuotes: [
      { quote: "A hundred agonies in black and white", analysis: "Photos capture suffering. Numbers dehumanise. Black and white = documentary truth but also simplified." },
      { quote: "The reader's eyeballs prick / with tears between the bath and pre-lunch beers", analysis: "Momentary emotion. Forgotten quickly. Criticism of comfortable Western readers." }
    ],
    context: "Modern. Based on Don McCullin, war photographer. Questions our response to suffering."
  }
];

// Helper function to get text by title
export function getTextByTitle(title: string): SetText | undefined {
  const allTexts = [...shakespeareTexts, ...nineteenthCenturyTexts, ...modernTexts];
  return allTexts.find(t => t.title.toLowerCase() === title.toLowerCase());
}

// Helper to get all texts for an exam board
export function getTextsByExamBoard(board: string): SetText[] {
  const allTexts = [...shakespeareTexts, ...nineteenthCenturyTexts, ...modernTexts];
  return allTexts.filter(t => t.examBoard.includes(board));
}
