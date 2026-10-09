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
          <div class="quiz-header-right">
            <a href="https://github.com/rajatpd6/Digitallogicgate_project" target="_blank" rel="noopener noreferrer" class="btn btn-github btn-bracket-link" title="Visit My GitHub Repository">
              <span class="btn-bracket">[</span>
              <svg class="github-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
              <span class="btn-bracket">]</span>
            </a>
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
