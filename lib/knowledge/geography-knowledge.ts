// GCSE Geography Knowledge Bank
// Comprehensive case studies, key terms, and exam techniques

export interface CaseStudy {
  name: string;
  location: string;
  type: string;
  topic: string;
  keyFacts: string[];
  causes?: string[];
  effects: {
    social?: string[];
    economic?: string[];
    environmental?: string[];
  };
  responses?: {
    immediate?: string[];
    longTerm?: string[];
  };
  evaluation?: string;
  examTip: string;
}

export interface GeographyTerm {
  term: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
}

export interface GeographyTopic {
  name: string;
  subtopics: string[];
  keyTerms: GeographyTerm[];
  caseStudies: CaseStudy[];
  examTips: string[];
}

// ═══════════════════════════════════════════════════════════
// PHYSICAL GEOGRAPHY: TECTONIC HAZARDS
// ═══════════════════════════════════════════════════════════

export const tectonicHazards: GeographyTopic = {
  name: "Tectonic Hazards",
  subtopics: [
    "Plate tectonics and plate boundaries",
    "Earthquakes - causes, effects, responses",
    "Volcanic eruptions - causes, effects, responses",
    "Living with tectonic hazards",
    "Reducing the risk from tectonic hazards"
  ],
  keyTerms: [
    {
      term: "Plate boundary",
      definition: "The point where two tectonic plates meet",
      example: "San Andreas Fault (conservative), Mid-Atlantic Ridge (constructive)",
      relatedTerms: ["constructive", "destructive", "conservative"]
    },
    {
      term: "Constructive/Divergent boundary",
      definition: "Where plates move apart and new crust is formed",
      example: "Mid-Atlantic Ridge, East African Rift"
    },
    {
      term: "Destructive/Convergent boundary",
      definition: "Where plates collide; oceanic crust subducts under continental",
      example: "Pacific Ring of Fire, Nazca and South American plates"
    },
    {
      term: "Conservative/Transform boundary",
      definition: "Where plates slide past each other horizontally",
      example: "San Andreas Fault, California"
    },
    {
      term: "Focus/Hypocenter",
      definition: "The point underground where an earthquake originates"
    },
    {
      term: "Epicentre",
      definition: "The point on the Earth's surface directly above the focus"
    },
    {
      term: "Richter Scale",
      definition: "Logarithmic scale measuring earthquake magnitude (each number is 10x more powerful)"
    },
    {
      term: "Primary effects",
      definition: "Immediate impacts of a hazard (deaths, building collapse)"
    },
    {
      term: "Secondary effects",
      definition: "Knock-on impacts that happen later (disease, economic loss, tsunamis)"
    }
  ],
  caseStudies: [
    {
      name: "Nepal Earthquake 2015",
      location: "Nepal (LIC)",
      type: "Earthquake",
      topic: "Tectonic hazards in a developing country",
      keyFacts: [
        "25 April 2015, magnitude 7.8",
        "Focus 15km deep, epicentre 80km NW of Kathmandu",
        "Caused by Indian plate subducting under Eurasian plate",
        "Major aftershock (7.3) on 12 May killed more"
      ],
      effects: {
        social: [
          "9,000 deaths, 22,000 injuries",
          "8 million people affected (1/3 of population)",
          "3.5 million left homeless",
          "Historic temples and UNESCO sites destroyed",
          "Schools and hospitals damaged"
        ],
        economic: [
          "$5 billion damage (50% of GDP)",
          "Tourism industry collapsed",
          "Agriculture disrupted",
          "600,000 homes destroyed"
        ],
        environmental: [
          "Landslides blocked roads and rivers",
          "Avalanche on Mount Everest killed 19",
          "Damage to Langtang Valley glaciers"
        ]
      },
      responses: {
        immediate: [
          "International aid ($4.1 billion pledged)",
          "UK sent search and rescue teams",
          "Helicopters rescued climbers",
          "Emergency camps set up",
          "Water purification provided"
        ],
        longTerm: [
          "Rebuilding with earthquake-resistant buildings",
          "Improving early warning systems",
          "Training local communities",
          "Stricter building codes introduced"
        ]
      },
      evaluation: "Nepal's poverty meant buildings were poorly constructed and emergency services limited. Despite international aid, recovery was slow due to corruption and political instability.",
      examTip: "Compare to Japan (HIC) to show how wealth affects impacts and responses"
    },
    {
      name: "Japan Earthquake and Tsunami 2011",
      location: "Japan (HIC)",
      type: "Earthquake and Tsunami",
      topic: "Tectonic hazards in a developed country",
      keyFacts: [
        "11 March 2011, magnitude 9.0 (4th largest ever recorded)",
        "Epicentre 70km off coast, focus 30km deep",
        "Pacific plate subducting under North American plate",
        "Triggered 40m tsunami waves"
      ],
      effects: {
        social: [
          "18,500 deaths (mostly from tsunami)",
          "450,000 people evacuated",
          "Fukushima nuclear disaster - radiation exposure",
          "Mental health impacts from trauma"
        ],
        economic: [
          "$235 billion damage (most expensive disaster ever)",
          "Infrastructure destroyed - roads, railways, ports",
          "Fukushima nuclear plant meltdown cost $200bn+ to clean up",
          "Supply chain disruption affected global car production"
        ],
        environmental: [
          "4.4 million homes without electricity",
          "1.5 million without water",
          "Nuclear radiation leaked into sea",
          "30km exclusion zone around Fukushima"
        ]
      },
      responses: {
        immediate: [
          "7km sea wall (not high enough)",
          "Earthquake early warning gave 30 seconds notice",
          "Military deployed within 24 hours",
          "International aid including US aircraft carrier"
        ],
        longTerm: [
          "Higher sea walls built (up to 15m)",
          "All nuclear reactors shut down for review",
          "Buildings relocated inland",
          "Improved warning systems",
          "Disaster education intensified"
        ]
      },
      evaluation: "Despite Japan being well-prepared with strict building codes and warning systems, the scale of the tsunami exceeded expectations. Shows even HICs are vulnerable to mega-disasters.",
      examTip: "Good example showing money can reduce deaths but can't prevent all damage"
    },
    {
      name: "Montserrat Volcanic Eruption 1997",
      location: "Montserrat, Caribbean (British Overseas Territory)",
      type: "Volcanic eruption",
      topic: "Volcanic hazards",
      keyFacts: [
        "Soufrière Hills volcano erupted 1995-1997 (and ongoing)",
        "Destructive plate boundary - Caribbean and Atlantic plates",
        "Major pyroclastic flow 25 June 1997",
        "Only recent volcanic activity after 400 years dormant"
      ],
      effects: {
        social: [
          "19 deaths from pyroclastic flows",
          "2/3 of population evacuated (from 12,000 to 4,000)",
          "Capital Plymouth destroyed and abandoned",
          "Communities split up permanently"
        ],
        economic: [
          "Airport destroyed",
          "Port closed initially",
          "Tourism collapsed",
          "Agriculture devastated by ash",
          "Economy still recovering 25 years later"
        ],
        environmental: [
          "Southern 2/3 of island now exclusion zone",
          "Vegetation destroyed by pyroclastic flows",
          "Coral reefs damaged by sediment",
          "Land gained through lava flows"
        ]
      },
      responses: {
        immediate: [
          "UK provided £41 million emergency aid",
          "Evacuation to north of island",
          "Monitoring by Montserrat Volcano Observatory",
          "Exclusion zones established"
        ],
        longTerm: [
          "New capital being built at Little Bay",
          "New airport opened 2005",
          "Volcanic tourism developed",
          "Risk mapping and warning systems",
          "Many residents never returned"
        ]
      },
      evaluation: "Shows impact on small island nations - entire capital destroyed, major population loss. UK's responsibility as colonial power meant extensive aid.",
      examTip: "Good for showing long-term impacts and how small islands are especially vulnerable"
    }
  ],
  examTips: [
    "Always include NAMED examples with specific facts (dates, deaths, costs)",
    "Distinguish PRIMARY effects (immediate) from SECONDARY effects (later consequences)",
    "Compare HIC and LIC responses - HICs have more money but can still be devastated",
    "Know the difference between PREDICTION (forecasting when), PROTECTION (reducing impact), and PREPARATION (being ready)",
    "Use case study details: magnitude, location, plate boundary type"
  ]
};

