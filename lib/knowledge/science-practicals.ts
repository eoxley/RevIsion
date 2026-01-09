// AQA GCSE Science Required Practicals - Complete Knowledge Bank
// Covers Biology, Chemistry, Physics for Combined Science & Separate Sciences

export interface RequiredPractical {
  id: string;
  subject: "biology" | "chemistry" | "physics";
  title: string;
  specification: string[];  // Which specs include this (trilogy, separate, both)
  paper: number;
  purpose: string;
  equipment: string[];
  method: string[];
  variables: {
    independent: string;
    dependent: string;
    control: string[];
  };
  safetyPoints: string[];
  expectedResults: string;
  graphType: string;
  commonErrors: string[];
  examTips: string[];
  keyCalculations?: string[];
}

export const biologyPracticals: RequiredPractical[] = [
  {
    id: "bio-1",
    subject: "biology",
    title: "Microscopy - Using a Light Microscope",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To use a light microscope to observe, draw and label biological specimens",
    equipment: [
      "Light microscope",
      "Prepared slides (e.g., onion cells, cheek cells)",
      "Glass slides and coverslips",
      "Dropping pipette",
      "Iodine solution or methylene blue stain",
      "Mounted needle",
      "Filter paper"
    ],
    method: [
      "Place the slide on the stage and secure with clips",
      "Start with the lowest power objective lens (4x)",
      "Use the coarse focus wheel to bring specimen into rough focus",
      "Switch to medium power (10x) and use fine focus wheel",
      "Switch to high power (40x) for detailed observation",
      "Adjust the light intensity using the diaphragm",
      "Draw what you see with clear labels"
    ],
    variables: {
      independent: "Magnification level",
      dependent: "Detail visible in specimen",
      control: ["Light intensity", "Focus quality", "Specimen preparation"]
    },
    safetyPoints: [
      "Handle glass slides carefully to avoid breakage",
      "Do not touch lenses with fingers",
      "Carry microscope with two hands",
      "Clean up any spills immediately"
    ],
    expectedResults: "Clear images of cells showing cell wall, membrane, nucleus, cytoplasm (and chloroplasts in plant cells)",
    graphType: "Scale drawing with magnification calculation",
    commonErrors: [
      "Starting on high power (always start low)",
      "Not using coverslip (causes air bubbles)",
      "Drawing in pen instead of pencil",
      "Not calculating magnification correctly"
    ],
    examTips: [
      "Magnification = eyepiece lens × objective lens",
      "Image size = actual size × magnification",
      "Actual size = image size ÷ magnification",
      "Convert units: 1mm = 1000μm"
    ],
    keyCalculations: [
      "Total magnification = eyepiece × objective (e.g., 10 × 40 = ×400)",
      "Actual size = image size ÷ magnification",
      "Remember to convert mm to μm when needed"
    ]
  },
  {
    id: "bio-2",
    subject: "biology",
    title: "Osmosis in Plant Tissue",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate the effect of sugar/salt solutions on plant tissue",
    equipment: [
      "Potato (or other plant tissue)",
      "Cork borer or knife",
      "Ruler",
      "Balance (to 2 decimal places)",
      "Boiling tubes or beakers",
      "Different concentrations of sucrose solution (0M, 0.2M, 0.4M, 0.6M, 0.8M, 1.0M)",
      "Distilled water",
      "Paper towels",
      "Timer"
    ],
    method: [
      "Cut potato cylinders of equal length using cork borer",
      "Measure and record initial mass and length of each cylinder",
      "Place one cylinder in each concentration of sucrose solution",
      "Leave for at least 30 minutes (or overnight)",
      "Remove cylinders, blot dry with paper towel",
      "Measure and record final mass and length",
      "Calculate percentage change in mass"
    ],
    variables: {
      independent: "Concentration of sucrose solution",
      dependent: "Change in mass (or length) of potato",
      control: ["Size of potato cylinders", "Temperature", "Time in solution", "Volume of solution", "Type of potato"]
    },
    safetyPoints: [
      "Take care when using sharp tools (cork borer/knife)",
      "Mop up any spills immediately",
      "Wash hands after handling solutions"
    ],
    expectedResults: "In low concentration (hypotonic) - potato gains mass (water enters by osmosis). In high concentration (hypertonic) - potato loses mass (water leaves by osmosis). At isotonic point - no change.",
    graphType: "Line graph: concentration (x-axis) vs percentage change in mass (y-axis)",
    commonErrors: [
      "Not blotting cylinders dry before weighing",
      "Cylinders different sizes",
      "Not calculating percentage change",
      "Leaving for different times"
    ],
    examTips: [
      "Percentage change = (final - initial) ÷ initial × 100",
      "Where line crosses x-axis = isotonic point (concentration inside potato)",
      "Turgid = firm (gained water), Flaccid = soft (lost water)",
      "Water moves from HIGH water potential to LOW water potential"
    ],
    keyCalculations: [
      "Percentage change in mass = ((final mass - initial mass) / initial mass) × 100",
      "Use negative values for mass loss"
    ]
  },
  {
    id: "bio-3",
    subject: "biology",
    title: "Food Tests",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To test for the presence of sugars, starch, proteins and lipids in food samples",
    equipment: [
      "Test tubes and rack",
      "Dropping pipettes",
      "Water bath at 80°C",
      "Benedict's solution",
      "Iodine solution",
      "Biuret reagent (or sodium hydroxide + copper sulfate)",
      "Ethanol",
      "Food samples",
      "White tile",
      "Safety goggles"
    ],
    method: [
      "STARCH: Add iodine to food sample - brown to blue-black = starch present",
      "REDUCING SUGARS: Add Benedict's solution, heat in water bath - blue to green/yellow/orange/brick red = sugar present",
      "PROTEIN: Add Biuret reagent - blue to purple/lilac = protein present",
      "LIPIDS: Shake food with ethanol, pour into water - cloudy white emulsion = lipid present"
    ],
    variables: {
      independent: "Type of food sample",
      dependent: "Colour change observed",
      control: ["Volume of reagent", "Temperature of water bath", "Time of heating"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Take care with hot water bath",
      "Benedict's solution is an irritant",
      "Sodium hydroxide is corrosive",
      "Ethanol is flammable - keep away from flames"
    ],
    expectedResults: "Positive results show colour changes. Benedict's shows gradient: blue (none) → green (trace) → yellow (moderate) → orange (high) → brick red (very high)",
    graphType: "Results table with colour observations",
    commonErrors: [
      "Not heating Benedict's test sufficiently",
      "Confusing Biuret colours (blue = negative, purple = positive)",
      "Using Bunsen burner with ethanol nearby",
      "Not using controls"
    ],
    examTips: [
      "Benedict's is semi-quantitative - can estimate sugar amount from colour",
      "Biuret = protein (both have 'i' in them)",
      "Iodine = starch (both have 'i')",
      "Emulsion test doesn't need heat"
    ]
  },
  {
    id: "bio-4",
    subject: "biology",
    title: "Enzyme Activity (Effect of pH on Amylase)",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate the effect of pH on the rate of amylase enzyme activity",
    equipment: [
      "Amylase solution",
      "Starch solution",
      "Buffer solutions (pH 4, 5, 6, 7, 8, 9)",
      "Iodine solution",
      "Spotting tile",
      "Syringes or pipettes",
      "Test tubes",
      "Water bath at 35°C",
      "Timer",
      "Thermometer"
    ],
    method: [
      "Add 2cm³ starch solution to each test tube",
      "Add 1cm³ of each buffer solution to separate tubes",
      "Place tubes in water bath at 35°C for 5 minutes",
      "Add 1cm³ amylase to each tube and start timer",
      "Every 30 seconds, remove a drop and test with iodine on spotting tile",
      "Record time taken for iodine to stop turning blue-black",
      "Repeat for all pH values"
    ],
    variables: {
      independent: "pH of solution",
      dependent: "Time taken for starch to be digested (iodine stays brown)",
      control: ["Temperature", "Concentration of amylase", "Concentration of starch", "Volume of solutions"]
    },
    safetyPoints: [
      "Take care with hot water",
      "Iodine can stain skin and clothes",
      "Some buffers may be irritants"
    ],
    expectedResults: "Fastest digestion at pH 7 (optimum for salivary amylase). Slower at pH values above and below. Very slow or no digestion at extreme pH (enzyme denatured).",
    graphType: "Line graph: pH (x-axis) vs time taken (y-axis) - or rate of reaction (1/time)",
    commonErrors: [
      "Temperature fluctuating",
      "Not equilibrating solutions before mixing",
      "Taking samples too infrequently",
      "Not recognising endpoint"
    ],
    examTips: [
      "Rate = 1/time (faster reaction = shorter time = higher rate)",
      "Optimum pH for amylase ≈ 7",
      "Optimum pH for pepsin ≈ 2 (stomach enzyme)",
      "Denaturation = permanent change to active site shape"
    ]
  },
  {
    id: "bio-5",
    subject: "biology",
    title: "Photosynthesis - Effect of Light Intensity",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate the effect of light intensity on the rate of photosynthesis",
    equipment: [
      "Pondweed (Elodea or Cabomba)",
      "Boiling tube or beaker",
      "Water + sodium hydrogen carbonate (0.5%)",
      "Lamp",
      "Ruler or metre stick",
      "Timer",
      "Funnel and test tube (for collecting gas)",
      "Thermometer",
      "Paper clip or plasticine to weigh down pondweed"
    ],
    method: [
      "Set up pondweed in boiling tube with sodium hydrogen carbonate solution",
      "Place lamp at set distance (e.g., 10cm) from pondweed",
      "Wait 2 minutes for plant to acclimatise",
      "Count bubbles of oxygen released in 1 minute",
      "Repeat 3 times and calculate mean",
      "Move lamp to different distances (20cm, 30cm, 40cm, 50cm)",
      "Repeat counting at each distance"
    ],
    variables: {
      independent: "Light intensity (or distance from lamp)",
      dependent: "Number of oxygen bubbles per minute (or volume of gas)",
      control: ["Temperature", "CO₂ concentration", "Type/length of pondweed", "Wavelength of light"]
    },
    safetyPoints: [
      "Keep water away from electrical equipment",
      "Don't look directly at bright lamp",
      "Take care with hot lamp"
    ],
    expectedResults: "More bubbles when light is closer (higher intensity). Rate levels off at high intensities (another factor becomes limiting).",
    graphType: "Line graph: 1/distance² or light intensity (x-axis) vs bubbles per minute (y-axis)",
    commonErrors: [
      "Not waiting for plant to acclimatise",
      "Temperature increasing from lamp heat",
      "Counting bubbles inaccurately",
      "Not using NaHCO₃ (CO₂ becomes limiting)"
    ],
    examTips: [
      "Light intensity ∝ 1/distance²",
      "At low light = light is limiting factor",
      "At high light = CO₂ or temperature becomes limiting",
      "Inverse square law: double distance = quarter intensity"
    ],
    keyCalculations: [
      "Light intensity ∝ 1/d²",
      "Rate of photosynthesis = bubbles per minute (or volume per minute)"
    ]
  },
  {
    id: "bio-6",
    subject: "biology",
    title: "Reaction Time",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To measure the effect of a factor on human reaction time",
    equipment: [
      "Ruler (30cm or metre rule)",
      "Calculator",
      "Optional: caffeine/practice/distractions for testing variables"
    ],
    method: [
      "Person A holds ruler at the top (high numbers)",
      "Person B positions thumb and finger at 0cm mark (without touching)",
      "Person A drops ruler without warning",
      "Person B catches it as quickly as possible",
      "Record the distance where ruler was caught",
      "Repeat 5 times and calculate mean",
      "Investigate effect of practice/caffeine/tiredness etc."
    ],
    variables: {
      independent: "Factor being tested (e.g., practice, caffeine, distraction)",
      dependent: "Distance ruler falls (or calculated reaction time)",
      control: ["Same person catching", "Same height drop", "Same ruler", "No warning given"]
    },
    safetyPoints: [
      "Minimal hazards",
      "Don't poke eyes with ruler"
    ],
    expectedResults: "Reaction time typically 0.2-0.3 seconds. Practice improves reaction time. Caffeine may improve it. Distractions/tiredness slow it.",
    graphType: "Bar chart comparing mean distances or times",
    commonErrors: [
      "Anticipating the drop",
      "Not doing enough repeats",
      "Different people catching",
      "Giving visual cues before dropping"
    ],
    examTips: [
      "Use conversion table: distance → time",
      "Or calculate using: t = √(2d/g) where g = 10m/s²",
      "More practice = shorter reaction time (learned reflex)",
      "Caffeine = stimulant = faster reactions"
    ],
    keyCalculations: [
      "Reaction time = √(2 × distance / 10)",
      "Distance in metres, time in seconds"
    ]
  },
  {
    id: "bio-7",
    subject: "biology",
    title: "Field Investigation - Sampling Techniques",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To measure the distribution of organisms using quadrats and transects",
    equipment: [
      "Quadrat (0.5m × 0.5m)",
      "Tape measure (at least 10m)",
      "Random number generator or table",
      "Identification key",
      "Recording sheet",
      "Ranging poles (for transect)"
    ],
    method: [
      "RANDOM SAMPLING: Generate random coordinates, place quadrat, count organisms",
      "SYSTEMATIC SAMPLING (transect): Lay tape measure across habitat, place quadrat at regular intervals",
      "Record number or percentage cover of species in each quadrat",
      "Calculate mean number per quadrat",
      "Estimate population: mean per quadrat × total area/quadrat area"
    ],
    variables: {
      independent: "Location/distance along transect",
      dependent: "Number/distribution of organisms",
      control: ["Quadrat size", "Sampling method", "Time of day", "Season"]
    },
    safetyPoints: [
      "Appropriate clothing and footwear",
      "Sun protection",
      "Inform someone of your location",
      "Be aware of hazards (water, cliffs, traffic)",
      "Wash hands after fieldwork"
    ],
    expectedResults: "Different species distribution in different areas. Zonation along transects (e.g., seashore).",
    graphType: "Kite diagram or bar chart showing species distribution along transect",
    commonErrors: [
      "Not sampling randomly (bias)",
      "Not enough quadrats",
      "Quadrats overlapping",
      "Misidentifying species"
    ],
    examTips: [
      "Population estimate = (mean per m²) × total area",
      "More quadrats = more reliable data",
      "Systematic sampling shows zonation/gradients",
      "Random sampling avoids bias"
    ],
    keyCalculations: [
      "Mean organisms per quadrat = total count / number of quadrats",
      "Population estimate = mean per quadrat × (total area / quadrat area)"
    ]
  }
];

export const chemistryPracticals: RequiredPractical[] = [
  {
    id: "chem-1",
    subject: "chemistry",
    title: "Making a Soluble Salt",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To prepare a pure, dry sample of a soluble salt from an insoluble base/carbonate",
    equipment: [
      "Dilute acid (e.g., sulfuric acid)",
      "Insoluble base (e.g., copper oxide) or carbonate",
      "Beaker",
      "Bunsen burner, tripod, gauze",
      "Stirring rod",
      "Filter funnel and paper",
      "Evaporating basin",
      "Crystallising dish"
    ],
    method: [
      "Add dilute acid to a beaker and warm gently",
      "Add insoluble base/carbonate in small amounts, stirring",
      "Continue adding until excess solid remains (no more reaction)",
      "Filter to remove excess solid",
      "Pour filtrate into evaporating basin",
      "Heat gently until crystals start to form at edges",
      "Leave to cool and crystallise slowly",
      "Pat crystals dry with filter paper"
    ],
    variables: {
      independent: "N/A (method practical)",
      dependent: "Mass/purity of salt produced",
      control: ["Temperature", "Concentration of acid", "Excess of solid"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Acids are corrosive/irritant",
      "Copper oxide is harmful",
      "Take care with hot apparatus"
    ],
    expectedResults: "Blue crystals of copper sulfate (from copper oxide + sulfuric acid). White crystals for other salts.",
    graphType: "N/A - practical method description",
    commonErrors: [
      "Not adding excess base (acid remains)",
      "Heating too strongly (salt decomposes)",
      "Not filtering properly",
      "Crystals too small (cooled too fast)"
    ],
    examTips: [
      "Know the word equations: CuO + H₂SO₄ → CuSO₄ + H₂O",
      "Excess solid ensures all acid is neutralised",
      "Slow cooling = larger crystals",
      "Can use metal + acid (but metal must be above hydrogen in reactivity series)"
    ]
  },
  {
    id: "chem-2",
    subject: "chemistry",
    title: "Neutralisation and pH",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate neutralisation by measuring temperature change and/or pH",
    equipment: [
      "Dilute acid",
      "Dilute alkali",
      "Measuring cylinder or burette",
      "Polystyrene cup (as calorimeter)",
      "Thermometer",
      "pH meter or universal indicator",
      "Stirring rod"
    ],
    method: [
      "Measure 25cm³ of acid into polystyrene cup",
      "Record initial temperature",
      "Add alkali in 5cm³ portions",
      "Stir and record temperature after each addition",
      "Continue until temperature starts to fall",
      "Plot graph to find maximum temperature and neutralisation point"
    ],
    variables: {
      independent: "Volume of alkali added",
      dependent: "Temperature / pH",
      control: ["Concentration of solutions", "Starting volume of acid", "Starting temperature"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Acids and alkalis are corrosive/irritant",
      "Wipe up spills immediately"
    ],
    expectedResults: "Temperature rises as alkali added, reaches maximum at neutralisation point, then falls. pH goes from <7 to 7 to >7.",
    graphType: "Line graph: volume of alkali (x-axis) vs temperature (y-axis)",
    commonErrors: [
      "Heat loss to surroundings",
      "Adding alkali too quickly",
      "Not stirring properly",
      "Misreading thermometer"
    ],
    examTips: [
      "Neutralisation is exothermic",
      "acid + alkali → salt + water",
      "H⁺ + OH⁻ → H₂O",
      "Maximum temperature = neutralisation point"
    ]
  },
  {
    id: "chem-3",
    subject: "chemistry",
    title: "Electrolysis",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate electrolysis of aqueous solutions",
    equipment: [
      "Electrolysis cell or beaker",
      "Inert electrodes (carbon or platinum)",
      "DC power supply",
      "Wires and crocodile clips",
      "Solutions (copper sulfate, sodium chloride, sodium sulfate)",
      "Test tubes for collecting gas",
      "Splint for testing"
    ],
    method: [
      "Set up electrolysis cell with two electrodes",
      "Fill with electrolyte solution",
      "Connect to DC power supply (6V)",
      "Observe what happens at each electrode",
      "Collect any gases and test them",
      "Record observations for cathode (−) and anode (+)"
    ],
    variables: {
      independent: "Type of electrolyte",
      dependent: "Products at each electrode",
      control: ["Voltage", "Electrode material", "Concentration", "Time"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Chlorine gas is toxic - work in well-ventilated area",
      "Don't touch electrodes when power is on",
      "Some solutions are irritants"
    ],
    expectedResults: "Copper sulfate: copper at cathode, oxygen at anode. Sodium chloride: hydrogen at cathode, chlorine at anode. Sodium sulfate: hydrogen at cathode, oxygen at anode.",
    graphType: "Results table comparing products at each electrode",
    commonErrors: [
      "Confusing cathode and anode",
      "Electrodes touching",
      "Wrong gas tests",
      "Not collecting enough gas to test"
    ],
    examTips: [
      "CATHODE = negative = CATIONS attracted = reduction (gain electrons)",
      "ANODE = positive = ANIONS attracted = oxidation (lose electrons)",
      "Metal ions less reactive than hydrogen → metal deposited",
      "Halide ions → halogen released at anode"
    ]
  },
  {
    id: "chem-4",
    subject: "chemistry",
    title: "Temperature Changes in Reactions",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate temperature changes in neutralisation, displacement, and dissolution",
    equipment: [
      "Polystyrene cup",
      "Thermometer or temperature probe",
      "Measuring cylinder",
      "Chemicals for reactions (acid/alkali, metal/salt solution, salt for dissolving)",
      "Stirring rod",
      "Balance"
    ],
    method: [
      "Measure starting temperature of solution",
      "Add reactant and stir",
      "Record highest/lowest temperature reached",
      "Calculate temperature change",
      "Repeat with different concentrations/amounts"
    ],
    variables: {
      independent: "Varies (concentration, mass, type of reaction)",
      dependent: "Temperature change",
      control: ["Volume of solution", "Starting temperature", "Insulation"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Some reactions get very hot",
      "Acids and alkalis are corrosive"
    ],
    expectedResults: "Neutralisation: exothermic (temp rise). Displacement with reactive metal: exothermic. Some dissolving: endothermic (temp drop).",
    graphType: "Temperature vs time graph or bar chart comparing reactions",
    commonErrors: [
      "Heat loss to surroundings",
      "Not measuring maximum/minimum temperature",
      "Using wrong amounts",
      "Not stirring"
    ],
    examTips: [
      "Exothermic: gives out heat, ΔH negative, temperature rises",
      "Endothermic: takes in heat, ΔH positive, temperature falls",
      "Q = mcΔT (energy = mass × specific heat capacity × temp change)",
      "Use polystyrene cup to reduce heat loss"
    ],
    keyCalculations: [
      "Q = m × c × ΔT",
      "Where m = mass of water (g), c = 4.18 J/g°C, ΔT = temperature change"
    ]
  },
  {
    id: "chem-5",
    subject: "chemistry",
    title: "Rates of Reaction",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To investigate factors affecting rate of reaction",
    equipment: [
      "Sodium thiosulfate solution (different concentrations)",
      "Dilute hydrochloric acid",
      "Conical flask",
      "Paper with X marked on it",
      "Measuring cylinder",
      "Timer",
      "Water bath (for temperature investigation)",
      "Marble chips and acid (for gas collection method)"
    ],
    method: [
      "DISAPPEARING CROSS: Place flask on paper with X",
      "Add sodium thiosulfate solution",
      "Add acid and start timer",
      "Time until X disappears",
      "Repeat with different concentrations/temperatures",
      "GAS COLLECTION: React marble chips with acid, collect gas, measure volume over time"
    ],
    variables: {
      independent: "Concentration (or temperature, surface area, catalyst)",
      dependent: "Time for X to disappear (or volume of gas produced)",
      control: ["Total volume", "Viewing conditions", "Amount of reactants"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Sulfur dioxide produced - work in ventilated area",
      "Acids are irritants"
    ],
    expectedResults: "Higher concentration = faster rate (shorter time). Higher temperature = faster rate. Smaller pieces = faster rate. Catalyst = faster rate.",
    graphType: "Rate (1/time) vs concentration OR Volume of gas vs time",
    commonErrors: [
      "Different people judging endpoint",
      "Not controlling temperature",
      "Parallax error reading measurements",
      "Not enough repeats"
    ],
    examTips: [
      "Rate = 1/time (s⁻¹)",
      "Collision theory: more collisions = faster rate",
      "Higher temp = more energy = more successful collisions",
      "Catalyst lowers activation energy"
    ],
    keyCalculations: [
      "Rate = 1/time",
      "Mean rate = total volume / time"
    ]
  },
  {
    id: "chem-6",
    subject: "chemistry",
    title: "Chromatography",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To separate and identify substances using paper chromatography",
    equipment: [
      "Chromatography paper",
      "Pencil",
      "Ruler",
      "Capillary tubes or small pipettes",
      "Beaker with lid",
      "Solvent (water or ethanol)",
      "Samples to test (inks, food colourings, plant pigments)"
    ],
    method: [
      "Draw pencil line 2cm from bottom of paper",
      "Apply small spots of samples on the line",
      "Allow to dry, apply more spots if needed",
      "Place paper in beaker with solvent below the line",
      "Cover and leave until solvent nearly reaches top",
      "Remove and mark solvent front",
      "Measure distances and calculate Rf values"
    ],
    variables: {
      independent: "Type of sample",
      dependent: "Rf value / number of spots",
      control: ["Solvent", "Paper type", "Temperature", "Starting line position"]
    },
    safetyPoints: [
      "Some solvents are flammable",
      "Work in ventilated area",
      "Avoid skin contact with solvents"
    ],
    expectedResults: "Different substances travel different distances. Mixtures separate into components. Same Rf = same substance.",
    graphType: "N/A - calculate Rf values",
    commonErrors: [
      "Starting line in solvent",
      "Spots too big/wet",
      "Not marking solvent front",
      "Using pen for baseline (pen dissolves)"
    ],
    examTips: [
      "Rf = distance moved by substance / distance moved by solvent",
      "Rf is always between 0 and 1",
      "Same Rf in same solvent = same substance",
      "Use pencil because it doesn't dissolve"
    ],
    keyCalculations: [
      "Rf = distance moved by spot / distance moved by solvent front"
    ]
  },
  {
    id: "chem-7",
    subject: "chemistry",
    title: "Identifying Ions",
    specification: ["separate"],
    paper: 2,
    purpose: "To identify metal ions and non-metal ions using chemical tests",
    equipment: [
      "Test tubes and rack",
      "Sodium hydroxide solution",
      "Flame test equipment (nichrome wire, Bunsen burner)",
      "Dilute acids (hydrochloric, sulfuric, nitric)",
      "Silver nitrate solution",
      "Barium chloride solution",
      "Unknown solutions"
    ],
    method: [
      "FLAME TEST: Dip wire in acid, then sample, hold in blue flame",
      "HYDROXIDE PRECIPITATES: Add NaOH to solution, observe precipitate colour",
      "CARBONATE: Add acid, test gas with limewater",
      "HALIDES: Add nitric acid then silver nitrate",
      "SULFATE: Add HCl then barium chloride"
    ],
    variables: {
      independent: "Type of ion being tested",
      dependent: "Colour/precipitate formed",
      control: ["Concentration of reagents", "Amount used"]
    },
    safetyPoints: [
      "Wear safety goggles",
      "Silver nitrate stains skin",
      "Barium compounds are toxic",
      "Acids are corrosive"
    ],
    expectedResults: "Flame: Li=red, Na=yellow, K=lilac, Ca=orange-red, Cu=green. Precipitates: Cu²⁺=blue, Fe²⁺=green, Fe³⁺=brown. Halides: Cl⁻=white, Br⁻=cream, I⁻=yellow.",
    graphType: "Results table",
    commonErrors: [
      "Wire not clean",
      "Wrong colour identification",
      "Confusing similar colours",
      "Not acidifying before silver nitrate"
    ],
    examTips: [
      "Clean wire between tests",
      "NaOH + metal ion → metal hydroxide precipitate",
      "CO₃²⁻ + acid → CO₂ (turns limewater milky)",
      "SO₄²⁻ + BaCl₂ → BaSO₄ (white precipitate)"
    ]
  },
  {
    id: "chem-8",
    subject: "chemistry",
    title: "Water Purification",
    specification: ["separate"],
    paper: 2,
    purpose: "To analyse and purify water samples",
    equipment: [
      "Distillation apparatus",
      "Water samples",
      "pH meter/universal indicator",
      "Evaporating basin",
      "Bunsen burner"
    ],
    method: [
      "Test pH of water sample",
      "Evaporate sample to dryness - observe residue",
      "Set up distillation apparatus",
      "Heat water and collect distillate",
      "Test pH and evaporate distillate to check purity"
    ],
    variables: {
      independent: "Water sample source",
      dependent: "Purity (residue, pH)",
      control: ["Volume tested", "Temperature of distillation"]
    },
    safetyPoints: [
      "Take care with hot apparatus",
      "Don't taste water samples",
      "Ensure good ventilation"
    ],
    expectedResults: "Tap water leaves residue (dissolved minerals). Distilled water leaves no residue. Pure water has pH 7.",
    graphType: "Comparison table of water samples",
    commonErrors: [
      "Boiling too vigorously",
      "Contaminating distillate",
      "Not collecting at correct temperature"
    ],
    examTips: [
      "Distillation separates by boiling point",
      "Pure water boils at 100°C",
      "Potable water is safe to drink (not pure)",
      "Desalination removes salt from seawater"
    ]
  }
];

export const physicsPracticals: RequiredPractical[] = [
  {
    id: "phys-1",
    subject: "physics",
    title: "Specific Heat Capacity",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To determine the specific heat capacity of a material",
    equipment: [
      "Metal block with holes for heater and thermometer",
      "Immersion heater",
      "Thermometer or temperature probe",
      "Joulemeter (or ammeter, voltmeter, timer)",
      "Power supply",
      "Insulation",
      "Balance"
    ],
    method: [
      "Measure mass of metal block",
      "Insert heater and thermometer into block",
      "Insulate the block",
      "Record starting temperature",
      "Turn on heater and joulemeter (or note V, I, and start timer)",
      "Heat for set time (e.g., 10 minutes)",
      "Record final temperature and energy supplied",
      "Calculate specific heat capacity"
    ],
    variables: {
      independent: "Energy supplied",
      dependent: "Temperature change",
      control: ["Mass of block", "Insulation", "Starting temperature"]
    },
    safetyPoints: [
      "Metal block gets very hot - don't touch",
      "Keep water away from electrical equipment",
      "Allow to cool before handling"
    ],
    expectedResults: "c for aluminium ≈ 900 J/kg°C, c for iron ≈ 450 J/kg°C, c for copper ≈ 385 J/kg°C",
    graphType: "Can plot temperature vs energy to find gradient",
    commonErrors: [
      "Heat loss to surroundings",
      "Poor contact between heater and block",
      "Not waiting for thermal equilibrium",
      "Using uninsulated block"
    ],
    examTips: [
      "E = mcΔT rearranges to c = E/(mΔT)",
      "Energy from joulemeter OR E = Pt = VIt",
      "Higher SHC = takes more energy to heat",
      "Water has very high SHC (4200 J/kg°C)"
    ],
    keyCalculations: [
      "c = E / (m × ΔT)",
      "E = P × t = V × I × t",
      "Units: c in J/kg°C, E in J, m in kg, ΔT in °C"
    ]
  },
  {
    id: "phys-2",
    subject: "physics",
    title: "Thermal Insulation",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate the effectiveness of different materials as thermal insulators",
    equipment: [
      "Beakers or boiling tubes",
      "Hot water",
      "Thermometer",
      "Timer",
      "Different insulating materials (bubble wrap, cotton wool, newspaper, foil)",
      "Elastic bands",
      "Measuring cylinder"
    ],
    method: [
      "Wrap each beaker in different insulating material",
      "Leave one unwrapped as control",
      "Add same volume of hot water to each",
      "Record starting temperature",
      "Record temperature every minute for 10 minutes",
      "Plot cooling curves for each"
    ],
    variables: {
      independent: "Type of insulating material",
      dependent: "Rate of temperature decrease",
      control: ["Volume of water", "Starting temperature", "Beaker type", "Room temperature"]
    },
    safetyPoints: [
      "Take care with hot water",
      "Mop up spills immediately",
      "Don't touch hot beakers"
    ],
    expectedResults: "Best insulators show slowest temperature drop. Trapped air is a good insulator. Shiny surfaces reduce radiation.",
    graphType: "Line graph: time (x-axis) vs temperature (y-axis) - multiple lines",
    commonErrors: [
      "Different starting temperatures",
      "Different water volumes",
      "Draughts affecting results",
      "Material not covering whole beaker"
    ],
    examTips: [
      "Heat loss by: conduction, convection, radiation",
      "Trapped air reduces conduction and convection",
      "Shiny surfaces reduce radiation",
      "Rate of cooling = temperature change / time"
    ]
  },
  {
    id: "phys-3",
    subject: "physics",
    title: "Resistance",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate how length affects the resistance of a wire",
    equipment: [
      "Constantan wire (mounted on ruler)",
      "Ammeter",
      "Voltmeter",
      "Power supply",
      "Crocodile clips",
      "Connecting wires",
      "Micrometer or wire gauge"
    ],
    method: [
      "Set up circuit with ammeter in series, voltmeter in parallel with wire",
      "Connect crocodile clips at set length (e.g., 10cm)",
      "Record current and voltage",
      "Calculate resistance (R = V/I)",
      "Repeat for different lengths (20, 30, 40, 50cm)",
      "Repeat each length 3 times"
    ],
    variables: {
      independent: "Length of wire",
      dependent: "Resistance",
      control: ["Wire material", "Wire diameter", "Temperature"]
    },
    safetyPoints: [
      "Don't leave circuit on too long (wire heats up)",
      "Use low voltage",
      "Be careful of sharp wire ends"
    ],
    expectedResults: "Resistance is directly proportional to length. Double length = double resistance.",
    graphType: "Line graph: length (x-axis) vs resistance (y-axis) - straight line through origin",
    commonErrors: [
      "Wire heating up (changing resistance)",
      "Poor connections",
      "Parallax error reading meters",
      "Not measuring from correct points"
    ],
    examTips: [
      "R = V/I (Ohm's law)",
      "R ∝ L (resistance proportional to length)",
      "R ∝ 1/A (resistance inversely proportional to cross-sectional area)",
      "Use thin wire and low current to reduce heating"
    ],
    keyCalculations: [
      "R = V / I",
      "Gradient of R-L graph = resistance per unit length"
    ]
  },
  {
    id: "phys-4",
    subject: "physics",
    title: "I-V Characteristics",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To investigate the I-V characteristics of different components",
    equipment: [
      "Resistor, filament lamp, diode",
      "Ammeter",
      "Voltmeter",
      "Variable power supply (or variable resistor)",
      "Connecting wires"
    ],
    method: [
      "Set up circuit with component, ammeter in series, voltmeter in parallel",
      "Start with low voltage",
      "Record current and voltage",
      "Increase voltage in steps, recording I and V each time",
      "For diode: reverse connections and repeat",
      "Plot I-V graph for each component"
    ],
    variables: {
      independent: "Voltage (or current)",
      dependent: "Current (or voltage)",
      control: ["Component tested", "Circuit connections"]
    },
    safetyPoints: [
      "Filament lamp gets hot",
      "Don't exceed component ratings",
      "Switch off between readings for lamp"
    ],
    expectedResults: "Resistor: straight line through origin. Lamp: curve (resistance increases when hot). Diode: only conducts in forward direction.",
    graphType: "I-V graph: voltage (x-axis) vs current (y-axis)",
    commonErrors: [
      "Lamp heating between readings",
      "Not using full range of values",
      "Forgetting reverse bias for diode",
      "Connecting voltmeter in series"
    ],
    examTips: [
      "Ohmic conductor: straight line through origin",
      "Lamp: resistance increases with temperature",
      "Diode: very high resistance in reverse",
      "Gradient of V-I graph = resistance"
    ]
  },
  {
    id: "phys-5",
    subject: "physics",
    title: "Density",
    specification: ["trilogy", "separate"],
    paper: 1,
    purpose: "To determine the density of regular and irregular objects",
    equipment: [
      "Balance",
      "Ruler/vernier calipers",
      "Measuring cylinder",
      "Water",
      "Regular shaped objects (cubes, cylinders)",
      "Irregular objects (stones, plasticine)"
    ],
    method: [
      "REGULAR OBJECTS: Measure mass on balance",
      "Measure dimensions with ruler",
      "Calculate volume using formula",
      "Calculate density = mass/volume",
      "IRREGULAR OBJECTS: Measure mass on balance",
      "Fill measuring cylinder with water, record volume",
      "Add object, record new volume",
      "Volume of object = difference in volumes",
      "Calculate density"
    ],
    variables: {
      independent: "Type of material",
      dependent: "Density",
      control: ["Measurement technique", "Temperature"]
    },
    safetyPoints: [
      "Mop up water spills",
      "Handle objects carefully"
    ],
    expectedResults: "Different materials have different densities. Water = 1000 kg/m³ = 1 g/cm³",
    graphType: "Comparison table or bar chart",
    commonErrors: [
      "Not reading water level at meniscus",
      "Splashing when adding object",
      "Calculation errors with units",
      "Object not fully submerged"
    ],
    examTips: [
      "ρ = m/V",
      "Units: kg/m³ or g/cm³",
      "1000 kg/m³ = 1 g/cm³",
      "If density < water density, object floats"
    ],
    keyCalculations: [
      "ρ = m / V",
      "Volume of cuboid = l × w × h",
      "Volume of cylinder = πr²h"
    ]
  },
  {
    id: "phys-6",
    subject: "physics",
    title: "Force and Extension",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To investigate the relationship between force and extension for a spring",
    equipment: [
      "Spring",
      "Clamp stand, boss, clamp",
      "Ruler",
      "Slotted masses and hanger",
      "Pointer (optional)",
      "Safety goggles"
    ],
    method: [
      "Set up spring hanging from clamp stand",
      "Measure original length of spring",
      "Add mass and measure new length",
      "Calculate extension (new length - original)",
      "Add more mass and repeat",
      "Plot force-extension graph"
    ],
    variables: {
      independent: "Force (weight of masses)",
      dependent: "Extension of spring",
      control: ["Spring used", "Method of measurement"]
    },
    safetyPoints: [
      "Wear safety goggles (spring may snap)",
      "Place padding under masses",
      "Don't exceed elastic limit"
    ],
    expectedResults: "Linear relationship up to elastic limit (Hooke's law). Beyond limit, spring permanently deforms.",
    graphType: "Force-extension graph: force (x-axis) vs extension (y-axis)",
    commonErrors: [
      "Parallax error reading ruler",
      "Measuring length not extension",
      "Exceeding elastic limit",
      "Spring oscillating when reading"
    ],
    examTips: [
      "F = ke (force = spring constant × extension)",
      "k = gradient of F-E graph (in linear region)",
      "Higher k = stiffer spring",
      "Elastic limit = point where Hooke's law stops applying"
    ],
    keyCalculations: [
      "F = k × e",
      "k = F / e",
      "Weight = mass × g (g = 10 N/kg)"
    ]
  },
  {
    id: "phys-7",
    subject: "physics",
    title: "Acceleration",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To investigate the effect of varying force/mass on acceleration",
    equipment: [
      "Dynamics trolley",
      "Runway",
      "Light gates and data logger (or ticker timer)",
      "Pulley",
      "String",
      "Slotted masses",
      "Balance"
    ],
    method: [
      "Set up trolley on runway with string over pulley",
      "Attach masses to string",
      "Release trolley and measure acceleration using light gates",
      "Repeat with different accelerating forces",
      "Or keep force constant and add mass to trolley",
      "Plot graphs of a vs F and a vs 1/m"
    ],
    variables: {
      independent: "Force (or mass)",
      dependent: "Acceleration",
      control: ["Total mass (when varying force)", "Force (when varying mass)", "Friction"]
    },
    safetyPoints: [
      "Catch trolley at end",
      "Don't stand in path of trolley",
      "Secure heavy masses"
    ],
    expectedResults: "a ∝ F (for constant mass). a ∝ 1/m (for constant force). This confirms F = ma.",
    graphType: "a vs F (straight line through origin) or a vs 1/m (straight line through origin)",
    commonErrors: [
      "Friction affecting results",
      "String not parallel to runway",
      "Forgetting to include hanging mass in total",
      "Light gates not set up correctly"
    ],
    examTips: [
      "a = F/m or F = ma",
      "Compensate for friction by tilting runway slightly",
      "Total mass = trolley + any masses on trolley + hanging masses",
      "Accelerating force = weight of hanging masses"
    ],
    keyCalculations: [
      "a = (v - u) / t",
      "F = m × a",
      "Weight = m × g"
    ]
  },
  {
    id: "phys-8",
    subject: "physics",
    title: "Waves",
    specification: ["trilogy", "separate"],
    paper: 2,
    purpose: "To measure the frequency, wavelength and speed of waves",
    equipment: [
      "Ripple tank with motor",
      "Stroboscope",
      "Ruler",
      "Light source",
      "White paper",
      "Signal generator and loudspeaker (for sound)",
      "Microphone and oscilloscope"
    ],
    method: [
      "RIPPLE TANK: Set up ripple tank with motor running",
      "Use stroboscope to 'freeze' waves",
      "Measure wavelength using ruler",
      "Count waves per second for frequency",
      "Calculate speed = frequency × wavelength",
      "SOUND: Use oscilloscope to measure frequency",
      "Measure wavelength using standing wave method"
    ],
    variables: {
      independent: "Frequency of vibrations",
      dependent: "Wavelength",
      control: ["Depth of water", "Temperature"]
    },
    safetyPoints: [
      "Keep water away from electrics",
      "Strobe may trigger photosensitive epilepsy",
      "Don't overload speakers"
    ],
    expectedResults: "Higher frequency = shorter wavelength. Speed depends on medium (water depth for ripple tank).",
    graphType: "Can plot f vs 1/λ to find wave speed",
    commonErrors: [
      "Measuring multiple wavelengths wrongly",
      "Strobe frequency not synchronised",
      "Parallax errors",
      "Reflections interfering"
    ],
    examTips: [
      "v = f × λ (wave equation)",
      "Speed of sound in air ≈ 340 m/s",
      "Speed of light ≈ 3 × 10⁸ m/s",
      "Frequency = number of waves per second (Hz)"
    ],
    keyCalculations: [
      "v = f × λ",
      "f = 1 / T (frequency = 1/period)"
    ]
  },
  {
    id: "phys-9",
    subject: "physics",
    title: "Light (Reflection and Refraction)",
    specification: ["separate"],
    paper: 2,
    purpose: "To investigate reflection and refraction of light",
    equipment: [
      "Ray box and single slit",
      "Plane mirror",
      "Rectangular glass/perspex block",
      "Protractor",
      "Pencil",
      "Plain paper",
      "Pins"
    ],
    method: [
      "REFLECTION: Shine ray at mirror, mark incident and reflected rays",
      "Measure angle of incidence and reflection",
      "REFRACTION: Place glass block on paper",
      "Shine ray through block at different angles",
      "Mark entry and exit points",
      "Draw normals, measure angles",
      "Calculate refractive index"
    ],
    variables: {
      independent: "Angle of incidence",
      dependent: "Angle of reflection/refraction",
      control: ["Position of mirror/block", "Light source"]
    },
    safetyPoints: [
      "Don't look directly into ray box",
      "Handle glass carefully",
      "Don't leave ray box on too long (gets hot)"
    ],
    expectedResults: "Reflection: angle i = angle r. Refraction: light bends towards normal when entering denser medium.",
    graphType: "sin i vs sin r (straight line, gradient = refractive index)",
    commonErrors: [
      "Measuring from wrong line (not the normal)",
      "Inaccurate ray drawing",
      "Block moving during experiment",
      "Not using thin rays"
    ],
    examTips: [
      "Law of reflection: angle i = angle r",
      "n = sin i / sin r (Snell's law)",
      "Light slows down in denser medium",
      "Total internal reflection when angle > critical angle"
    ],
    keyCalculations: [
      "n = sin i / sin r",
      "sin c = 1/n (critical angle)"
    ]
  },
  {
    id: "phys-10",
    subject: "physics",
    title: "Radiation and Absorption",
    specification: ["separate"],
    paper: 2,
    purpose: "To investigate how surface colour affects radiation and absorption",
    equipment: [
      "Leslie cube (or metal cans)",
      "Infrared detector",
      "Thermometers",
      "Hot water",
      "Surfaces: matt black, shiny silver, white",
      "Radiant heater",
      "Timer"
    ],
    method: [
      "EMISSION: Fill Leslie cube with hot water",
      "Point IR detector at each surface in turn",
      "Compare readings for different surfaces",
      "ABSORPTION: Place cans with different surfaces equal distance from heater",
      "Record temperature change over time",
      "Compare which heats up fastest"
    ],
    variables: {
      independent: "Surface colour/texture",
      dependent: "Rate of emission/absorption",
      control: ["Distance from source", "Starting temperature", "Time"]
    },
    safetyPoints: [
      "Take care with hot water/heater",
      "Don't touch hot surfaces",
      "Keep heater away from flammable materials"
    ],
    expectedResults: "Matt black: best emitter and absorber. Shiny silver: worst emitter and absorber. White: poor absorber, good reflector.",
    graphType: "Bar chart comparing surfaces or temperature-time graphs",
    commonErrors: [
      "Different distances from source",
      "Draughts affecting results",
      "Different volumes of water",
      "Background radiation interfering"
    ],
    examTips: [
      "Good absorbers are good emitters",
      "Matt black = best absorber AND emitter",
      "Shiny silver = best reflector, worst absorber",
      "All objects emit infrared radiation"
    ]
  }
];

// Helper function to get all practicals
export function getAllPracticals(): RequiredPractical[] {
  return [...biologyPracticals, ...chemistryPracticals, ...physicsPracticals];
}

// Helper function to get practicals by subject
export function getPracticalsBySubject(subject: "biology" | "chemistry" | "physics"): RequiredPractical[] {
  switch (subject) {
    case "biology": return biologyPracticals;
    case "chemistry": return chemistryPracticals;
    case "physics": return physicsPracticals;
  }
}

// Helper to get practical by ID
export function getPracticalById(id: string): RequiredPractical | undefined {
  return getAllPracticals().find(p => p.id === id);
}
