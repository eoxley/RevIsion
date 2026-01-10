/**
 * Curriculum Diagnostic Questions
 *
 * These questions assess where a student is in the GCSE curriculum.
 * NOT revision. NOT hints. Just clean diagnostic questions.
 *
 * Rules:
 * - Each question tests a specific curriculum area
 * - No teaching, no hints, no explanation
 * - Questions must end with ?
 * - Maximum 3 questions per diagnostic session
 */

interface DiagnosticQuestion {
  id: string;
  question: string;
  topic_area: string;
  difficulty: "foundation" | "core" | "higher";
}

// Subject-specific diagnostic question banks
// Each subject has 10 questions covering curriculum breadth

const DIAGNOSTIC_QUESTIONS: Record<string, DiagnosticQuestion[]> = {
  // MATHS
  MATHS: [
    { id: "m1", question: "What is 15% of 80?", topic_area: "percentages", difficulty: "foundation" },
    { id: "m2", question: "Solve for x: 3x + 7 = 22", topic_area: "algebra", difficulty: "foundation" },
    { id: "m3", question: "What is the area of a triangle with base 6cm and height 4cm?", topic_area: "geometry", difficulty: "foundation" },
    { id: "m4", question: "Simplify: 3x² × 2x³", topic_area: "algebra", difficulty: "core" },
    { id: "m5", question: "What is the gradient of the line y = 3x - 5?", topic_area: "graphs", difficulty: "core" },
    { id: "m6", question: "Factorise: x² + 5x + 6", topic_area: "algebra", difficulty: "core" },
    { id: "m7", question: "What is sin(30°)?", topic_area: "trigonometry", difficulty: "higher" },
    { id: "m8", question: "Solve: x² - 5x + 6 = 0", topic_area: "quadratics", difficulty: "higher" },
    { id: "m9", question: "What is the nth term of the sequence 3, 7, 11, 15...?", topic_area: "sequences", difficulty: "core" },
    { id: "m10", question: "Calculate the probability of rolling a 6 on a fair dice twice in a row.", topic_area: "probability", difficulty: "core" },
  ],

  // BIOLOGY
  BIOLOGY: [
    { id: "b1", question: "What is the function of the mitochondria in a cell?", topic_area: "cells", difficulty: "foundation" },
    { id: "b2", question: "Name the four chambers of the human heart.", topic_area: "circulation", difficulty: "foundation" },
    { id: "b3", question: "What gas do plants absorb during photosynthesis?", topic_area: "photosynthesis", difficulty: "foundation" },
    { id: "b4", question: "What is the role of enzymes in digestion?", topic_area: "digestion", difficulty: "core" },
    { id: "b5", question: "Explain what happens during mitosis.", topic_area: "cell_division", difficulty: "core" },
    { id: "b6", question: "What is natural selection?", topic_area: "evolution", difficulty: "core" },
    { id: "b7", question: "How do antibodies help fight disease?", topic_area: "immunity", difficulty: "higher" },
    { id: "b8", question: "What is the difference between aerobic and anaerobic respiration?", topic_area: "respiration", difficulty: "core" },
    { id: "b9", question: "Name the hormone that controls blood sugar levels.", topic_area: "hormones", difficulty: "core" },
    { id: "b10", question: "What are the products of photosynthesis?", topic_area: "photosynthesis", difficulty: "foundation" },
  ],

  // CHEMISTRY
  CHEMISTRY: [
    { id: "c1", question: "What are the three states of matter?", topic_area: "states_of_matter", difficulty: "foundation" },
    { id: "c2", question: "What is the chemical formula for water?", topic_area: "formulae", difficulty: "foundation" },
    { id: "c3", question: "What happens to atoms during a chemical reaction?", topic_area: "reactions", difficulty: "foundation" },
    { id: "c4", question: "Balance this equation: H₂ + O₂ → H₂O", topic_area: "equations", difficulty: "core" },
    { id: "c5", question: "What is an ionic bond?", topic_area: "bonding", difficulty: "core" },
    { id: "c6", question: "What is the pH of a neutral solution?", topic_area: "acids_bases", difficulty: "foundation" },
    { id: "c7", question: "What is electrolysis?", topic_area: "electrolysis", difficulty: "higher" },
    { id: "c8", question: "Name the products when an acid reacts with a metal carbonate.", topic_area: "reactions", difficulty: "core" },
    { id: "c9", question: "What is the difference between an atom and an ion?", topic_area: "atomic_structure", difficulty: "core" },
    { id: "c10", question: "How many electrons can the first shell of an atom hold?", topic_area: "atomic_structure", difficulty: "foundation" },
  ],

  // PHYSICS
  PHYSICS: [
    { id: "p1", question: "What is the unit of force?", topic_area: "forces", difficulty: "foundation" },
    { id: "p2", question: "State the equation for speed.", topic_area: "motion", difficulty: "foundation" },
    { id: "p3", question: "What is the difference between mass and weight?", topic_area: "forces", difficulty: "foundation" },
    { id: "p4", question: "What is Ohm's Law?", topic_area: "electricity", difficulty: "core" },
    { id: "p5", question: "Calculate the kinetic energy of a 2kg object moving at 3m/s.", topic_area: "energy", difficulty: "core" },
    { id: "p6", question: "What is the frequency of a wave with wavelength 2m and speed 10m/s?", topic_area: "waves", difficulty: "core" },
    { id: "p7", question: "What is nuclear fission?", topic_area: "nuclear", difficulty: "higher" },
    { id: "p8", question: "State Newton's First Law of Motion.", topic_area: "forces", difficulty: "core" },
    { id: "p9", question: "What type of energy transformation occurs in a battery?", topic_area: "energy", difficulty: "foundation" },
    { id: "p10", question: "What is the relationship between voltage, current and resistance?", topic_area: "electricity", difficulty: "core" },
  ],

  // COMBINED SCIENCE
  COMBINED_SCI: [
    { id: "cs1", question: "What is the function of the nucleus in a cell?", topic_area: "cells", difficulty: "foundation" },
    { id: "cs2", question: "What is the chemical symbol for carbon dioxide?", topic_area: "formulae", difficulty: "foundation" },
    { id: "cs3", question: "What is the unit of electrical current?", topic_area: "electricity", difficulty: "foundation" },
    { id: "cs4", question: "What happens to particles when a substance is heated?", topic_area: "particles", difficulty: "foundation" },
    { id: "cs5", question: "Name the process by which plants make glucose.", topic_area: "photosynthesis", difficulty: "foundation" },
    { id: "cs6", question: "What is an exothermic reaction?", topic_area: "energy_changes", difficulty: "core" },
    { id: "cs7", question: "Calculate the acceleration of an object that goes from 0 to 20m/s in 4 seconds.", topic_area: "motion", difficulty: "core" },
    { id: "cs8", question: "What is the role of white blood cells?", topic_area: "immunity", difficulty: "core" },
    { id: "cs9", question: "What is meant by conservation of energy?", topic_area: "energy", difficulty: "core" },
    { id: "cs10", question: "Balance this equation: Mg + HCl → MgCl₂ + H₂", topic_area: "equations", difficulty: "core" },
  ],

  // ENGLISH LANGUAGE
  ENG_LANG: [
    { id: "el1", question: "What is the difference between a simile and a metaphor?", topic_area: "language_devices", difficulty: "foundation" },
    { id: "el2", question: "What does 'inference' mean when reading a text?", topic_area: "reading_skills", difficulty: "foundation" },
    { id: "el3", question: "What is the purpose of a topic sentence in a paragraph?", topic_area: "writing_structure", difficulty: "foundation" },
    { id: "el4", question: "How does a writer create tension in a narrative?", topic_area: "creative_writing", difficulty: "core" },
    { id: "el5", question: "What is the effect of using short sentences in writing?", topic_area: "language_effects", difficulty: "core" },
    { id: "el6", question: "What should you include in the introduction of an argumentative essay?", topic_area: "transactional_writing", difficulty: "core" },
    { id: "el7", question: "What is 'pathetic fallacy'?", topic_area: "language_devices", difficulty: "higher" },
    { id: "el8", question: "How do you identify the writer's viewpoint in a non-fiction text?", topic_area: "analysis", difficulty: "core" },
    { id: "el9", question: "What is the difference between explicit and implicit information?", topic_area: "reading_skills", difficulty: "core" },
    { id: "el10", question: "Name three persuasive techniques.", topic_area: "rhetoric", difficulty: "foundation" },
  ],

  // ENGLISH LITERATURE
  ENG_LIT: [
    { id: "elit1", question: "What is the difference between a theme and a motif?", topic_area: "literary_terms", difficulty: "foundation" },
    { id: "elit2", question: "What is dramatic irony?", topic_area: "literary_devices", difficulty: "foundation" },
    { id: "elit3", question: "What is the role of the chorus in a play?", topic_area: "drama", difficulty: "core" },
    { id: "elit4", question: "How does context influence the meaning of a literary text?", topic_area: "context", difficulty: "core" },
    { id: "elit5", question: "What is the difference between first person and third person narration?", topic_area: "narrative_voice", difficulty: "foundation" },
    { id: "elit6", question: "What is iambic pentameter?", topic_area: "poetry", difficulty: "higher" },
    { id: "elit7", question: "How do you embed quotations in an essay?", topic_area: "essay_skills", difficulty: "core" },
    { id: "elit8", question: "What is a soliloquy?", topic_area: "drama", difficulty: "core" },
    { id: "elit9", question: "What does 'foreshadowing' mean?", topic_area: "literary_devices", difficulty: "core" },
    { id: "elit10", question: "What is the structure of a sonnet?", topic_area: "poetry", difficulty: "higher" },
  ],

  // HISTORY
  HISTORY: [
    { id: "h1", question: "What were the main causes of World War One?", topic_area: "ww1", difficulty: "foundation" },
    { id: "h2", question: "What was the Treaty of Versailles?", topic_area: "peace_treaties", difficulty: "foundation" },
    { id: "h3", question: "How did Hitler come to power in Germany?", topic_area: "nazi_germany", difficulty: "core" },
    { id: "h4", question: "What was the Cold War?", topic_area: "cold_war", difficulty: "foundation" },
    { id: "h5", question: "What is meant by 'primary source' evidence?", topic_area: "source_skills", difficulty: "foundation" },
    { id: "h6", question: "Why did the Weimar Republic face challenges in the 1920s?", topic_area: "weimar", difficulty: "core" },
    { id: "h7", question: "What was the policy of appeasement?", topic_area: "causes_ww2", difficulty: "core" },
    { id: "h8", question: "How useful is a source for studying history?", topic_area: "source_skills", difficulty: "core" },
    { id: "h9", question: "What were the long-term consequences of World War One?", topic_area: "consequences", difficulty: "higher" },
    { id: "h10", question: "What was life like in Nazi Germany for young people?", topic_area: "nazi_germany", difficulty: "core" },
  ],

  // GEOGRAPHY
  GEOGRAPHY: [
    { id: "g1", question: "What is the difference between weather and climate?", topic_area: "climate", difficulty: "foundation" },
    { id: "g2", question: "Name the three types of plate boundaries.", topic_area: "tectonics", difficulty: "foundation" },
    { id: "g3", question: "What is urbanisation?", topic_area: "urban", difficulty: "foundation" },
    { id: "g4", question: "Describe the water cycle.", topic_area: "water_cycle", difficulty: "foundation" },
    { id: "g5", question: "What causes earthquakes?", topic_area: "tectonics", difficulty: "core" },
    { id: "g6", question: "What are the effects of deforestation?", topic_area: "ecosystems", difficulty: "core" },
    { id: "g7", question: "How do you calculate population density?", topic_area: "population", difficulty: "core" },
    { id: "g8", question: "What is a sustainable development goal?", topic_area: "development", difficulty: "core" },
    { id: "g9", question: "How does a river change from source to mouth?", topic_area: "rivers", difficulty: "core" },
    { id: "g10", question: "What is the greenhouse effect?", topic_area: "climate_change", difficulty: "core" },
  ],

  // COMPUTER SCIENCE
  CS: [
    { id: "cs1", question: "What is an algorithm?", topic_area: "algorithms", difficulty: "foundation" },
    { id: "cs2", question: "What is the difference between RAM and ROM?", topic_area: "hardware", difficulty: "foundation" },
    { id: "cs3", question: "What does CPU stand for and what does it do?", topic_area: "hardware", difficulty: "foundation" },
    { id: "cs4", question: "What is a variable in programming?", topic_area: "programming", difficulty: "foundation" },
    { id: "cs5", question: "Convert the binary number 1010 to decimal.", topic_area: "data_representation", difficulty: "core" },
    { id: "cs6", question: "What is the purpose of an IF statement?", topic_area: "programming", difficulty: "foundation" },
    { id: "cs7", question: "What is SQL used for?", topic_area: "databases", difficulty: "core" },
    { id: "cs8", question: "Explain the difference between a LAN and a WAN.", topic_area: "networks", difficulty: "core" },
    { id: "cs9", question: "What is malware?", topic_area: "security", difficulty: "foundation" },
    { id: "cs10", question: "What is the purpose of a loop in programming?", topic_area: "programming", difficulty: "core" },
  ],
};