// ═══════════════════════════════════════════════════════════
// PHYSICAL GEOGRAPHY: WEATHER HAZARDS
// ═══════════════════════════════════════════════════════════

export const weatherHazards: GeographyTopic = {
  name: "Weather Hazards",
  subtopics: [
    "Global atmospheric circulation",
    "Tropical storms - formation, structure, effects",
    "UK weather hazards - storms, floods, drought",
    "Extreme weather in the UK",
    "Climate change and weather hazards"
  ],
  keyTerms: [
    {
      term: "Tropical storm",
      definition: "Intense low-pressure weather system with winds over 74mph",
      example: "Hurricanes (Atlantic), Typhoons (Pacific), Cyclones (Indian Ocean)"
    },
    {
      term: "Eye",
      definition: "Calm central area of a tropical storm with low pressure and clear skies"
    },
    {
      term: "Storm surge",
      definition: "Rise in sea level caused by low pressure and high winds pushing water onshore"
    },
    {
      term: "Coriolis effect",
      definition: "Deflection of winds due to Earth's rotation"
    },
    {
      term: "Depression",
      definition: "Low-pressure weather system bringing cloud, rain, and wind to the UK"
    },
    {
      term: "Anticyclone",
      definition: "High-pressure system bringing settled weather (hot in summer, cold and foggy in winter)"
    }
  ],
  caseStudies: [
    {
      name: "Typhoon Haiyan 2013",
      location: "Philippines (LIC)",
      type: "Tropical storm",
      topic: "Tropical storms in developing countries",
      keyFacts: [
        "8 November 2013",
        "One of strongest tropical storms ever recorded",
        "Wind speeds up to 195mph (Category 5)",
        "Storm surge up to 5 metres",
        "Tacloban City worst affected"
      ],
      effects: {
        social: [
          "6,300 deaths, 28,000 injuries",
          "14 million people affected",
          "6 million displaced",
          "Schools and hospitals destroyed",
          "Disease outbreaks after"
        ],
        economic: [
          "$2.2 billion damage",
          "Fishing industry destroyed",
          "Agriculture devastated - coconut trees take 7 years to regrow",
          "90% of Tacloban destroyed"
        ],
        environmental: [
          "90% of trees in some areas destroyed",
          "Coral reefs damaged",
          "Coastal erosion",
          "Contaminated water supplies"
        ]
      },
      responses: {
        immediate: [
          "International aid - US aircraft carrier sent",
          "UK sent HMS Illustrious",
          "Aid agencies distributed food, water, shelter",
          "Search and rescue operations",
          "Temporary shelters set up"
        ],
        longTerm: [
          "'Build Back Better' programme",
          "Mangrove replanting (natural barrier)",
          "Coconut trees replanted",
          "Better early warning systems",
          "Evacuation centres built on higher ground"
        ]
      },
      evaluation: "Philippines' poverty meant many lived in vulnerable coastal areas. Early warnings were given but evacuation facilities inadequate. Shows why development level matters.",
      examTip: "Compare to Hurricane Katrina (USA) to show development level affects vulnerability"
    },
    {
      name: "UK Somerset Levels Floods 2014",
      location: "Somerset, UK (HIC)",
      type: "Flooding",
      topic: "UK weather hazards",
      keyFacts: [
        "Winter 2013/14 - wettest winter on record",
        "350 homes flooded, 600 people evacuated",
        "Land flooded for 4+ months",
        "Main road (A361) closed for 2 months"
      ],
      causes: [
        "Heavy rainfall - 350mm in Jan-Feb 2014 (double average)",
        "Rivers not dredged for 20 years",
        "Flat, low-lying land below sea level",
        "Hard rock upstream increases runoff",
        "Sea level rise reduces drainage capacity"
      ],
      effects: {
        social: [
          "600 people evacuated for months",
          "Muchelney village cut off for weeks",
          "School closures",
          "Mental health impacts from stress"
        ],
        economic: [
          "£10 million damage to farms",
          "14,000 hectares farmland flooded",
          "Lost crops and livestock",
          "Tourism affected",
          "Businesses closed"
        ],
        environmental: [
          "Wildlife habitats destroyed",
          "Peat soil damage",
          "Pollution from sewage and farm waste",
          "Some benefits for wetland birds"
        ]
      },
      responses: {
        immediate: [
          "Military deployed",
          "Environment Agency pumping stations",
          "Emergency supplies by boat",
          "Flood barriers deployed"
        ],
        longTerm: [
          "£100 million action plan",
          "8km river dredging programme",
          "Tidal barrier at Bridgwater",
          "Raised roads",
          "Extra pumping capacity"
        ]
      },
      evaluation: "Controversy over whether dredging helps - some scientists disagree. Shows conflict between environment, farming, and flood protection.",
      examTip: "Use this for UK weather hazards questions - shows flooding affects HICs too"
    },
    {
      name: "UK Beast from the East 2018",
      location: "UK",
      type: "Extreme cold weather",
      topic: "UK extreme weather",
      keyFacts: [
        "Late February/early March 2018",
        "Caused by split in polar vortex",
        "Temperatures as low as -14°C",
        "Combined with Storm Emma (snow and high winds)"
      ],
      effects: {
        social: [
          "17 deaths",
          "Schools closed across UK",
          "Hospitals declared 'black alert'",
          "Rough sleepers at risk",
          "Train services cancelled"
        ],
        economic: [
          "£1 billion+ cost to economy",
          "Supermarket shortages",
          "Workers unable to travel",
          "Flights cancelled",
          "Construction sites closed"
        ],
        environmental: [
          "Burst pipes when temperatures rose",
          "Wildlife deaths",
          "Infrastructure damage"
        ]
      },
      evaluation: "UK shown to be poorly prepared for extreme cold compared to countries like Canada or Russia. Infrastructure designed for mild climate.",
      examTip: "Good example of evidence for UK weather becoming more extreme"
    }
  ],
  examTips: [
    "Know the structure of a tropical storm (eye, eyewall, spiral rain bands)",
    "Understand why tropical storms only form over warm oceans (26°C+)",
    "Link UK weather to depressions from the Atlantic and anticyclones",
    "Climate change: more frequent/intense storms, but uncertain predictions",
    "Responses: distinguish immediate (rescue) from long-term (prevention)"
  ]
};

