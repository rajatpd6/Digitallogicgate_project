/**
 * Complete Logic Gates Data & Specifications
 * Contains full definitions, truth tables, equations, SVG renders, and educational details.
 */

const LOGIC_GATES_DATA = [
  {
    id: "not",
    name: "NOT Gate",
    symbolName: "NOT (Inverter)",
    category: "basic",
    categoryLabel: "Basic Gate",
    tagline: "Logical Inverter",
    description: "Inverts the incoming digital signal. If the input is HIGH (1), the output is LOW (0). If the input is LOW (0), the output is HIGH (1). The small bubble at the output denotes signal inversion.",
    logicRule: "Produces the opposite logic level of its input. High (1) becomes Low (0), and Low (0) becomes High (1).",
    booleanIdentities: [
      "A'' = A (Double Inversion / Involution)",
      "0' = 1",
      "1' = 0",
      "A · A' = 0 (Contradiction / Complement)",
      "A + A' = 1 (Tautology / Excluded Middle)"
    ],
    inputsCount: 1,
    inputs: [
      { id: "A", name: "Input A", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: inputs[0] ? 0 : 1 }),
    booleanEquation: "Q = A' (NOT A)",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "Q"],
      rows: [
        { inputs: [0], outputs: [1] },
        { inputs: [1], outputs: [0] }
      ]
    },
    funFact: "The NOT gate is the fundamental single-input elementary logic gate and forms the basis of oscillator circuits and digital clock generators.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="30" x2="30" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <polygon points="30,12 73,30 30,48" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="79" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="85" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="30" x2="25" y2="30" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="46" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="48" y="36" font-size="18" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">1</text>
      <circle cx="77" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="83" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "and",
    name: "AND Gate",
    symbolName: "AND",
    category: "basic",
    categoryLabel: "Basic Gate",
    tagline: "Logical Conjunction",
    description: "Produces a HIGH output (1) ONLY if ALL inputs are HIGH (1). If any input is LOW (0), the output immediately switches to LOW (0). Equivalent to electrical switches wired in series.",
    logicRule: "Output is HIGH (1) if and only if ALL inputs are HIGH (1). If any input is LOW (0), output is LOW (0).",
    booleanIdentities: [
      "A · 0 = 0 (Null / Annihilation)",
      "A · 1 = A (Identity element)",
      "A · A = A (Idempotence)",
      "A · A' = 0 (Complement)",
      "A · B = B · A (Commutative law)",
      "(A · B) · C = A · (B · C) (Associative law)"
    ],
    inputsCount: 2,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] && inputs[1]) ? 1 : 0 }),
    booleanEquation: "Q = A · B (or AB)",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "Q"],
      rows: [
        { inputs: [0, 0], outputs: [0] },
        { inputs: [0, 1], outputs: [0] },
        { inputs: [1, 0], outputs: [0] },
        { inputs: [1, 1], outputs: [1] }
      ]
    },
    funFact: "AND gates are widely used as enable/inhibit gates: if the control line is 0, no signal passes through.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="30" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="40" x2="30" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 30,10 L 52,10 A 20,20 0 0,1 52,50 L 30,50 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <line x1="72" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="25" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="50" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="50" y="36" font-size="20" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&amp;</text>
      <line x1="75" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "or",
    name: "OR Gate",
    symbolName: "OR",
    category: "basic",
    categoryLabel: "Basic Gate",
    tagline: "Logical Disjunction",
    description: "Produces a HIGH output (1) if AT LEAST ONE input is HIGH (1). The output is LOW (0) only when all inputs are LOW (0). Equivalent to electrical switches wired in parallel.",
    logicRule: "Output is HIGH (1) if AT LEAST ONE input is HIGH (1). Output is LOW (0) only when all inputs are LOW (0).",
    booleanIdentities: [
      "A + 0 = A (Identity element)",
      "A + 1 = 1 (Null / Annihilation)",
      "A + A = A (Idempotence)",
      "A + A' = 1 (Tautology / Complement)",
      "A + B = B + A (Commutative law)",
      "(A + B) + C = A + (B + C) (Associative law)"
    ],
    inputsCount: 2,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] || inputs[1]) ? 1 : 0 }),
    booleanEquation: "Q = A + B",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "Q"],
      rows: [
        { inputs: [0, 0], outputs: [0] },
        { inputs: [0, 1], outputs: [1] },
        { inputs: [1, 0], outputs: [1] },
        { inputs: [1, 1], outputs: [1] }
      ]
    },
    funFact: "In alarm systems, OR gates trigger the alert whenever door sensors OR window sensors detect an open circuit.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="40" x2="35" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 25,10 Q 42,30 25,50 Q 55,50 80,30 Q 55,10 25,10 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <line x1="80" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="25" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="50" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="50" y="36" font-size="16" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&ge;1</text>
      <line x1="75" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "nand",
    name: "NAND Gate",
    symbolName: "NAND (NOT-AND)",
    category: "universal",
    categoryLabel: "Universal Gate",
    tagline: "Universal Inverted Conjunction",
    description: "The inverted form of the AND gate. Produces a LOW output (0) ONLY when all inputs are HIGH (1). NAND is functionally complete: ANY logic gate (NOT, AND, OR, XOR, etc.) can be designed using only NAND gates.",
    logicRule: "Output is LOW (0) ONLY when ALL inputs are HIGH (1). If any input is LOW (0), output is HIGH (1).",
    booleanIdentities: [
      "(A · B)' = A' + B' (De Morgan's First Law)",
      "(A · A)' = A' (Inverter from NAND)",
      "( (A · B)' )' = A · B (AND from NANDs)",
      "Functionally complete universal gate"
    ],
    inputsCount: 2,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] && inputs[1]) ? 0 : 1 }),
    booleanEquation: "Q = (A · B)' = A' + B'",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "Q"],
      rows: [
        { inputs: [0, 0], outputs: [1] },
        { inputs: [0, 1], outputs: [1] },
        { inputs: [1, 0], outputs: [1] },
        { inputs: [1, 1], outputs: [0] }
      ]
    },
    funFact: "The Apollo Guidance Computer (1966) that landed humans on the Moon was constructed entirely out of identical universal 3-input logic gates!",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="30" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="40" x2="30" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 30,10 L 52,10 A 20,20 0 0,1 52,50 L 30,50 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="77" cy="30" r="5" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="82" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="25" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="46" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="48" y="36" font-size="20" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&amp;</text>
      <circle cx="77" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="83" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "nor",
    name: "NOR Gate",
    symbolName: "NOR (NOT-OR)",
    category: "universal",
    categoryLabel: "Universal Gate",
    tagline: "Universal Inverted Disjunction",
    description: "The inverted form of the OR gate. Produces a HIGH output (1) ONLY when all inputs are LOW (0). Like NAND, the NOR gate is functionally complete (universal) and can build any digital logic system.",
    logicRule: "Output is HIGH (1) ONLY when ALL inputs are LOW (0). If any input is HIGH (1), output is LOW (0).",
    booleanIdentities: [
      "(A + B)' = A' · B' (De Morgan's Second Law)",
      "(A + A)' = A' (Inverter from NOR)",
      "Functionally complete universal gate"
    ],
    inputsCount: 2,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] || inputs[1]) ? 0 : 1 }),
    booleanEquation: "Q = (A + B)' = A' · B'",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "Q"],
      rows: [
        { inputs: [0, 0], outputs: [1] },
        { inputs: [0, 1], outputs: [0] },
        { inputs: [1, 0], outputs: [0] },
        { inputs: [1, 1], outputs: [0] }
      ]
    },
    funFact: "A pair of cross-coupled NOR gates forms the fundamental Set-Reset (SR) flip-flop, the heart of static RAM (SRAM).",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="40" x2="35" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 25,10 Q 42,30 25,50 Q 55,50 75,30 Q 55,10 25,10 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="80" cy="30" r="5" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="85" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="25" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="46" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="48" y="36" font-size="16" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&ge;1</text>
      <circle cx="77" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="83" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "xor",
    name: "XOR Gate",
    symbolName: "XOR (Exclusive-OR)",
    category: "exclusive",
    categoryLabel: "Exclusive Gate",
    tagline: "Odd Parity & Difference Detector",
    description: "Produces a HIGH output (1) when inputs are STRICTLY DIFFERENT (one is 0, the other is 1). If both inputs are identical (both 0 or both 1), the output is LOW (0). Serves as a binary half-adder sum generator.",
    logicRule: "Output is HIGH (1) if inputs are DIFFERENT. Output is LOW (0) if inputs are IDENTICAL.",
    booleanIdentities: [
      "A ⊕ 0 = A",
      "A ⊕ 1 = A'",
      "A ⊕ A = 0 (Self-inverse)",
      "A ⊕ A' = 1",
      "A ⊕ B = A'B + AB'",
      "A ⊕ B ⊕ B = A (One-time pad crypto law)"
    ],
    inputsCount: 2,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] !== inputs[1]) ? 1 : 0 }),
    booleanEquation: "Q = A ⊕ B = A·B' + A'·B",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "Q"],
      rows: [
        { inputs: [0, 0], outputs: [0] },
        { inputs: [0, 1], outputs: [1] },
        { inputs: [1, 0], outputs: [1] },
        { inputs: [1, 1], outputs: [0] }
      ]
    },
    funFact: "XOR is the foundation of cryptography (One-Time Pad, stream ciphers) and error-detecting CRC checksums because A ⊕ B ⊕ B = A.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="40" x2="28" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 20,10 Q 37,30 20,50" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 28,10 Q 45,30 28,50 Q 58,50 82,30 Q 58,10 28,10 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <line x1="82" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="25" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="50" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="50" y="36" font-size="16" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">=1</text>
      <line x1="75" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "xnor",
    name: "XNOR Gate",
    symbolName: "XNOR (Exclusive-NOR)",
    category: "exclusive",
    categoryLabel: "Exclusive Gate",
    tagline: "Equivalence & Coincidence Detector",
    description: "The inverted form of the XOR gate. Produces a HIGH output (1) when both inputs are EQUAL (both 0 or both 1). Produces LOW (0) if the inputs differ. Functions as a 1-bit digital comparator.",
    logicRule: "Output is HIGH (1) if inputs are IDENTICAL (both 0 or both 1). Output is LOW (0) if inputs DIFFER.",
    booleanIdentities: [
      "(A ⊕ B)' = AB + A'B'",
      "A ⊙ 1 = A",
      "A ⊙ 0 = A'",
      "A ⊙ A = 1",
      "Digital equivalence equality test"
    ],
    inputsCount: 2,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] === inputs[1]) ? 1 : 0 }),
    booleanEquation: "Q = (A ⊕ B)' = AB + A'B'",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "Q"],
      rows: [
        { inputs: [0, 0], outputs: [1] },
        { inputs: [0, 1], outputs: [0] },
        { inputs: [1, 0], outputs: [0] },
        { inputs: [1, 1], outputs: [1] }
      ]
    },
    funFact: "Also known as the 'Equivalence Gate' because output is true if and only if input A is logically equivalent to input B.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="40" x2="28" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 20,10 Q 37,30 20,50" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 28,10 Q 45,30 28,50 Q 56,50 76,30 Q 56,10 28,10 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="81" cy="30" r="5" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="86" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="20" x2="25" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="10" width="46" height="40" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="48" y="36" font-size="16" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">=1</text>
      <circle cx="77" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="83" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "and3",
    name: "3-Input AND Gate",
    symbolName: "3-AND",
    category: "multi",
    categoryLabel: "Multi-Input Gate",
    tagline: "3-Way Conjunction",
    description: "Extends AND logic across three inputs. The output is HIGH (1) if and only if A, B, and C are all simultaneously HIGH (1).",
    logicRule: "Output is HIGH (1) if ALL three inputs (A, B, C) are HIGH (1). Output is LOW (0) otherwise.",
    booleanIdentities: [
      "Q = A · B · C",
      "Associative extension of 2-input AND"
    ],
    inputsCount: 3,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 },
      { id: "C", name: "Input C", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] && inputs[1] && inputs[2]) ? 1 : 0 }),
    booleanEquation: "Q = A · B · C",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "C", "Q"],
      rows: [
        { inputs: [0, 0, 0], outputs: [0] },
        { inputs: [0, 0, 1], outputs: [0] },
        { inputs: [0, 1, 0], outputs: [0] },
        { inputs: [0, 1, 1], outputs: [0] },
        { inputs: [1, 0, 0], outputs: [0] },
        { inputs: [1, 0, 1], outputs: [0] },
        { inputs: [1, 1, 0], outputs: [0] },
        { inputs: [1, 1, 1], outputs: [1] }
      ]
    },
    funFact: "Used in address decoders to activate specific memory blocks only when exact address line bit patterns match.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="30" y2="15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="30" x2="30" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="45" x2="30" y2="45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 30,8 L 52,8 A 22,22 0 0,1 52,52 L 30,52 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <line x1="74" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="25" y2="15" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="30" x2="25" y2="30" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="45" x2="25" y2="45" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="8" width="50" height="44" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="50" y="36" font-size="20" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&amp;</text>
      <line x1="75" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "or3",
    name: "3-Input OR Gate",
    symbolName: "3-OR",
    category: "multi",
    categoryLabel: "Multi-Input Gate",
    tagline: "3-Way Disjunction",
    description: "Produces a HIGH output (1) whenever ANY of the three inputs A, B, or C is HIGH (1). Output is LOW only if all three inputs are 0.",
    logicRule: "Output is HIGH (1) if ANY of the three inputs is HIGH (1). Output is LOW (0) only if all three are 0.",
    booleanIdentities: [
      "Q = A + B + C",
      "Associative extension of 2-input OR"
    ],
    inputsCount: 3,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 },
      { id: "C", name: "Input C", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] || inputs[1] || inputs[2]) ? 1 : 0 }),
    booleanEquation: "Q = A + B + C",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "C", "Q"],
      rows: [
        { inputs: [0, 0, 0], outputs: [0] },
        { inputs: [0, 0, 1], outputs: [1] },
        { inputs: [0, 1, 0], outputs: [1] },
        { inputs: [0, 1, 1], outputs: [1] },
        { inputs: [1, 0, 0], outputs: [1] },
        { inputs: [1, 0, 1], outputs: [1] },
        { inputs: [1, 1, 0], outputs: [1] },
        { inputs: [1, 1, 1], outputs: [1] }
      ]
    },
    funFact: "Commonly used in multi-point safety shutoffs and interrupt priority handlers in microprocessors.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="35" y2="15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="30" x2="38" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="45" x2="35" y2="45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 25,8 Q 44,30 25,52 Q 56,52 80,30 Q 56,8 25,8 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <line x1="80" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="25" y2="15" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="30" x2="25" y2="30" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="45" x2="25" y2="45" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="8" width="50" height="44" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="50" y="36" font-size="16" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&ge;1</text>
      <line x1="75" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "nand3",
    name: "3-Input NAND Gate",
    symbolName: "3-NAND",
    category: "multi",
    categoryLabel: "Multi-Input Gate",
    tagline: "3-Way Universal NAND",
    description: "Produces a LOW output (0) ONLY if all three inputs (A, B, C) are HIGH (1). For every other combination, the output stays HIGH (1).",
    logicRule: "Output is LOW (0) ONLY if A, B, and C are ALL HIGH (1). Output is HIGH (1) if any input is 0.",
    booleanIdentities: [
      "(A · B · C)' = A' + B' + C' (De Morgan)",
      "Universal 3-input building block"
    ],
    inputsCount: 3,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 },
      { id: "C", name: "Input C", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] && inputs[1] && inputs[2]) ? 0 : 1 }),
    booleanEquation: "Q = (A · B · C)' = A' + B' + C'",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "C", "Q"],
      rows: [
        { inputs: [0, 0, 0], outputs: [1] },
        { inputs: [0, 0, 1], outputs: [1] },
        { inputs: [0, 1, 0], outputs: [1] },
        { inputs: [0, 1, 1], outputs: [1] },
        { inputs: [1, 0, 0], outputs: [1] },
        { inputs: [1, 0, 1], outputs: [1] },
        { inputs: [1, 1, 0], outputs: [1] },
        { inputs: [1, 1, 1], outputs: [0] }
      ]
    },
    funFact: "A building block in high-speed hardware multiplier pipelines and complex sum-of-products PLA logic.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="30" y2="15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="30" x2="30" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="45" x2="30" y2="45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 30,8 L 52,8 A 22,22 0 0,1 52,52 L 30,52 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="77" cy="30" r="5" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="82" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="25" y2="15" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="30" x2="25" y2="30" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="45" x2="25" y2="45" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="8" width="46" height="44" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="48" y="36" font-size="20" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&amp;</text>
      <circle cx="77" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="83" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  {
    id: "nor3",
    name: "3-Input NOR Gate",
    symbolName: "3-NOR",
    category: "multi",
    categoryLabel: "Multi-Input Gate",
    tagline: "3-Way Universal NOR",
    description: "Produces a HIGH output (1) ONLY if all three inputs (A, B, C) are LOW (0). If any input is asserted HIGH, the output drops to LOW (0).",
    logicRule: "Output is HIGH (1) ONLY if ALL three inputs are LOW (0). If any input is HIGH (1), output is LOW (0).",
    booleanIdentities: [
      "(A + B + C)' = A' · B' · C' (De Morgan)",
      "Universal 3-input NOR identity"
    ],
    inputsCount: 3,
    inputs: [
      { id: "A", name: "Input A", default: 0 },
      { id: "B", name: "Input B", default: 0 },
      { id: "C", name: "Input C", default: 0 }
    ],
    outputs: [
      { id: "Q", name: "Output Q" }
    ],
    evaluate: (inputs) => ({ Q: (inputs[0] || inputs[1] || inputs[2]) ? 0 : 1 }),
    booleanEquation: "Q = (A + B + C)' = A' · B' · C'",
    standardSymbol: "ansi",
    truthTable: {
      headers: ["A", "B", "C", "Q"],
      rows: [
        { inputs: [0, 0, 0], outputs: [1] },
        { inputs: [0, 0, 1], outputs: [0] },
        { inputs: [0, 1, 0], outputs: [0] },
        { inputs: [0, 1, 1], outputs: [0] },
        { inputs: [1, 0, 0], outputs: [0] },
        { inputs: [1, 0, 1], outputs: [0] },
        { inputs: [1, 1, 0], outputs: [0] },
        { inputs: [1, 1, 1], outputs: [0] }
      ]
    },
    funFact: "Multiple NOR gates can construct complete n-bit asynchronous priority arbiters.",
    svgAnsi: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="35" y2="15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="30" x2="38" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="5" y1="45" x2="35" y2="45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 25,8 Q 44,30 25,52 Q 56,52 75,30 Q 56,8 25,8 Z" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="80" cy="30" r="5" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="85" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgIec: `<svg viewBox="0 0 100 60" class="gate-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="15" x2="25" y2="15" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="30" x2="25" y2="30" stroke="currentColor" stroke-width="3"/>
      <line x1="5" y1="45" x2="25" y2="45" stroke="currentColor" stroke-width="3"/>
      <rect x="25" y="8" width="46" height="44" fill="var(--gate-fill)" stroke="currentColor" stroke-width="3" rx="3"/>
      <text x="48" y="36" font-size="16" font-family="monospace" font-weight="bold" fill="currentColor" text-anchor="middle">&ge;1</text>
      <circle cx="77" cy="30" r="6" fill="var(--gate-bubble-fill)" stroke="currentColor" stroke-width="2.5"/>
      <line x1="83" y1="30" x2="95" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LOGIC_GATES_DATA };
}