// Default questions for subjects not in the bank
const DEFAULT_QUESTIONS: DiagnosticQuestion[] = [
  { id: "d1", question: "What topics in this subject do you feel most confident about?", topic_area: "self_assessment", difficulty: "foundation" },
  { id: "d2", question: "What topics do you find most challenging?", topic_area: "self_assessment", difficulty: "foundation" },
  { id: "d3", question: "When did you last revise this subject?", topic_area: "self_assessment", difficulty: "foundation" },
];

/**
 * Get diagnostic questions for a subject
 *
 * Returns 3 questions selected to cover curriculum breadth
 */
export function getDiagnosticQuestions(
  subjectCode: string,
  count: number = 3
): DiagnosticQuestion[] {
  const questions = DIAGNOSTIC_QUESTIONS[subjectCode] || DEFAULT_QUESTIONS;

  // Select questions covering different difficulty levels
  const foundation = questions.filter((q) => q.difficulty === "foundation");
  const core = questions.filter((q) => q.difficulty === "core");
  const higher = questions.filter((q) => q.difficulty === "higher");

  const selected: DiagnosticQuestion[] = [];

  // Pick 1 foundation, 1 core, 1 higher if available
  if (foundation.length > 0) {
    selected.push(foundation[Math.floor(Math.random() * foundation.length)]);
  }
  if (core.length > 0) {
    selected.push(core[Math.floor(Math.random() * core.length)]);
  }
  if (higher.length > 0) {
    selected.push(higher[Math.floor(Math.random() * higher.length)]);
  }

  // Fill remaining slots randomly if needed
  while (selected.length < count && questions.length > selected.length) {
    const remaining = questions.filter((q) => !selected.includes(q));
    if (remaining.length === 0) break;
    selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  return selected.slice(0, count);
}

/**
 * Get the next diagnostic question for a session
 *
 * Uses question index to pick sequentially from the selected set
 */
export function getNextDiagnosticQuestion(
  subjectCode: string,
  questionIndex: number
): string {
  const questions = getDiagnosticQuestions(subjectCode, 3);

  if (questionIndex >= questions.length) {
    // Fallback - should not happen if logic is correct
    return "What would you like to focus on in this subject?";
  }

  return questions[questionIndex].question;
}

/**
 * Check if subject has diagnostic questions available
 */
export function hasDiagnosticQuestions(subjectCode: string): boolean {
  return subjectCode in DIAGNOSTIC_QUESTIONS;
}