// ═══════════════════════════════════════════════════════════
// PHYSICAL GEOGRAPHY: RIVERS
// ═══════════════════════════════════════════════════════════

export const riversLandscape: GeographyTopic = {
  name: "Rivers and Flooding",
  subtopics: [
    "The water cycle and drainage basins",
    "River processes: erosion, transportation, deposition",
    "River landforms",
    "Flooding - causes and management",
    "Sustainable river management"
  ],
  keyTerms: [
    {
      term: "Drainage basin",
      definition: "The area of land drained by a river and its tributaries",
      relatedTerms: ["watershed", "source", "mouth", "tributary", "confluence"]
    },
    {
      term: "Hydraulic action",
      definition: "Erosion caused by the force of water hitting the river banks"
    },
    {
      term: "Abrasion/Corrasion",
      definition: "Erosion caused by rocks in the river scraping against the bed and banks"
    },
    {
      term: "Attrition",
      definition: "Rocks being worn down as they collide with each other"
    },
    {
      term: "Solution/Corrosion",
      definition: "Chemical erosion of soluble rocks like limestone"
    },
    {
      term: "Meander",
      definition: "A bend in a river caused by erosion on the outside and deposition on the inside"
    },
    {
      term: "Oxbow lake",
      definition: "A horseshoe-shaped lake formed when a meander is cut off"
    },
    {
      term: "Floodplain",
      definition: "Flat area of land beside a river formed by deposition during floods"
    },
    {
      term: "Levee",
      definition: "Raised banks along a river, formed naturally by deposition or built artificially"
    },
    {
      term: "Hydrograph",
      definition: "Graph showing how river discharge changes over time after rainfall",
      relatedTerms: ["lag time", "peak discharge", "rising limb", "falling limb"]
    },
    {
      term: "Hard engineering",
      definition: "Using man-made structures to control rivers (dams, embankments, channels)"
    },
    {
      term: "Soft engineering",
      definition: "Working with nature to manage floods (afforestation, floodplain zoning)"
    }
  ],
  caseStudies: [
    {
      name: "River Tees",
      location: "Northern England",
      type: "River landforms",
      topic: "River processes and landforms",
      keyFacts: [
        "Source: Cross Fell in the Pennines (893m)",
        "Mouth: Teesmouth (North Sea)",
        "Length: 137km",
        "Shows full range of landforms from source to mouth"
      ],
      effects: {
        environmental: [
          "Upper course: High Force waterfall (21m) - hard whinstone over soft limestone",
          "Middle course: Meanders at Yarm",
          "Lower course: Wide floodplain, estuary at Teesmouth",
          "V-shaped valleys in upper course",
          "Gorge below High Force"
        ]
      },
      evaluation: "Classic example showing how river characteristics change downstream - steeper gradient, smaller load, faster flow (relatively) in upper course; gentler gradient, larger volume in lower course.",
      examTip: "Use specific features like High Force waterfall with measurements"
    },
    {
      name: "Banbury Flood Management Scheme",
      location: "Banbury, Oxfordshire",
      type: "Flood management",
      topic: "Hard and soft engineering",
      keyFacts: [
        "River Cherwell floods regularly in town centre",
        "£18 million scheme completed 2012",
        "Protects 540 properties",
        "Combination of hard and soft engineering"
      ],
      effects: {
        economic: [
          "Property protected from flooding",
          "Businesses can get insurance",
          "Attracts investment to town centre"
        ],
        environmental: [
          "Some habitat loss from walls",
          "Flood storage area created wildlife habitat",
          "Trees planted along river"
        ]
      },
      responses: {
        longTerm: [
          "Hard engineering: Flood walls (2.5m high), embankments, pumping station",
          "Soft engineering: Flood storage area upstream, tree planting, water meadows",
          "Property level protection for some buildings"
        ]
      },
      evaluation: "Shows that combination of hard and soft engineering is most effective. Cost-benefit analysis showed scheme worth it - £18m cost vs potential £200m+ flood damage.",
      examTip: "Good example of mixed approach - know specific measures used"
    }
  ],
  examTips: [
    "Learn river landforms for EACH section: upper (V-valleys, waterfalls, rapids), middle (meanders, floodplains), lower (oxbow lakes, levees, deltas)",
    "Know the formation sequence: meander → oxbow lake (erosion on outside, deposition on inside)",
    "Flood causes: PHYSICAL (heavy rain, snowmelt, impermeable rock) and HUMAN (urbanisation, deforestation)",
    "Hard vs soft engineering: know advantages and disadvantages of EACH method",
    "Hydrographs: urbanisation = shorter lag time, higher peak; afforestation = longer lag time, lower peak"
  ]
};

