/**
 * Interactive Logic Gate Quiz Arena & Knowledge Trainer
 */

class LogicGateQuiz {
  constructor(containerElement) {
    this.container = containerElement;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = parseInt(localStorage.getItem('logicgates_streak') || '0', 10);
    this.totalAnswered = 0;
    this.currentQuestion = null;

    this.render();
  }

  generateQuestion() {
    const types = ['identify_gate', 'truth_table_lookup', 'boolean_expression'];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const basicUniversalGates = LOGIC_GATES_DATA.filter(g =>
      ['not', 'and', 'or', 'nand', 'nor', 'xor', 'xnor'].includes(g.id)
    );
    const targetGate = basicUniversalGates[Math.floor(Math.random() * basicUniversalGates.length)];

    if (chosenType === 'identify_gate') {
      // Pick 3 random distractors
      const distractors = basicUniversalGates.filter(g => g.id !== targetGate.id);
      const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [targetGate, ...shuffledDistractors].sort(() => 0.5 - Math.random());

      return {
        type: 'identify_gate',
        title: 'Which Logic Gate is this?',
        subtitle: 'Identify the gate by its ANSI schematic symbol and function:',
        svg: targetGate.svgAnsi,
        equation: targetGate.booleanEquation,
        correctId: targetGate.id,
        explanation: `${targetGate.name}: ${targetGate.description}`,
        options: options.map(g => ({ id: g.id, label: g.name }))
      };
    } else if (chosenType === 'truth_table_lookup') {
      // Pick a random row from targetGate's truth table
      const rows = targetGate.truthTable.rows;
      const row = rows[Math.floor(Math.random() * rows.length)];
      const inputStr = targetGate.truthTable.headers.slice(0, -1).map((h, i) => `${h} = ${row.inputs[i]}`).join(', ');
      const expectedOutput = row.outputs[0];

      return {
        type: 'truth_table_lookup',
        title: `Predict the Output for ${targetGate.name}`,
        subtitle: `Given inputs: ${inputStr}, what will be the output Q?`,
        svg: targetGate.svgAnsi,
        correctId: String(expectedOutput),
        explanation: `For ${targetGate.name} with ${inputStr}, output Q is ${expectedOutput}. Equation: ${targetGate.booleanEquation}`,
        options: [
          { id: '1', label: 'HIGH (1)' },
          { id: '0', label: 'LOW (0)' }
        ]
      };
    } else {
      // Boolean expression match
      const distractors = basicUniversalGates.filter(g => g.id !== targetGate.id);
      const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [targetGate, ...shuffledDistractors].sort(() => 0.5 - Math.random());

      return {
        type: 'boolean_expression',
        title: 'Match the Boolean Expression',
        subtitle: `Which logic gate satisfies the expression: ${targetGate.booleanEquation}?`,
        correctId: targetGate.id,
        explanation: `${targetGate.name} corresponds to ${targetGate.booleanEquation}. ${targetGate.description}`,
        options: options.map(g => ({ id: g.id, label: g.name }))
      };
    }
  }

  nextQuestion() {
    this.currentQuestion = this.generateQuestion();
    this.render();
  }

  handleAnswer(optionId) {
    if (!this.currentQuestion) return;

    const isCorrect = optionId === this.currentQuestion.correctId;
    this.totalAnswered++;

    if (isCorrect) {
      this.score += 10;
      this.streak++;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
        localStorage.setItem('logicgates_streak', this.bestStreak);
      }
      soundManager.playSuccess();
    } else {
      this.streak = 0;
      soundManager.playError();
    }

    this.showFeedback(isCorrect);
  }

  showFeedback(isCorrect) {
    const feedbackBox = this.container.querySelector('.quiz-feedback');
    const optionsContainer = this.container.querySelector('.quiz-options');
    if (!feedbackBox || !optionsContainer) return;

    optionsContainer.querySelectorAll('button').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.id === this.currentQuestion.correctId) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }
    });

    feedbackBox.innerHTML = `
      <div class="feedback-banner ${isCorrect ? 'is-correct' : 'is-wrong'}">
        <div class="feedback-icon">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
        <p class="feedback-text">${this.currentQuestion.explanation}</p>
        <button class="btn btn-primary" id="btn-next-question">Next Question →</button>
      </div>
    `;

    const nextBtn = feedbackBox.querySelector('#btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuestion());
    }

    // Update stats bar
    this.updateStatsBar();
  }

  updateStatsBar() {
    const scoreEl = this.container.querySelector('#quiz-score');
    const streakEl = this.container.querySelector('#quiz-streak');
    const bestEl = this.container.querySelector('#quiz-best-streak');

    if (scoreEl) scoreEl.textContent = this.score;
    if (streakEl) streakEl.textContent = this.streak;
    if (bestEl) bestEl.textContent = this.bestStreak;
  }

  render() {
    if (!this.currentQuestion) {
      this.currentQuestion = this.generateQuestion();
    }

    const q = this.currentQuestion;

    this.container.innerHTML = `
      <div class="quiz-arena">
        <div class="quiz-header">
          <div class="quiz-stats">
            <div class="stat-pill">Score: <strong id="quiz-score">${this.score}</strong></div>
            <div class="stat-pill">Current Streak: <strong id="quiz-streak">${this.streak}</strong> 🔥</div>
            <div class="stat-pill">Best Streak: <strong id="quiz-best-streak">${this.bestStreak}</strong> 🏆</div>
          </div>
        </div>

        <div class="quiz-card">
          <div class="quiz-card-header">
            <h3>${q.title}</h3>
            <p>${q.subtitle}</p>
          </div>

          ${q.svg ? `<div class="quiz-symbol-display">${q.svg}</div>` : ''}

          <div class="quiz-options">
            ${q.options.map(opt => `
              <button class="quiz-opt-btn" data-id="${opt.id}">
                ${opt.label}
              </button>
            `).join('')}
          </div>

          <div class="quiz-feedback"></div>
        </div>
      </div>
    `;

    // Attach listeners
    this.container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleAnswer(btn.dataset.id);
      });
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LogicGateQuiz };
}
