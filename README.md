# ⚡ LOGIC LAB - Complete Interactive Digital Logic Gate Suite

An interactive, high-fidelity digital logic gate educational suite. Designed for students, electrical engineers, and computer science enthusiasts, featuring **all 11 pure digital logic gates** with full names, dynamic truth tables, Boolean expressions, interactive real-time signal propagation, and standard ANSI schematics.

---

## 🌟 Key Features

1. **📚 Gate Encyclopedia & Interactive Gallery**
   - **Every Gate Present with Name**: Complete specifications for 11 fundamental digital logic gates.
   - **Live Interactive Sandbox on Every Card**: Toggle inputs directly on each card and watch the output LED light up instantly!
   - **Dynamic Truth Tables**: As you flip inputs, the corresponding row in the truth table dynamically illuminates in glowing green.
   - **Comprehensive Deep-Dive Inspector**: Click on any gate (e.g. from the Basic Gates category: AND, OR, NOT) to inspect full specifications, Boolean identities, switching logic rules, and truth tables.
   - **Formulas & Axioms**: Clear Boolean expressions, logic rules, and algebraic identities.
   - **Dark & Light Mode**: Seamless theme switching with a toggle button on the top right.
   - **GitHub Repository Link**: Direct bracketed shortcut `[ 🐙 GitHub ]` in the header and Quiz Arena.

2. **🎯 Quiz & Mastery Arena**
   - Test your logic gate knowledge with randomized challenges:
     - Gate Symbol Identification
     - Truth Table Output Prediction
     - Boolean Expression Matching
   - Tracks current streak, best streak, and scores with audio feedback.

3. **🔊 Procedural Web Audio Engine**
   - Tactile switch clicks, relay toggles, buzzer alarms, and celebratory chimes synthesized purely via the Web Audio API without external audio files.

---

## 📋 Complete Catalog of Logic Gates Included

| # | Gate Name | Category | Inputs | Boolean Formula | Description |
|---|-----------|----------|:------:|:---------------:|-------------|
| 1 | **NOT Gate (Inverter)** | Basic | 1 | `Q = A' (NOT A)` | Inverts signal polarity ($0 \to 1$, $1 \to 0$). |
| 2 | **AND Gate** | Basic | 2 | `Q = A · B (or AB)` | HIGH (1) only when ALL inputs are 1. |
| 3 | **OR Gate** | Basic | 2 | `Q = A + B` | HIGH (1) when AT LEAST ONE input is 1. |
| 4 | **NAND Gate** | Universal | 2 | `Q = (A · B)' = A' + B'` | Inverted AND. Universal gate capable of constructing any digital logic circuit. |
| 5 | **NOR Gate** | Universal | 2 | `Q = (A + B)' = A' · B'` | Inverted OR. Universal gate and foundational building block. |
| 6 | **XOR Gate (Exclusive-OR)** | Exclusive | 2 | `Q = A ⊕ B = A·B' + A'·B` | HIGH (1) when inputs are strictly different. Core of parity checkers and binary adders. |
| 7 | **XNOR Gate (Equivalence)** | Exclusive | 2 | `Q = (A ⊕ B)' = AB + A'B'` | HIGH (1) when inputs are identical. Digital comparator. |
| 8 | **3-Input AND Gate** | 3-Input | 3 | `Q = A · B · C` | 3-way conjunction; output is 1 only when A, B, and C are all 1. |
| 9 | **3-Input OR Gate** | 3-Input | 3 | `Q = A + B + C` | 3-way disjunction; output is 1 if any input is 1. |
| 10 | **3-Input NAND Gate** | 3-Input | 3 | `Q = (A · B · C)' = A' + B' + C'` | 3-way universal NAND gate. |
| 11 | **3-Input NOR Gate** | 3-Input | 3 | `Q = (A + B + C)' = A' · B' · C'` | 3-way universal NOR gate. |

---

## 🚀 How to Run the Project

This is a **pure client-side web application** with zero dependencies. No npm or complex builds required!

### Option A: Open directly in your browser
Simply double-click [`index.html`](file:///C:/Users/rajat/.gemini/antigravity/scratch/logic-gates-simulator/index.html) or open it with your browser:
- **Google Chrome**
- **Microsoft Edge**
- **Mozilla Firefox**
- **Safari**

### Option B: Run via Local Python Web Server
Open a terminal in the project directory and run:
```bash
python -m http.server 8080
```
Then visit:
```
http://localhost:8080
```

---

## 📂 Project Architecture

```
logic-gates-simulator/
├── index.html          # Main application structure, tabs, layout
├── css/
│   └── style.css       # Complete cyber-lab design system, dark & light themes, responsive CSS
├── js/
│   ├── gates-data.js   # Specifications for all 11 pure gates, truth tables, SVGs, Boolean equations
│   ├── audio.js        # Procedural Web Audio API sound synthesizer
│   ├── quiz.js         # Interactive randomized quiz arena with streak tracking
│   └── app.js          # App coordinator, gallery renderer, inspector, and filters
└── README.md           # Documentation and user guide
```

---

## 🎓 Educational Theory & Boolean Axioms

### De Morgan's Laws:
1. `(A · B)' = A' + B'` (A NAND gate is equivalent to an OR gate with inverted inputs)
2. `(A + B)' = A' · B'` (A NOR gate is equivalent to an AND gate with inverted inputs)

### Universal Logic:
Both **NAND** and **NOR** gates are *functionally complete*. Any combinational logic circuit or digital processor can be built entirely out of NAND gates or NOR gates alone.