// ═══════════════════════════════════════════════════════════
// PHYSICAL GEOGRAPHY: COASTS
// ═══════════════════════════════════════════════════════════

export const coastalLandscape: GeographyTopic = {
  name: "Coastal Landscapes",
  subtopics: [
    "Coastal processes: erosion, transportation, deposition",
    "Erosional landforms",
    "Depositional landforms",
    "Coastal management strategies",
    "Sustainable coastal management"
  ],
  keyTerms: [
    {
      term: "Destructive waves",
      definition: "Waves with high energy that erode the coast (tall, frequent, strong backwash)"
    },
    {
      term: "Constructive waves",
      definition: "Waves with low energy that deposit material (low, gentle, strong swash)"
    },
    {
      term: "Longshore drift",
      definition: "Movement of sediment along the coast by waves approaching at an angle"
    },
    {
      term: "Headland",
      definition: "A section of resistant rock jutting out into the sea"
    },
    {
      term: "Bay",
      definition: "An indent in the coastline formed by erosion of less resistant rock"
    },
    {
      term: "Stack",
      definition: "A pillar of rock isolated from the headland by erosion (arch collapses)"
    },
    {
      term: "Spit",
      definition: "A finger of sand/shingle extending from the coast, formed by longshore drift"
    },
    {
      term: "Bar",
      definition: "A spit that has grown across a bay, enclosing a lagoon"
    },
    {
      term: "Managed retreat",
      definition: "Allowing the sea to flood low-value land rather than protecting it"
    }
  ],
  caseStudies: [
    {
      name: "Holderness Coast",
      location: "East Yorkshire, England",
      type: "Coastal erosion",
      topic: "Erosional coastline management",
      keyFacts: [
        "Fastest eroding coastline in Europe",
        "Average 2m lost per year (up to 10m in storms)",
        "Made of soft boulder clay (glacial deposits)",
        "29 villages lost since Roman times",
        "Mappleton sea defences cost £2 million (1991)"
      ],
      causes: [
        "Soft boulder clay easily eroded",
        "Powerful waves from North Sea (long fetch)",
        "Narrow beaches offer little protection",
        "Sea level rising",
        "Defences in one place starve beaches elsewhere (terminal groyne syndrome)"
      ],
      effects: {
        social: [
          "Villages like Withernsea and Hornsea at risk",
          "Homes, roads, caravan parks lost",
          "Communities living in fear",
          "Property values collapse",
          "Mappleton protected but downstream areas suffer more erosion"
        ],
        economic: [
          "Agricultural land lost",
          "Tourism affected",
          "Cost of defences vs value of land",
          "Gas terminal at Easington needs protection (£4.5m scheme)"
        ],
        environmental: [
          "Habitat loss",
          "Sediment feeds Spurn Head spit",
          "Protecting one area affects sediment supply elsewhere"
        ]
      },
      responses: {
        longTerm: [
          "Hard engineering at Hornsea, Withernsea, Mappleton (groynes, sea walls)",
          "Easington gas terminal protected by rock armour",
          "Managed retreat at some areas (no defences)",
          "Shoreline Management Plan prioritises high-value areas"
        ]
      },
      evaluation: "Shows conflict between protecting settlements and accepting natural erosion. Defences at Mappleton caused increased erosion at Cowden (terminal groyne syndrome). Some areas economically not worth protecting.",
      examTip: "ESSENTIAL case study for coastal management - know specific places and costs"
    },
    {
      name: "Lyme Regis Coastal Protection",
      location: "Dorset, England (Jurassic Coast)",
      type: "Coastal management scheme",
      topic: "Integrated coastal management",
      keyFacts: [
        "Phase 1 (2005-2007): £22 million",
        "Phase 2 (2013-2015): £20 million",
        "Protects town, harbour, and World Heritage Site",
        "Soft clay cliffs prone to landslides"
      ],
      effects: {
        social: [
          "Town centre protected from flooding",
          "Improved public access along seafront",
          "Heritage sites preserved"
        ],
        economic: [
          "Tourism industry protected and enhanced",
          "Property values maintained",
          "Businesses protected from flood damage"
        ],
        environmental: [
          "New beach habitat created",
          "Cliff stabilisation reduced erosion",
          "Some natural processes interrupted"
        ]
      },
      responses: {
        longTerm: [
          "Sea wall strengthened and extended",
          "Rock armour (8,500 tonnes)",
          "New sand beach (330,000 tonnes)",
          "Cliff stabilisation with drains and netting",
          "Improved promenade",
          "Environmental improvements for wildlife"
        ]
      },
      evaluation: "Shows how coastal engineering can work with tourism and heritage. Expensive but protects valuable town. New beach attracts more tourists.",
      examTip: "Good example of combining hard and soft engineering with economic justification"
    },
    {
      name: "Medmerry Managed Retreat",
      location: "West Sussex, England",
      type: "Managed retreat",
      topic: "Sustainable coastal management",
      keyFacts: [
        "Largest managed realignment scheme in UK (2013)",
        "New sea wall built 2km inland",
        "Old defences breached to create saltmarsh",
        "£28 million scheme",
        "183 hectares of intertidal habitat created"
      ],
      effects: {
        environmental: [
          "New habitat for birds (RSPB reserve)",
          "Natural flood defence (saltmarsh absorbs wave energy)",
          "Reduced flood risk to 348 properties",
          "Carbon stored in saltmarsh"
        ],
        economic: [
          "Cheaper than maintaining old defences long-term",
          "Eco-tourism opportunities",
          "Sustainable solution as sea levels rise"
        ]
      },
      evaluation: "Shows managed retreat can work. Creates wildlife habitat, reduces costs, and acknowledges we can't hold back the sea everywhere. Required land purchase from farmers.",
      examTip: "Use to show soft/sustainable engineering is sometimes better than hard engineering"
    }
  ],
  examTips: [
    "Know landform sequences: headland → crack → cave → arch → stack → stump",
    "Longshore drift: swash at angle, backwash straight back - zigzag movement",
    "Coastal defences: know cost, advantages, disadvantages of EACH type",
    "Shoreline Management Plans: 4 options (hold the line, advance, managed retreat, no intervention)",
    "Always link to sustainability - is the approach long-term viable? What about climate change?"
  ]
};

