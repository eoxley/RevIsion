// GCSE Mathematics Knowledge Bank
// Complete formulas, methods, and exam techniques

export interface Formula {
  name: string;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  example: string;
  commonMistakes: string[];
  tier: "foundation" | "higher" | "both";
}

export interface Topic {
  name: string;
  subtopics: string[];
  keyFormulas: Formula[];
  methods: { name: string; steps: string[] }[];
  examTips: string[];
}

// ═══════════════════════════════════════════════════════════
// NUMBER
// ═══════════════════════════════════════════════════════════
export const numberTopics: Topic[] = [
  {
    name: "Fractions, Decimals, Percentages",
    subtopics: ["Converting between forms", "Ordering", "Calculations", "Percentage change"],
    keyFormulas: [
      {
        name: "Percentage of an amount",
        formula: "Amount × (Percentage ÷ 100)",
        variables: [],
        example: "Find 15% of £80: 80 × (15 ÷ 100) = 80 × 0.15 = £12",
        commonMistakes: ["Forgetting to divide percentage by 100"],
        tier: "both"
      },
      {
        name: "Percentage change",
        formula: "((New - Original) ÷ Original) × 100",
        variables: [],
        example: "Price rises from £50 to £60: ((60-50) ÷ 50) × 100 = 20% increase",
        commonMistakes: ["Dividing by new value instead of original", "Forgetting to multiply by 100"],
        tier: "both"
      },
      {
        name: "Reverse percentage",
        formula: "Amount ÷ (1 ± percentage as decimal)",
        variables: [],
        example: "Price after 20% increase is £60. Original = 60 ÷ 1.2 = £50",
        commonMistakes: ["Adding/subtracting percentage instead of dividing"],
        tier: "both"
      },
      {
        name: "Compound interest/growth",
        formula: "Final = Original × (1 + r)ⁿ",
        variables: [
          { symbol: "r", meaning: "rate as decimal" },
          { symbol: "n", meaning: "number of time periods" }
        ],
        example: "£1000 at 5% for 3 years: 1000 × (1.05)³ = £1157.63",
        commonMistakes: ["Using simple interest formula", "Forgetting to convert % to decimal"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Fraction to decimal",
        steps: ["Divide numerator by denominator", "e.g., 3/4 = 3 ÷ 4 = 0.75"]
      },
      {
        name: "Decimal to percentage",
        steps: ["Multiply by 100", "e.g., 0.35 = 35%"]
      },
      {
        name: "Ordering fractions",
        steps: ["Convert to same denominator", "OR convert to decimals", "Then compare"]
      }
    ],
    examTips: [
      "Multiplier method: 1.15 for 15% increase, 0.85 for 15% decrease",
      "Check: does your answer make sense?",
      "For repeated percentage change, multiply multipliers together"
    ]
  },
  {
    name: "Indices (Powers)",
    subtopics: ["Index laws", "Negative indices", "Fractional indices", "Standard form"],
    keyFormulas: [
      {
        name: "Multiplying powers",
        formula: "aᵐ × aⁿ = aᵐ⁺ⁿ",
        variables: [],
        example: "x³ × x⁴ = x⁷",
        commonMistakes: ["Multiplying the indices instead of adding"],
        tier: "both"
      },
      {
        name: "Dividing powers",
        formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
        variables: [],
        example: "x⁵ ÷ x² = x³",
        commonMistakes: ["Adding indices instead of subtracting"],
        tier: "both"
      },
      {
        name: "Power of a power",
        formula: "(aᵐ)ⁿ = aᵐˣⁿ",
        variables: [],
        example: "(x²)³ = x⁶",
        commonMistakes: ["Adding instead of multiplying"],
        tier: "both"
      },
      {
        name: "Negative index",
        formula: "a⁻ⁿ = 1/aⁿ",
        variables: [],
        example: "2⁻³ = 1/2³ = 1/8",
        commonMistakes: ["Thinking negative index gives negative answer"],
        tier: "both"
      },
      {
        name: "Fractional index",
        formula: "a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ",
        variables: [],
        example: "8^(2/3) = (³√8)² = 2² = 4",
        commonMistakes: ["Getting root and power the wrong way round"],
        tier: "higher"
      },
      {
        name: "Standard form",
        formula: "A × 10ⁿ where 1 ≤ A < 10",
        variables: [],
        example: "45000 = 4.5 × 10⁴, 0.0032 = 3.2 × 10⁻³",
        commonMistakes: ["A not between 1 and 10", "Wrong sign on power"],
        tier: "both"
      }
    ],
    methods: [
      {
        name: "Simplify indices",
        steps: ["Apply index laws in order", "Simplify numerical parts first", "Then letter parts"]
      }
    ],
    examTips: [
      "Any number to power 0 = 1",
      "Any number to power 1 = itself",
      "For fractional indices: denominator = root, numerator = power"
    ]
  },
  {
    name: "Surds",
    subtopics: ["Simplifying surds", "Rationalising denominators", "Expanding brackets with surds"],
    keyFormulas: [
      {
        name: "Simplifying surds",
        formula: "√(ab) = √a × √b",
        variables: [],
        example: "√50 = √25 × √2 = 5√2",
        commonMistakes: ["Not finding largest square factor"],
        tier: "higher"
      },
      {
        name: "Rationalising denominator",
        formula: "a/√b = (a × √b)/(√b × √b) = (a√b)/b",
        variables: [],
        example: "3/√2 = (3√2)/2",
        commonMistakes: ["Forgetting to multiply top and bottom"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Simplify √72",
        steps: ["Find largest square factor: 72 = 36 × 2", "√72 = √36 × √2 = 6√2"]
      },
      {
        name: "Rationalise 1/(3+√2)",
        steps: ["Multiply by conjugate: (3-√2)/(3-√2)", "Use difference of squares", "= (3-√2)/(9-2) = (3-√2)/7"]
      }
    ],
    examTips: [
      "Learn square numbers: 1,4,9,16,25,36,49,64,81,100,121,144",
      "√a × √a = a",
      "Cannot add unlike surds: √2 + √3 ≠ √5"
    ]
  }
];

// ═══════════════════════════════════════════════════════════
// ALGEBRA
// ═══════════════════════════════════════════════════════════
export const algebraTopics: Topic[] = [
  {
    name: "Solving Equations",
    subtopics: ["Linear equations", "Equations with brackets", "Equations with fractions", "Quadratic equations"],
    keyFormulas: [
      {
        name: "Quadratic formula",
        formula: "x = (-b ± √(b²-4ac)) / 2a",
        variables: [
          { symbol: "a", meaning: "coefficient of x²" },
          { symbol: "b", meaning: "coefficient of x" },
          { symbol: "c", meaning: "constant term" }
        ],
        example: "x² + 5x + 6 = 0: a=1, b=5, c=6. x = (-5 ± √(25-24))/2 = (-5 ± 1)/2 = -2 or -3",
        commonMistakes: ["Sign errors with -b", "Forgetting ± gives two solutions", "Errors in b²-4ac"],
        tier: "higher"
      },
      {
        name: "Discriminant",
        formula: "b² - 4ac",
        variables: [],
        example: "If b²-4ac > 0: two solutions. If = 0: one solution. If < 0: no real solutions",
        commonMistakes: ["Mixing up the conditions"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Solve linear equation",
        steps: [
          "Expand any brackets",
          "Collect like terms",
          "Get unknowns on one side, numbers on other",
          "Divide to find x"
        ]
      },
      {
        name: "Solve by factorising",
        steps: [
          "Get equation = 0",
          "Factorise: x² + bx + c = (x + p)(x + q) where p + q = b, p × q = c",
          "Set each bracket = 0",
          "Solve for x"
        ]
      },
      {
        name: "Complete the square",
        steps: [
          "x² + bx + c = (x + b/2)² - (b/2)² + c",
          "Rearrange to find x"
        ]
      }
    ],
    examTips: [
      "Always check solutions by substituting back",
      "If factorising doesn't work easily, use quadratic formula",
      "Don't forget ± in quadratic formula"
    ]
  },
  {
    name: "Sequences",
    subtopics: ["nth term", "Arithmetic sequences", "Quadratic sequences", "Geometric sequences"],
    keyFormulas: [
      {
        name: "Arithmetic sequence nth term",
        formula: "nth term = a + (n-1)d = dn + (a-d)",
        variables: [
          { symbol: "a", meaning: "first term" },
          { symbol: "d", meaning: "common difference" }
        ],
        example: "3, 7, 11, 15... a=3, d=4. nth term = 4n - 1",
        commonMistakes: ["Using n instead of (n-1)", "Sign errors"],
        tier: "both"
      },
      {
        name: "Geometric sequence nth term",
        formula: "nth term = ar^(n-1)",
        variables: [
          { symbol: "a", meaning: "first term" },
          { symbol: "r", meaning: "common ratio" }
        ],
        example: "2, 6, 18, 54... a=2, r=3. nth term = 2 × 3^(n-1)",
        commonMistakes: ["Using n instead of (n-1)"],
        tier: "higher"
      },
      {
        name: "Quadratic sequence nth term",
        formula: "an² + bn + c",
        variables: [],
        example: "Find second difference ÷ 2 = a. Then work out b and c.",
        commonMistakes: ["Not dividing second difference by 2"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Find nth term (linear)",
        steps: [
          "Find common difference (d)",
          "nth term = dn + something",
          "Work out 'something' using first term"
        ]
      },
      {
        name: "Find nth term (quadratic)",
        steps: [
          "Find first and second differences",
          "Second difference ÷ 2 = coefficient of n²",
          "Subtract n² terms from sequence",
          "Find linear nth term of what remains"
        ]
      }
    ],
    examTips: [
      "Check your formula by substituting n=1, n=2",
      "Quadratic sequences have constant second difference",
      "Geometric sequences multiply by same number each time"
    ]
  },
  {
    name: "Graphs",
    subtopics: ["Straight line graphs", "Quadratic graphs", "Other graphs", "Transformations"],
    keyFormulas: [
      {
        name: "Straight line",
        formula: "y = mx + c",
        variables: [
          { symbol: "m", meaning: "gradient (steepness)" },
          { symbol: "c", meaning: "y-intercept" }
        ],
        example: "y = 2x + 3 has gradient 2 and crosses y-axis at (0,3)",
        commonMistakes: ["Mixing up gradient and intercept"],
        tier: "both"
      },
      {
        name: "Gradient",
        formula: "m = (y₂ - y₁)/(x₂ - x₁) = rise/run",
        variables: [],
        example: "Between (1,2) and (4,8): m = (8-2)/(4-1) = 6/3 = 2",
        commonMistakes: ["Getting coordinates wrong way round", "Subtracting in wrong order"],
        tier: "both"
      },
      {
        name: "Parallel lines",
        formula: "Same gradient",
        variables: [],
        example: "y = 3x + 1 and y = 3x - 5 are parallel",
        commonMistakes: ["Thinking same intercept means parallel"],
        tier: "both"
      },
      {
        name: "Perpendicular lines",
        formula: "Gradients multiply to give -1: m₁ × m₂ = -1",
        variables: [],
        example: "If one line has gradient 2, perpendicular has gradient -1/2",
        commonMistakes: ["Just making negative (not reciprocal)"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Find equation of line through two points",
        steps: [
          "Find gradient: m = (y₂-y₁)/(x₂-x₁)",
          "Substitute one point into y = mx + c",
          "Solve for c",
          "Write full equation"
        ]
      },
      {
        name: "Find equation of parallel/perpendicular line",
        steps: [
          "Parallel: use same gradient",
          "Perpendicular: gradient = -1/m",
          "Use given point to find c"
        ]
      }
    ],
    examTips: [
      "Positive gradient goes up left to right",
      "Negative gradient goes down left to right",
      "To sketch quadratic: find roots, y-intercept, vertex"
    ]
  },
  {
    name: "Simultaneous Equations",
    subtopics: ["Elimination method", "Substitution method", "Graphical method", "Linear and quadratic"],
    keyFormulas: [],
    methods: [
      {
        name: "Elimination method",
        steps: [
          "Make coefficients of one variable same",
          "Add or subtract equations to eliminate that variable",
          "Solve for remaining variable",
          "Substitute back to find other variable"
        ]
      },
      {
        name: "Substitution method",
        steps: [
          "Rearrange one equation to make x or y the subject",
          "Substitute into other equation",
          "Solve",
          "Substitute back"
        ]
      },
      {
        name: "Linear and quadratic",
        steps: [
          "Rearrange linear equation for one variable",
          "Substitute into quadratic",
          "Solve quadratic (often factorise)",
          "Find corresponding values of other variable"
        ]
      }
    ],
    examTips: [
      "Always check by substituting both values into both equations",
      "For linear + quadratic: expect TWO pairs of solutions",
      "If you get 0 = 0, equations are identical (infinite solutions)"
    ]
  },
  {
    name: "Inequalities",
    subtopics: ["Solving inequalities", "Showing on number line", "Graphing regions"],
    keyFormulas: [
      {
        name: "Inequality symbols",
        formula: "< less than, ≤ less than or equal, > greater than, ≥ greater than or equal",
        variables: [],
        example: "x < 5 means x can be 4, 3, 2, etc. but NOT 5",
        commonMistakes: ["Confusing < and ≤", "Forgetting to flip sign when multiplying/dividing by negative"],
        tier: "both"
      }
    ],
    methods: [
      {
        name: "Solve inequality",
        steps: [
          "Treat like equation",
          "IMPORTANT: if multiplying/dividing by negative, FLIP the sign",
          "Write final answer with x first"
        ]
      },
      {
        name: "Show on number line",
        steps: [
          "Open circle for < or > (not including)",
          "Closed circle for ≤ or ≥ (including)",
          "Shade in appropriate direction"
        ]
      }
    ],
    examTips: [
      "If -x > 3, then x < -3 (flip the sign!)",
      "On graphs: dotted line for < or >, solid line for ≤ or ≥",
      "Test a point to check which side to shade"
    ]
  }
];

// ═══════════════════════════════════════════════════════════
// GEOMETRY
// ═══════════════════════════════════════════════════════════
export const geometryTopics: Topic[] = [
  {
    name: "Angles",
    subtopics: ["Angle facts", "Angles in polygons", "Parallel lines", "Bearings"],
    keyFormulas: [
      {
        name: "Angles in triangle",
        formula: "Sum = 180°",
        variables: [],
        example: "If two angles are 60° and 70°, third = 180 - 60 - 70 = 50°",
        commonMistakes: ["Using 360°"],
        tier: "both"
      },
      {
        name: "Angles in quadrilateral",
        formula: "Sum = 360°",
        variables: [],
        example: "Rectangle: 4 × 90° = 360° ✓",
        commonMistakes: ["Using 180°"],
        tier: "both"
      },
      {
        name: "Interior angle sum of polygon",
        formula: "(n - 2) × 180°",
        variables: [{ symbol: "n", meaning: "number of sides" }],
        example: "Pentagon (5 sides): (5-2) × 180 = 540°",
        commonMistakes: ["Using n × 180", "Forgetting the -2"],
        tier: "both"
      },
      {
        name: "Exterior angles of polygon",
        formula: "Sum = 360°",
        variables: [],
        example: "Regular hexagon: each exterior = 360 ÷ 6 = 60°",
        commonMistakes: ["Confusing interior and exterior"],
        tier: "both"
      },
      {
        name: "Interior + Exterior",
        formula: "Interior + Exterior = 180°",
        variables: [],
        example: "If interior = 140°, exterior = 40°",
        commonMistakes: ["Thinking they add to 360°"],
        tier: "both"
      }
    ],
    methods: [
      {
        name: "Parallel lines",
        steps: [
          "Corresponding angles are EQUAL (F-shape)",
          "Alternate angles are EQUAL (Z-shape)",
          "Co-interior angles ADD to 180° (C-shape/U-shape)"
        ]
      },
      {
        name: "Bearings",
        steps: [
          "Measure from NORTH",
          "Measure CLOCKWISE",
          "Always 3 figures (e.g., 045° not 45°)",
          "Back bearing = bearing ± 180°"
        ]
      }
    ],
    examTips: [
      "Always give reasons in angle questions",
      "Vertically opposite angles are equal",
      "Angles on straight line = 180°",
      "Angles around a point = 360°"
    ]
  },
  {
    name: "Area and Perimeter",
    subtopics: ["Rectangles", "Triangles", "Parallelograms", "Trapeziums", "Circles", "Compound shapes"],
    keyFormulas: [
      {
        name: "Area of rectangle",
        formula: "A = length × width",
        variables: [],
        example: "5cm × 3cm = 15cm²",
        commonMistakes: ["Forgetting squared units"],
        tier: "both"
      },
      {
        name: "Area of triangle",
        formula: "A = ½ × base × height",
        variables: [],
        example: "base 6cm, height 4cm: ½ × 6 × 4 = 12cm²",
        commonMistakes: ["Using slant height instead of perpendicular", "Forgetting ½"],
        tier: "both"
      },
      {
        name: "Area of parallelogram",
        formula: "A = base × perpendicular height",
        variables: [],
        example: "base 8cm, height 5cm: 8 × 5 = 40cm²",
        commonMistakes: ["Using slant side as height"],
        tier: "both"
      },
      {
        name: "Area of trapezium",
        formula: "A = ½(a + b) × h",
        variables: [
          { symbol: "a, b", meaning: "parallel sides" },
          { symbol: "h", meaning: "perpendicular height" }
        ],
        example: "Parallel sides 6cm and 10cm, height 4cm: ½(6+10) × 4 = 32cm²",
        commonMistakes: ["Using non-parallel sides", "Forgetting ½"],
        tier: "both"
      },
      {
        name: "Circumference of circle",
        formula: "C = πd = 2πr",
        variables: [
          { symbol: "d", meaning: "diameter" },
          { symbol: "r", meaning: "radius" }
        ],
        example: "Radius 7cm: C = 2 × π × 7 = 14π = 43.98cm",
        commonMistakes: ["Confusing radius and diameter"],
        tier: "both"
      },
      {
        name: "Area of circle",
        formula: "A = πr²",
        variables: [{ symbol: "r", meaning: "radius" }],
        example: "Radius 5cm: A = π × 5² = 25π = 78.54cm²",
        commonMistakes: ["Using diameter instead of radius", "Forgetting to square"],
        tier: "both"
      },
      {
        name: "Arc length",
        formula: "Arc = (θ/360) × πd",
        variables: [{ symbol: "θ", meaning: "angle at centre" }],
        example: "Angle 90°, diameter 10cm: (90/360) × π × 10 = 2.5π cm",
        commonMistakes: ["Using radius instead of diameter"],
        tier: "higher"
      },
      {
        name: "Sector area",
        formula: "Area = (θ/360) × πr²",
        variables: [{ symbol: "θ", meaning: "angle at centre" }],
        example: "Angle 60°, radius 6cm: (60/360) × π × 36 = 6π cm²",
        commonMistakes: ["Using diameter instead of radius"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Compound shapes",
        steps: [
          "Split into simple shapes",
          "Calculate each area separately",
          "Add together (or subtract if cutting out)"
        ]
      }
    ],
    examTips: [
      "Leave answer in terms of π unless told otherwise",
      "Remember units: cm for length, cm² for area",
      "Check if diameter or radius is given"
    ]
  },
  {
    name: "Pythagoras and Trigonometry",
    subtopics: ["Pythagoras' theorem", "SOHCAHTOA", "Exact trig values", "Sine/Cosine rules", "3D problems"],
    keyFormulas: [
      {
        name: "Pythagoras' theorem",
        formula: "a² + b² = c²",
        variables: [{ symbol: "c", meaning: "hypotenuse (longest side)" }],
        example: "Sides 3 and 4: c² = 9 + 16 = 25, c = 5",
        commonMistakes: ["Using on non-right-angled triangles", "Forgetting to square root"],
        tier: "both"
      },
      {
        name: "SOHCAHTOA",
        formula: "sin θ = O/H, cos θ = A/H, tan θ = O/A",
        variables: [
          { symbol: "O", meaning: "opposite" },
          { symbol: "A", meaning: "adjacent" },
          { symbol: "H", meaning: "hypotenuse" }
        ],
        example: "Find angle: if O=3, H=5, sin θ = 3/5, θ = sin⁻¹(0.6) = 36.9°",
        commonMistakes: ["Mixing up O, A, H", "Calculator in wrong mode (use degrees!)"],
        tier: "both"
      },
      {
        name: "Exact trig values",
        formula: "sin 30° = ½, cos 30° = √3/2, tan 30° = 1/√3 = √3/3",
        variables: [],
        example: "sin 45° = cos 45° = √2/2, tan 45° = 1",
        commonMistakes: ["Not memorising these for non-calculator paper"],
        tier: "higher"
      },
      {
        name: "Sine rule",
        formula: "a/sin A = b/sin B = c/sin C",
        variables: [],
        example: "Use when you have angle and opposite side pair",
        commonMistakes: ["Using when you should use cosine rule"],
        tier: "higher"
      },
      {
        name: "Cosine rule (find side)",
        formula: "a² = b² + c² - 2bc cos A",
        variables: [],
        example: "Use when you have two sides and included angle",
        commonMistakes: ["Sign error on -2bc cos A"],
        tier: "higher"
      },
      {
        name: "Cosine rule (find angle)",
        formula: "cos A = (b² + c² - a²)/(2bc)",
        variables: [],
        example: "Use when you have all three sides",
        commonMistakes: ["Getting numerator wrong"],
        tier: "higher"
      },
      {
        name: "Area using trig",
        formula: "Area = ½ab sin C",
        variables: [],
        example: "Two sides 5cm and 7cm, angle between 60°: ½ × 5 × 7 × sin 60° = 15.2cm²",
        commonMistakes: ["Using wrong angle (must be BETWEEN the two sides)"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Choose Pythagoras or Trig",
        steps: [
          "If finding SIDE and no angles involved: Pythagoras",
          "If angles involved: SOHCAHTOA",
          "Label the sides O, A, H first"
        ]
      },
      {
        name: "3D Pythagoras",
        steps: [
          "Draw a 2D right-angled triangle within the 3D shape",
          "Apply Pythagoras to this triangle",
          "May need to apply twice"
        ]
      }
    ],
    examTips: [
      "Draw and label the triangle",
      "SOH: find side = O = H × sin θ, find angle = sin⁻¹(O/H)",
      "Check calculator is in DEGREE mode",
      "Learn exact values: 30°, 45°, 60°, 90°"
    ]
  },
  {
    name: "Transformations",
    subtopics: ["Translations", "Reflections", "Rotations", "Enlargements"],
    keyFormulas: [
      {
        name: "Translation vector",
        formula: "(x/y) means x right, y up",
        variables: [],
        example: "(3/-2) means 3 right, 2 down",
        commonMistakes: ["Getting direction wrong"],
        tier: "both"
      },
      {
        name: "Enlargement scale factor",
        formula: "SF = image length / object length",
        variables: [],
        example: "Object 2cm, image 6cm: SF = 6/2 = 3",
        commonMistakes: ["Getting image/object wrong way round"],
        tier: "both"
      }
    ],
    methods: [
      {
        name: "Describe a transformation",
        steps: [
          "Identify type: translation, reflection, rotation, enlargement",
          "Translation: give vector (x/y)",
          "Reflection: give mirror line equation",
          "Rotation: give angle, direction, centre",
          "Enlargement: give scale factor and centre"
        ]
      },
      {
        name: "Find centre of enlargement",
        steps: [
          "Draw lines through corresponding points",
          "Where lines meet = centre of enlargement"
        ]
      }
    ],
    examTips: [
      "Negative scale factor: image on opposite side of centre",
      "Fractional scale factor: image smaller",
      "Rotation clockwise = negative angle",
      "Always include ALL required information"
    ]
  },
  {
    name: "Vectors",
    subtopics: ["Vector notation", "Adding/subtracting vectors", "Scalar multiples", "Vector proofs"],
    keyFormulas: [
      {
        name: "Vector notation",
        formula: "→AB or a (bold/underlined)",
        variables: [],
        example: "→AB means from A to B",
        commonMistakes: ["Getting direction wrong: →AB ≠ →BA"],
        tier: "higher"
      },
      {
        name: "Return journey",
        formula: "→BA = -→AB",
        variables: [],
        example: "If →AB = (3/2), then →BA = (-3/-2)",
        commonMistakes: ["Forgetting the negative"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Finding vectors",
        steps: [
          "Go via known points",
          "→AC = →AB + →BC",
          "To reverse direction, make negative"
        ]
      },
      {
        name: "Parallel vectors",
        steps: [
          "Vectors are parallel if one is scalar multiple of other",
          "If →PQ = k→RS, they are parallel"
        ]
      }
    ],
    examTips: [
      "Midpoint of AB: →AM = ½→AB",
      "To prove parallel: show one vector = k × other",
      "To prove collinear: show vectors share common point AND are parallel"
    ]
  }
];

// ═══════════════════════════════════════════════════════════
// PROBABILITY AND STATISTICS
// ═══════════════════════════════════════════════════════════
export const statsTopics: Topic[] = [
  {
    name: "Probability",
    subtopics: ["Basic probability", "Combined events", "Tree diagrams", "Venn diagrams", "Conditional probability"],
    keyFormulas: [
      {
        name: "Basic probability",
        formula: "P(event) = number of successful outcomes / total number of outcomes",
        variables: [],
        example: "P(head on coin) = 1/2",
        commonMistakes: ["Not counting all outcomes"],
        tier: "both"
      },
      {
        name: "Probability scale",
        formula: "0 ≤ P ≤ 1",
        variables: [],
        example: "P = 0 (impossible), P = 1 (certain)",
        commonMistakes: ["Giving probability greater than 1"],
        tier: "both"
      },
      {
        name: "Complementary probability",
        formula: "P(not A) = 1 - P(A)",
        variables: [],
        example: "P(rain) = 0.3, so P(no rain) = 0.7",
        commonMistakes: ["Forgetting probabilities sum to 1"],
        tier: "both"
      },
      {
        name: "AND rule (independent events)",
        formula: "P(A and B) = P(A) × P(B)",
        variables: [],
        example: "P(two heads) = ½ × ½ = ¼",
        commonMistakes: ["Using when events are not independent"],
        tier: "both"
      },
      {
        name: "OR rule (mutually exclusive)",
        formula: "P(A or B) = P(A) + P(B)",
        variables: [],
        example: "P(1 or 6 on die) = 1/6 + 1/6 = 2/6 = 1/3",
        commonMistakes: ["Using when events can happen together"],
        tier: "both"
      },
      {
        name: "Conditional probability",
        formula: "P(A|B) = P(A and B) / P(B)",
        variables: [],
        example: "Probability of A given that B has occurred",
        commonMistakes: ["Confusing with P(A and B)"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Tree diagram",
        steps: [
          "Draw branches for first event",
          "From each, draw branches for second event",
          "Multiply along branches for P(A and B)",
          "Add probabilities for P(A or B)"
        ]
      },
      {
        name: "Without replacement",
        steps: [
          "First probability: original numbers",
          "Second probability: adjust totals (one less)",
          "Multiply probabilities"
        ]
      }
    ],
    examTips: [
      "In tree diagrams, branches from same point sum to 1",
      "With replacement: probabilities stay same",
      "Without replacement: probabilities change",
      "Check: do your probabilities sum to 1?"
    ]
  },
  {
    name: "Statistics",
    subtopics: ["Averages", "Grouped data", "Cumulative frequency", "Box plots", "Histograms"],
    keyFormulas: [
      {
        name: "Mean",
        formula: "Mean = sum of values / number of values",
        variables: [],
        example: "2, 4, 5, 9: mean = 20/4 = 5",
        commonMistakes: ["Forgetting to divide by count"],
        tier: "both"
      },
      {
        name: "Mean from frequency table",
        formula: "Mean = Σ(fx) / Σf",
        variables: [],
        example: "Multiply each value by frequency, sum, divide by total frequency",
        commonMistakes: ["Dividing by number of rows not total frequency"],
        tier: "both"
      },
      {
        name: "Median",
        formula: "Middle value when data ordered. Position = (n+1)/2",
        variables: [],
        example: "For 9 values, median is 5th value",
        commonMistakes: ["Not ordering data first", "Using n/2"],
        tier: "both"
      },
      {
        name: "Mode",
        formula: "Most frequent value",
        variables: [],
        example: "1, 2, 2, 3, 4: mode = 2",
        commonMistakes: ["Giving frequency instead of value"],
        tier: "both"
      },
      {
        name: "Range",
        formula: "Range = highest - lowest",
        variables: [],
        example: "2, 5, 8, 12: range = 12 - 2 = 10",
        commonMistakes: ["Adding instead of subtracting"],
        tier: "both"
      },
      {
        name: "Interquartile range",
        formula: "IQR = Q3 - Q1",
        variables: [
          { symbol: "Q1", meaning: "lower quartile (25th percentile)" },
          { symbol: "Q3", meaning: "upper quartile (75th percentile)" }
        ],
        example: "Q1 = 12, Q3 = 28: IQR = 16",
        commonMistakes: ["Confusing Q1, Q2, Q3 positions"],
        tier: "both"
      },
      {
        name: "Estimated mean from grouped data",
        formula: "Use midpoints of classes",
        variables: [],
        example: "For class 10-20, midpoint = 15. Use Σ(midpoint × f) / Σf",
        commonMistakes: ["Using class boundaries instead of midpoints"],
        tier: "both"
      }
    ],
    methods: [
      {
        name: "Cumulative frequency diagram",
        steps: [
          "Calculate running total of frequencies",
          "Plot at UPPER boundary of each class",
          "Join with smooth curve",
          "Read off median (n/2), Q1 (n/4), Q3 (3n/4)"
        ]
      },
      {
        name: "Box plot",
        steps: [
          "Draw scale",
          "Mark minimum and maximum",
          "Draw box from Q1 to Q3",
          "Mark median inside box",
          "Draw whiskers to min and max"
        ]
      },
      {
        name: "Histogram",
        steps: [
          "Calculate frequency density = frequency / class width",
          "Y-axis is frequency density, NOT frequency",
          "Area of bar = frequency"
        ]
      }
    ],
    examTips: [
      "Median from cumulative frequency: read across from n/2",
      "Comparing distributions: compare median AND spread (IQR/range)",
      "Histogram: area = frequency, not height",
      "Outliers: values more than 1.5 × IQR from quartiles"
    ]
  }
];

// ═══════════════════════════════════════════════════════════
// RATIO AND PROPORTION
// ═══════════════════════════════════════════════════════════
export const ratioTopics: Topic[] = [
  {
    name: "Ratio and Proportion",
    subtopics: ["Simplifying ratios", "Dividing in ratio", "Direct proportion", "Inverse proportion"],
    keyFormulas: [
      {
        name: "Dividing in ratio",
        formula: "Total parts = sum of ratio. Each share = total ÷ parts × ratio part",
        variables: [],
        example: "£60 in ratio 2:3. Parts = 5. First share = 60 ÷ 5 × 2 = £24",
        commonMistakes: ["Dividing by each ratio number separately"],
        tier: "both"
      },
      {
        name: "Direct proportion",
        formula: "y = kx or y ∝ x",
        variables: [{ symbol: "k", meaning: "constant of proportionality" }],
        example: "y doubles when x doubles",
        commonMistakes: ["Using wrong formula"],
        tier: "both"
      },
      {
        name: "Inverse proportion",
        formula: "y = k/x or y ∝ 1/x",
        variables: [{ symbol: "k", meaning: "constant" }],
        example: "y halves when x doubles",
        commonMistakes: ["Confusing with direct proportion"],
        tier: "higher"
      },
      {
        name: "Proportion to power",
        formula: "y ∝ x² means y = kx²",
        variables: [],
        example: "If y = 12 when x = 2, find k: 12 = k(4), k = 3. So y = 3x²",
        commonMistakes: ["Forgetting to find k first"],
        tier: "higher"
      }
    ],
    methods: [
      {
        name: "Solve proportion problems",
        steps: [
          "Write relationship: y ∝ x or y ∝ 1/x",
          "Convert to equation: y = kx or y = k/x",
          "Substitute given values to find k",
          "Use equation to find unknowns"
        ]
      },
      {
        name: "Recipe / scaling problems",
        steps: [
          "Find what ONE part/item costs or weighs",
          "Multiply by required amount"
        ]
      }
    ],
    examTips: [
      "1:n form - divide both sides by first number",
      "Currency conversion: multiply by exchange rate",
      "Best buys: compare price per unit"
    ]
  }
];

// Helper function to get all formulas
export function getAllFormulas(): Formula[] {
  const allTopics = [...numberTopics, ...algebraTopics, ...geometryTopics, ...statsTopics, ...ratioTopics];
  return allTopics.flatMap(topic => topic.keyFormulas);
}

// Get formulas by tier
export function getFormulasByTier(tier: "foundation" | "higher" | "both"): Formula[] {
  return getAllFormulas().filter(f => f.tier === tier || f.tier === "both");
}

// Exact trig values table (must memorise for non-calculator)
export const exactTrigValues = {
  sin: { "0°": 0, "30°": 0.5, "45°": "√2/2", "60°": "√3/2", "90°": 1 },
  cos: { "0°": 1, "30°": "√3/2", "45°": "√2/2", "60°": 0.5, "90°": 0 },
  tan: { "0°": 0, "30°": "√3/3", "45°": 1, "60°": "√3", "90°": "undefined" }
};

// Formula sheet content (given in 2026 exams)
export const formulaSheetContent = {
  note: "These formulas WILL be provided in the exam from 2026",
  formulas: [
    "Quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
    "Circumference of circle: 2πr or πd",
    "Area of circle: πr²",
    "Pythagoras: a² + b² = c²",
    "Trigonometry: sin, cos, tan ratios",
    "Area of triangle: ½ × base × height",
    "Volume of prism: area of cross-section × length",
    "Compound interest: Total = P(1 + r/100)ⁿ"
  ]
};