// ═══════════════════════════════════════════════════════════
// HUMAN GEOGRAPHY: URBAN ISSUES
// ═══════════════════════════════════════════════════════════

export const urbanIssues: GeographyTopic = {
  name: "Urban Issues and Challenges",
  subtopics: [
    "Global patterns of urbanisation",
    "Urban growth in LICs and NEEs",
    "Urban change in the UK",
    "Sustainable urban development",
    "Urban regeneration"
  ],
  keyTerms: [
    {
      term: "Urbanisation",
      definition: "The increase in the proportion of people living in urban areas"
    },
    {
      term: "Megacity",
      definition: "A city with a population of over 10 million people",
      example: "Tokyo, Mumbai, Lagos, London"
    },
    {
      term: "Squatter settlement/Slum",
      definition: "Informal housing built illegally on land, often lacking services",
      example: "Dharavi (Mumbai), Favelas (Rio)"
    },
    {
      term: "Rural-urban migration",
      definition: "Movement of people from countryside to cities (push-pull factors)"
    },
    {
      term: "Brownfield site",
      definition: "Previously developed land now available for redevelopment",
      example: "Former factory sites, old housing estates"
    },
    {
      term: "Greenfield site",
      definition: "Land that has never been built on, often on the urban fringe"
    },
    {
      term: "Urban regeneration",
      definition: "Improving an area through investment in housing, services, and infrastructure"
    },
    {
      term: "Sustainable urban living",
      definition: "Meeting needs of present without compromising future generations"
    }
  ],
  caseStudies: [
    {
      name: "Rio de Janeiro",
      location: "Brazil (NEE)",
      type: "Urban growth",
      topic: "Urbanisation in a NEE",
      keyFacts: [
        "Population 13 million (metro area)",
        "Growth from rural-urban migration and natural increase",
        "22% live in favelas (slums)",
        "Hosted 2014 World Cup and 2016 Olympics"
      ],
      effects: {
        social: [
          "Favelas have poor housing, limited electricity, no sewerage",
          "High crime rates and drug gang violence",
          "Unequal access to healthcare and education",
          "Community spirit in favelas - self-help improvements"
        ],
        economic: [
          "Informal sector employs many (street vendors, domestic workers)",
          "Tourism important but unequal benefits",
          "Large wealth gap",
          "Olympic investment not benefiting poor areas"
        ],
        environmental: [
          "Air pollution from traffic and industry",
          "Water pollution - untreated sewage",
          "Deforestation on hillsides causes landslides",
          "Flooding in low-lying favelas"
        ]
      },
      responses: {
        longTerm: [
          "Favela Bairro Project: upgraded 253 favelas with roads, sanitation, community buildings",
          "Pacification (UPP): police occupying favelas to reduce gang control",
          "Cable cars (Complexo do Alemao) improving access",
          "Self-help schemes - loans for building materials",
          "Site-and-service schemes - legal plots with basic services"
        ]
      },
      evaluation: "Improvements made but inequality remains huge. Olympics displaced some favela residents. Pacification reduced violence initially but problems returning. Shows challenges of managing rapid urban growth.",
      examTip: "Great case study for opportunities AND challenges of urban growth in NEE"
    },
    {
      name: "London Docklands Regeneration",
      location: "London, UK (HIC)",
      type: "Urban regeneration",
      topic: "Urban change in the UK",
      keyFacts: [
        "London Docklands Development Corporation 1981-1998",
        "£12 billion invested",
        "Canary Wharf - now major financial centre",
        "85,000 new homes built"
      ],
      effects: {
        social: [
          "24,000 new homes (many luxury flats)",
          "Original working-class community displaced",
          "Gentrification increased house prices",
          "New schools, health centres",
          "Some social housing built"
        ],
        economic: [
          "120,000 jobs created",
          "Canary Wharf - banks, media companies",
          "Docklands Light Railway and Jubilee Line extension",
          "City Airport opened"
        ],
        environmental: [
          "Brownfield land redeveloped",
          "Some green spaces created",
          "Air quality issues from increased traffic",
          "Wildlife habitats on old docks lost"
        ]
      },
      evaluation: "Economically successful but criticised for not benefiting original community. Jobs created were often not accessible to local working-class residents (skills mismatch). Shows regeneration can increase inequality.",
      examTip: "Use for pros and cons of regeneration - economic success but social tension"
    },
    {
      name: "Bristol Temple Quarter",
      location: "Bristol, UK",
      type: "Sustainable urban development",
      topic: "Sustainable urban living",
      keyFacts: [
        "70-hectare regeneration around Temple Meads station",
        "Part of Bristol's net-zero carbon goal by 2030",
        "Mixed-use development",
        "Focus on sustainable transport"
      ],
      effects: {
        social: [
          "10,000 new homes planned (25% affordable)",
          "Improved public spaces and parks",
          "Better connectivity to city centre"
        ],
        economic: [
          "22,000 jobs to be created",
          "University campus brings students and spending",
          "Attracts tech and creative industries"
        ],
        environmental: [
          "Net-zero carbon target",
          "Green roofs and sustainable drainage",
          "Reduced car dependency"
        ]
      },
      responses: {
        longTerm: [
          "New campus for University of Bristol",
          "10,000 homes (25% affordable)",
          "22,000 jobs planned",
          "Car-free zones, cycle paths",
          "Electric bus network",
          "Green roofs, solar panels",
          "District heating scheme"
        ]
      },
      evaluation: "Shows how UK cities planning for sustainable future. Links transport, housing, and energy. But affordable housing targets often not met in practice.",
      examTip: "Good example of sustainable urban planning in a UK city"
    }
  ],
  examTips: [
    "Causes of urbanisation: PUSH factors (rural poverty, lack of services) and PULL factors (jobs, services, opportunities)",
    "Know specific challenges: housing, transport, employment, environment, crime",
    "Squatter settlements: problems BUT also show community resourcefulness",
    "UK urban change: deindustrialisation, suburbanisation, counter-urbanisation, re-urbanisation",
    "Sustainability: energy, water, waste, transport - link to specific examples"
  ]
};

// ═══════════════════════════════════════════════════════════
// HUMAN GEOGRAPHY: ECONOMIC DEVELOPMENT
// ═══════════════════════════════════════════════════════════

export const economicDevelopment: GeographyTopic = {
  name: "The Changing Economic World",
  subtopics: [
    "Global variations in development",
    "Measuring development",
    "Reducing the development gap",
    "Economic development in Nigeria (NEE)",
    "Economic changes in the UK"
  ],
  keyTerms: [
    {
      term: "Development",
      definition: "Progress in economic growth, technology, welfare, and quality of life"
    },
    {
      term: "GNI (Gross National Income)",
      definition: "Total value of goods and services produced by a country, including overseas earnings"
    },
    {
      term: "HDI (Human Development Index)",
      definition: "Composite measure of development: life expectancy, education, income (0-1 scale)"
    },
    {
      term: "Development gap",
      definition: "Difference in development between the most and least developed countries"
    },
    {
      term: "NEE (Newly Emerging Economy)",
      definition: "Country experiencing rapid economic growth and industrialisation",
      example: "Nigeria, China, India, Brazil"
    },
    {
      term: "HIC/LIC",
      definition: "High Income Country / Low Income Country (World Bank classification)"
    },
    {
      term: "Debt relief",
      definition: "Cancelling or reducing debts owed by developing countries"
    },
    {
      term: "Fair trade",
      definition: "Trading scheme ensuring producers receive fair prices for goods"
    },
    {
      term: "Aid",
      definition: "Help given to countries - bilateral (government to government), multilateral (via organisations), NGO"
    }
  ],
  caseStudies: [
    {
      name: "Nigeria",
      location: "West Africa (NEE)",
      type: "Newly Emerging Economy",
      topic: "Economic development",
      keyFacts: [
        "Population 220 million (largest in Africa)",
        "Oil discovered 1956, OPEC member",
        "Largest economy in Africa (2024)",
        "GNI per capita $2,160 (2023)",
        "HDI 0.539 (low development)"
      ],
      effects: {
        social: [
          "Life expectancy 55 years (but improving)",
          "Literacy rate 62%",
          "Huge inequality between rich and poor",
          "Brain drain - educated Nigerians emigrating",
          "Growing middle class in cities like Lagos"
        ],
        economic: [
          "Oil exports = 90% of export earnings",
          "Agriculture employs 70% but contributes 30% GDP",
          "Nollywood film industry = 2nd largest globally",
          "Tech hubs in Lagos ('Silicon Lagoon')",
          "Corruption major problem"
        ],
        environmental: [
          "Oil spills in Niger Delta - devastated fishing communities",
          "Desertification in the north",
          "Deforestation for farming and fuel",
          "Air pollution in Lagos"
        ]
      },
      responses: {
        longTerm: [
          "Diversifying economy away from oil",
          "Improving transport (Lagos-Kano railway)",
          "Free trade zones to attract investment",
          "Anti-corruption campaigns",
          "Education investment"
        ]
      },
      evaluation: "Oil brought wealth but also 'resource curse' - corruption, inequality, environmental damage. Economy growing but benefits uneven. Political instability (Boko Haram in north) hinders development.",
      examTip: "Know BOTH positives and negatives of Nigerian development - balanced view needed"
    },
    {
      name: "UK Post-Industrial Economy",
      location: "United Kingdom",
      type: "Economic change",
      topic: "Economic futures in UK",
      keyFacts: [
        "Manufacturing declined from 30% of jobs (1970) to 8% (2020)",
        "Services now 80% of economy",
        "North-South divide in prosperity",
        "Cambridge Science Park: 1,500 companies, 60,000 jobs"
      ],
      effects: {
        social: [
          "Unemployment in former industrial areas",
          "Need for retraining in new skills",
          "Migration for work (internal and international)",
          "Aging population creating care jobs"
        ],
        economic: [
          "Finance, IT, creative industries growing",
          "Science parks and business parks",
          "Quaternary sector (research, IT) expanding",
          "Regional inequality"
        ],
        environmental: [
          "Former industrial land needs cleaning",
          "Rural-urban fringe pressure",
          "Transport infrastructure investment",
          "Green technology opportunities"
        ]
      },
      responses: {
        longTerm: [
          "Enterprise Zones with tax breaks",
          "HS2 to improve North-South links",
          "Local Enterprise Partnerships",
          "Science parks near universities",
          "Regeneration of industrial cities"
        ]
      },
      evaluation: "UK successfully transitioned to service economy but left behind former industrial communities. Brexit creates uncertainty. Green economy offers opportunities.",
      examTip: "Link UK changes to globalisation and changing employment structure"
    }
  ],
  examTips: [
    "Development measures: know GNI, HDI, infant mortality, literacy - and limitations of each",
    "Development gap: caused by historical (colonialism), environmental (disease, disasters), economic (trade, debt) factors",
    "Strategies to reduce gap: aid, trade, debt relief, Fairtrade, microfinance, technology transfer",
    "TNCs: bring jobs and investment BUT can exploit workers and damage environment",
    "Nigeria: balance oil wealth against inequality, corruption, environmental damage"
  ]
};

// ═══════════════════════════════════════════════════════════
// HUMAN GEOGRAPHY: RESOURCE MANAGEMENT
// ═══════════════════════════════════════════════════════════

export const resourceManagement: GeographyTopic = {
  name: "Resource Management",
  subtopics: [
    "Global distribution of resources",
    "Food, water, and energy security",
    "UK resource challenges",
    "Sustainable resource management"
  ],
  keyTerms: [
    {
      term: "Resource",
      definition: "Something that can be used to meet human needs"
    },
    {
      term: "Food security",
      definition: "Having reliable access to sufficient, affordable, nutritious food"
    },
    {
      term: "Water security",
      definition: "Having reliable access to sufficient, safe, affordable water"
    },
    {
      term: "Energy security",
      definition: "Having reliable access to sufficient, affordable energy"
    },
    {
      term: "Water stress",
      definition: "When demand for water exceeds available supply"
    },
    {
      term: "Carbon footprint",
      definition: "Total greenhouse gas emissions caused by an activity or product"
    },
    {
      term: "Food miles",
      definition: "Distance food travels from producer to consumer"
    },
    {
      term: "Agribusiness",
      definition: "Large-scale, intensive commercial farming"
    }
  ],
  caseStudies: [
    {
      name: "Lesotho Highland Water Project",
      location: "Lesotho and South Africa",
      type: "Large-scale water transfer",
      topic: "Increasing water supply",
      keyFacts: [
        "Multi-dam project started 1986",
        "Transfers water from Lesotho to South Africa",
        "Katse Dam: 185m high, holds 1.95 billion m³",
        "70% of South Africa's water goes to Gauteng (Johannesburg area)"
      ],
      effects: {
        social: [
          "30,000 people displaced by dams",
          "Compensation issues and protests",
          "New roads improved access to remote areas",
          "Employment during construction"
        ],
        economic: [
          "Lesotho earns $50 million/year in water royalties",
          "Hydroelectric power generated (Muela dam)",
          "Water enables industry in South Africa",
          "Construction created jobs"
        ],
        environmental: [
          "River ecosystems disrupted",
          "Sediment trapped behind dams",
          "Reduced water downstream",
          "Some habitats flooded"
        ]
      },
      evaluation: "Provides vital water to water-stressed South Africa and income to poor Lesotho. But raises issues of who benefits - urban industry vs rural communities.",
      examTip: "Shows how water can be a tradeable resource - geopolitics of water"
    },
    {
      name: "Chambamontera Sustainable Water Project",
      location: "Peru",
      type: "Small-scale sustainable water",
      topic: "Sustainable water management",
      keyFacts: [
        "NGO-led project (Practical Action)",
        "Captures fog/mist water on mountain slopes",
        "Low-cost, appropriate technology",
        "Benefits remote farming communities"
      ],
      effects: {
        social: [
          "Clean water for drinking and cooking",
          "Women spend less time collecting water",
          "Health improvements from clean water",
          "Community involvement in maintenance"
        ],
        economic: [
          "Low cost - maintained by community",
          "Irrigation improves crop yields",
          "Time saved for other activities"
        ],
        environmental: [
          "No dam or infrastructure damage",
          "Sustainable use of natural fog",
          "No external energy needed"
        ]
      },
      evaluation: "Shows appropriate technology can work. Community ownership means sustainable. But only suitable in certain climates (coastal mountains with fog).",
      examTip: "Contrast with large-scale projects - different contexts need different solutions"
    }
  ],
  examTips: [
    "Know the global pattern: water surplus in tropical and temperate regions, deficit in arid areas",
    "UK: surplus in north/west, deficit in south/east - transfer schemes controversial",
    "Food security factors: climate, poverty, conflict, technology, trade",
    "Energy mix: know advantages/disadvantages of fossil fuels, nuclear, renewables",
    "Sustainability: balance economic, social, environmental factors"
  ]
};

// ═══════════════════════════════════════════════════════════
// EXAM SKILLS
// ═══════════════════════════════════════════════════════════

export const geographyExamSkills = {
  commandWords: {
    "Describe": "Say what something is like - patterns, features, characteristics (no explanation needed)",
    "Explain": "Give reasons why something happens - use 'because', 'this means', 'therefore'",
    "Evaluate": "Weigh up and make a judgement - 'to what extent', 'how far', 'assess'",
    "Compare": "Identify similarities AND differences",
    "Suggest": "Apply knowledge to unfamiliar situations - reasoned predictions",
    "Assess": "Weigh up importance/significance - make a judgement",
    "Discuss": "Explore different viewpoints and come to a conclusion",
    "To what extent": "How much do you agree? Needs a balanced argument with conclusion"
  },
  graphSkills: {
    population_pyramid: "Wide base = high birth rate; narrow base = low birth rate; bulges show baby booms or migration",
    climate_graph: "Bars = precipitation, line = temperature; identify climate type from pattern",
    hydrograph: "Rising limb = rainfall entering river; peak discharge = maximum flow; lag time = delay from rainfall",
    scatter_graph: "Identify correlation (positive, negative, none); draw line of best fit; identify anomalies",
    choropleth_map: "Darker = higher value; identify patterns; note limitations (hides variation within areas)"
  },
  mapSkills: {
    grid_references: "4-figure: whole square; 6-figure: specific point (along corridor, up stairs)",
    scale: "Use scale bar to measure distances; convert using ratio",
    contours: "Close together = steep; far apart = gentle; V-shapes pointing uphill = valley",
    cross_section: "Transfer heights from contours to graph paper; join with smooth line"
  },
  extendedWriting: {
    structure: "Introduction (define terms, outline argument) → Main paragraphs (Point, Evidence, Explain, Link) → Conclusion (judgement)",
    connectives: [
      "Adding: Furthermore, Moreover, Additionally",
      "Contrasting: However, On the other hand, Conversely",
      "Cause/effect: Therefore, Consequently, As a result",
      "Example: For instance, Such as, For example",
      "Concluding: Overall, In conclusion, To summarise"
    ],
    caseStudyUse: "Always use specific named examples with facts (dates, statistics, locations)"
  }
};

// ═══════════════════════════════════════════════════════════
// EXPORT ALL GEOGRAPHY DATA
// ═══════════════════════════════════════════════════════════

export const allGeographyTopics = [
  tectonicHazards,
  weatherHazards,
  riversLandscape,
  coastalLandscape,
  urbanIssues,
  economicDevelopment,
  resourceManagement
];

export function getGeographyTopic(name: string): GeographyTopic | undefined {
  return allGeographyTopics.find(t =>
    t.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function getCaseStudy(name: string): CaseStudy | undefined {
  for (const topic of allGeographyTopics) {
    const caseStudy = topic.caseStudies.find(cs =>
      cs.name.toLowerCase().includes(name.toLowerCase())
    );
    if (caseStudy) return caseStudy;
  }
  return undefined;
}

export function getCaseStudiesByTopic(topicName: string): CaseStudy[] {
  const topic = getGeographyTopic(topicName);
  return topic?.caseStudies || [];
}

// Quick reference for case studies by type
export const caseStudyQuickReference = {
  tectonics: ["Nepal Earthquake 2015 (LIC)", "Japan Earthquake 2011 (HIC)", "Montserrat Volcano (small island)"],
  weather: ["Typhoon Haiyan 2013 (LIC)", "Somerset Floods 2014 (UK)", "Beast from the East 2018 (UK)"],
  rivers: ["River Tees (landforms)", "Banbury (flood management)"],
  coasts: ["Holderness (erosion)", "Lyme Regis (protection)", "Medmerry (managed retreat)"],
  urban: ["Rio de Janeiro (NEE city)", "London Docklands (regeneration)", "Bristol Temple Quarter (sustainable)"],
  development: ["Nigeria (NEE)", "UK post-industrial economy"],
  resources: ["Lesotho Water Project (large-scale)", "Chambamontera Peru (small-scale sustainable)"]
};
