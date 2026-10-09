/**
 * Main Application Orchestrator
 * Connects Encyclopedia Gallery, Interactive Gate Inspector, and Quiz Arena.
 */

class LogicGatesApp {
  constructor() {
    this.quizUI = null;
    this.activeTab = 'gallery';
    this.currentCategory = 'all';
    this.selectedGateId = null;

    // Gate card state storage (gateId -> inputValues array)
    this.galleryStates = new Map();

    this.init();
  }

  init() {
    this.initGalleryStates();
    this.initNavigation();
    this.initThemeToggle();
    this.initSoundToggle();
    this.initGalleryFilters();
    this.selectCategory('all');
    this.initQuiz();
  }

  initGalleryStates() {
    LOGIC_GATES_DATA.forEach(gate => {
      this.galleryStates.set(gate.id, gate.inputs.map(i => i.default || 0));
    });
  }

  initNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-page').forEach(page => {
      page.classList.toggle('active', page.id === `tab-${tabId}`);
    });
  }

  initThemeToggle() {
    const btn = document.getElementById('btn-theme-toggle');
    if (!btn) return;

    const savedTheme = localStorage.getItem('logicgates_theme') || 'dark';
    this.applyTheme(savedTheme);

    btn.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('theme-light');
      const nextTheme = isCurrentlyLight ? 'dark' : 'light';
      this.applyTheme(nextTheme);
      soundManager.playSwitch(nextTheme === 'light');
    });
  }

  applyTheme(theme) {
    const iconEl = document.getElementById('theme-icon');
    const labelEl = document.getElementById('theme-label');

    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      if (iconEl) iconEl.textContent = '🌙';
      if (labelEl) labelEl.textContent = 'Dark Mode';
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      if (iconEl) iconEl.textContent = '☀️';
      if (labelEl) labelEl.textContent = 'Light Mode';
    }

    localStorage.setItem('logicgates_theme', theme);
  }

  initSoundToggle() {
    const btn = document.getElementById('btn-sound-toggle');
    if (!btn) return;

    const updateBtn = () => {
      const isMuted = soundManager.isMuted();
      btn.innerHTML = isMuted ? '🔇 Muted' : '🔊 Sound ON';
      btn.classList.toggle('muted', isMuted);
    };

    updateBtn();
    btn.addEventListener('click', () => {
      soundManager.toggleMute();
      updateBtn();
    });
  }

  /**
   * Category and Sub-Gate Navigation Logic
   */
  initGalleryFilters() {
    const filterTabs = document.querySelectorAll('.cat-filter-btn');
    const searchInput = document.getElementById('gate-search-input');

    filterTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        filterTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        if (searchInput) searchInput.value = '';
        this.selectCategory(cat);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) {
          document.getElementById('sub-gates-nav').style.display = 'none';
          const matchedGates = LOGIC_GATES_DATA.filter(g =>
            g.name.toLowerCase().includes(query) ||
            g.symbolName.toLowerCase().includes(query) ||
            g.tagline.toLowerCase().includes(query) ||
            g.description.toLowerCase().includes(query)
          );
          this.renderGatesGrid(matchedGates, query);
        } else {
          const activeFilter = document.querySelector('.cat-filter-btn.active');
          const cat = activeFilter ? activeFilter.dataset.category : 'all';
          this.selectCategory(cat);
        }
      });
    }
  }

  /**
   * Selects a Category and handles hierarchical gate display
   */
  selectCategory(categoryKey) {
    this.currentCategory = categoryKey;
    const subNavEl = document.getElementById('sub-gates-nav');
    const subBtnsContainer = document.getElementById('sub-gate-buttons-container');

    if (categoryKey === 'all') {
      subNavEl.style.display = 'none';
      this.selectedGateId = null;
      this.renderGatesGrid(LOGIC_GATES_DATA);
      return;
    }

    // Get gates for this category
    let categoryGates = LOGIC_GATES_DATA.filter(g => g.category === categoryKey);

    // In Basic Gates, prioritize AND, OR, NOT
    if (categoryKey === 'basic') {
      const order = ['and', 'or', 'not'];
      categoryGates.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }

    if (categoryGates.length === 0) {
      subNavEl.style.display = 'none';
      this.renderGatesGrid([]);
      return;
    }

    // Show sub-navigation bar
    subNavEl.style.display = 'flex';

    // Populate sub-gate buttons
    let html = '';
    categoryGates.forEach(g => {
      html += `
        <button class="sub-gate-btn" data-gate="${g.id}">
          ${g.name}
        </button>
      `;
    });
    html += `
      <button class="sub-gate-btn btn-view-all" data-gate="view_all">
        ⊞ View All (${categoryGates.length})
      </button>
    `;

    subBtnsContainer.innerHTML = html;

    // Attach listeners to sub-gate buttons
    subBtnsContainer.querySelectorAll('.sub-gate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetGateId = btn.dataset.gate;
        if (targetGateId === 'view_all') {
          subBtnsContainer.querySelectorAll('.sub-gate-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedGateId = 'view_all';
          this.renderGatesGrid(categoryGates);
        } else {
          this.selectGate(targetGateId);
        }
      });
    });

    // Default to the first gate (e.g. AND Gate for basic)
    const firstGateId = categoryGates[0].id;
    this.selectGate(firstGateId);
  }

  /**
   * Selects a specific gate and opens its comprehensive properties and truth table view
   */
  selectGate(gateId) {
    this.selectedGateId = gateId;
    const subBtnsContainer = document.getElementById('sub-gate-buttons-container');
    if (subBtnsContainer) {
      subBtnsContainer.querySelectorAll('.sub-gate-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.gate === gateId);
      });
    }

    this.showGateInspector(gateId);
  }

  /**
   * Renders Comprehensive Gate Properties & Truth Table Inspector
   */
  showGateInspector(gateId) {
    const gate = LOGIC_GATES_DATA.find(g => g.id === gateId);
    if (!gate) return;

    const displayContainer = document.getElementById('gates-display-container');
    if (!displayContainer) return;

    displayContainer.innerHTML = this.buildGateInspectorHtml(gate);

    // Bind interactive input toggles
    const inspectorView = displayContainer.querySelector('.gate-inspector-view');
    if (!inspectorView) return;

    inspectorView.querySelectorAll('.sandbox-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const inputs = this.galleryStates.get(gate.id) || gate.inputs.map(i => i.default || 0);
        inputs[idx] = inputs[idx] ? 0 : 1;
        this.galleryStates.set(gate.id, inputs);
        soundManager.playSwitch(inputs[idx] === 1);
        this.updateInspectorLiveOutput(gate.id);
      });
    });

    // Refresh outputs & active row highlight
    this.updateInspectorLiveOutput(gate.id);
  }

  buildGateInspectorHtml(gate) {
    const inputs = this.galleryStates.get(gate.id) || gate.inputs.map(i => i.default || 0);

    return `
      <section class="gate-inspector-view" data-gate="${gate.id}">
        <!-- Inspector Top Header Banner -->
        <header class="inspector-header">
          <div class="inspector-header-left">
            <div class="inspector-title-row">
              <span class="gate-category-badge badge-${gate.category}">${gate.categoryLabel}</span>
              <h2 class="inspector-title">${gate.name}</h2>
            </div>
            <p class="inspector-tagline">${gate.tagline}</p>
          </div>
        </header>

        <!-- Top Main Grid: Live Interactive Schematic & Truth Table -->
        <div class="inspector-top-grid">
          <!-- Column 1: Schematic Symbol & Interactive Live Circuit Sandbox -->
          <div class="inspector-card">
            <div class="inspector-card-title">
              <span>⚡</span> Logic Symbol &amp; Live Interactive Simulator
            </div>

            <div class="inspector-schematic-area">
              <div class="inspector-svg-container">
                ${gate.svgAnsi}
              </div>
              <div class="inspector-equation-display">
                ${gate.booleanEquation}
              </div>
            </div>

            <!-- Live Signal Control Panel -->
            <div class="inspector-interactive-sandbox">
              <div class="sandbox-label">Interactive Input Controls (Click to toggle 0 / 1):</div>
              <div class="sandbox-controls-row">
                <div class="sandbox-inputs-group">
                  ${gate.inputs.map((inp, idx) => `
                    <button class="sandbox-toggle-btn ${inputs[idx] ? 'is-high' : 'is-low'}" data-idx="${idx}">
                      <span>${inp.name}:</span>
                      <strong class="input-val-badge">${inputs[idx] ? '1 (HIGH)' : '0 (LOW)'}</strong>
                    </button>
                  `).join('')}
                </div>

                <div class="sandbox-outputs-group">
                  ${gate.outputs.map(out => `
                    <div class="sandbox-output-bulb-wrapper" data-out="${out.id}">
                      <div class="sandbox-bulb"></div>
                      <span>${out.name}: <strong class="out-val-text">0</strong></span>
                      <span class="voltage-badge">0.0V</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: Dynamic Real-Time Truth Table -->
          <div class="inspector-card">
            <div class="inspector-card-title">
              <span>📊</span> Truth Table (Live Active Row Highlights Automatically)
            </div>

            <div class="inspector-truth-table-wrap">
              <table class="inspector-truth-table">
                <thead>
                  <tr>
                    ${gate.truthTable.headers.map(h => `<th>${h}</th>`).join('')}
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  ${gate.truthTable.rows.map((row, rIdx) => `
                    <tr data-row-idx="${rIdx}">
                      ${row.inputs.map(val => `<td><strong>${val}</strong></td>`).join('')}
                      ${row.outputs.map(val => `<td class="cell-out"><strong>${val}</strong></td>`).join('')}
                      <td class="status-cell">
                        <span class="state-label">Inactive</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              ${gate.description}
            </p>
          </div>
        </div>

        <!-- Bottom Grid: Detailed Properties & Electronics Specifications -->
        <div class="inspector-properties-grid">
          <!-- Property 1: Logic Rule -->
          <div class="prop-card">
            <div class="prop-card-title">
              <span>📌</span> Logic Rule &amp; Switching Operation
            </div>
            <div class="prop-card-content">
              ${gate.logicRule || gate.description}
            </div>
          </div>

          <!-- Property 2: Boolean Algebra Laws -->
          <div class="prop-card">
            <div class="prop-card-title">
              <span>📐</span> Boolean Theorems &amp; Identities
            </div>
            <div class="prop-card-content">
              <ul class="prop-card-list">
                ${(gate.booleanIdentities || ["Q = " + gate.booleanEquation]).map(id => `<li>${id}</li>`).join('')}
              </ul>
            </div>
          </div>

        </div>

        <!-- Fun Fact Banner -->
        <div class="gate-fun-fact" style="font-size: 0.85rem; padding: 0.85rem 1.25rem;">
          💡 <strong>Did You Know:</strong> ${gate.funFact}
        </div>
      </section>
    `;
  }

  updateInspectorLiveOutput(gateId) {
    const gate = LOGIC_GATES_DATA.find(g => g.id === gateId);
    if (!gate) return;

    const inspectorView = document.querySelector(`.gate-inspector-view[data-gate="${gateId}"]`);
    if (!inspectorView) return;

    const currentInputs = this.galleryStates.get(gateId) || gate.inputs.map(i => i.default || 0);

    // Update input button states
    inspectorView.querySelectorAll('.sandbox-toggle-btn').forEach((btn, idx) => {
      const isHigh = currentInputs[idx] === 1;
      btn.classList.toggle('is-high', isHigh);
      btn.classList.toggle('is-low', !isHigh);
      btn.querySelector('.input-val-badge').textContent = isHigh ? '1 (HIGH)' : '0 (LOW)';
    });

    // Evaluate gate outputs
    const outputs = gate.evaluate(currentInputs);

    // Update output indicator bulb
    inspectorView.querySelectorAll('.sandbox-output-bulb-wrapper').forEach(wrap => {
      const outId = wrap.dataset.out;
      const val = outputs[outId] ?? 0;
      const isHigh = val === 1 || val === '1';

      const bulb = wrap.querySelector('.sandbox-bulb');
      const valText = wrap.querySelector('.out-val-text');
      const voltBadge = wrap.querySelector('.voltage-badge');

      bulb.classList.toggle('is-lit', isHigh);
      valText.textContent = val;
      valText.style.color = isHigh ? '#34d399' : '#94a3b8';

      if (voltBadge) {
        voltBadge.textContent = isHigh ? '5.0V (HIGH)' : (val === 'Z' ? 'Hi-Z' : '0.0V (LOW)');
        voltBadge.classList.toggle('voltage-high', isHigh);
      }
    });

    // Highlight active row in truth table
    const rows = inspectorView.querySelectorAll('.inspector-truth-table tbody tr');
    rows.forEach((rowEl, rIdx) => {
      const rowData = gate.truthTable.rows[rIdx];
      let matches = true;

      for (let i = 0; i < currentInputs.length; i++) {
        const expected = rowData.inputs[i];
        if (expected === 'X' || expected === '0 / 1 / \\downarrow' || expected === '\\uparrow (Rising)') {
          continue;
        }
        if (rowData.inputs[i] !== currentInputs[i]) {
          matches = false;
          break;
        }
      }

      rowEl.classList.toggle('row-active', matches);
      const statusLabel = rowEl.querySelector('.state-label');
      if (statusLabel) {
        if (matches) {
          statusLabel.innerHTML = `<span class="active-indicator-badge">ACTIVE</span>`;
        } else {
          statusLabel.textContent = 'Inactive';
        }
      }
    });
  }

  /**
   * Multi-card grid display (For "All Gates" or "View All in Category")
   */
  renderGatesGrid(gates, searchQuery = '') {
    const displayContainer = document.getElementById('gates-display-container');
    if (!displayContainer) return;

    if (gates.length === 0) {
      displayContainer.innerHTML = `
        <div class="empty-results">
          <p>No gates found matching "<strong>${searchQuery}</strong>". Try searching for AND, OR, NOT, or select another category.</p>
        </div>
      `;
      return;
    }

    displayContainer.innerHTML = `
      <div class="gates-grid" id="gates-gallery-grid">
        ${gates.map(gate => this.buildGateCardHtml(gate)).join('')}
      </div>
    `;

    // Attach listeners
    gates.forEach(gate => {
      const card = displayContainer.querySelector(`.gate-card[data-gate="${gate.id}"]`);
      if (!card) return;

      // Click card header or title to inspect gate
      card.querySelector('.gate-title')?.addEventListener('click', () => {
        this.selectCategory(gate.category);
        this.selectGate(gate.id);
      });

      // Interactive input toggles on card
      card.querySelectorAll('.gate-input-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pinIdx = parseInt(btn.dataset.idx, 10);
          const currentInputs = this.galleryStates.get(gate.id) || gate.inputs.map(i => i.default || 0);
          currentInputs[pinIdx] = currentInputs[pinIdx] ? 0 : 1;
          this.galleryStates.set(gate.id, currentInputs);
          soundManager.playSwitch(currentInputs[pinIdx] === 1);
          this.updateCardLiveOutput(gate.id);
        });
      });

      // Inspect Gate button
      const inspectBtn = card.querySelector('.btn-inspect-gate');
      if (inspectBtn) {
        inspectBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectCategory(gate.category);
          this.selectGate(gate.id);
        });
      }
    });

    // Update all outputs
    gates.forEach(g => this.updateCardLiveOutput(g.id));
  }

  buildGateCardHtml(gate) {
    const inputs = this.galleryStates.get(gate.id) || gate.inputs.map(i => i.default || 0);

    return `
      <article class="gate-card" data-gate="${gate.id}" data-category="${gate.category}">
        <header class="gate-card-top">
          <div class="gate-title-group">
            <span class="gate-category-badge badge-${gate.category}">${gate.categoryLabel}</span>
            <h2 class="gate-title" style="cursor: pointer;" title="Click to view detailed properties & truth table">${gate.name}</h2>
            <p class="gate-tagline">${gate.tagline}</p>
          </div>
          <div class="gate-card-actions">
            <button class="btn btn-sm btn-inspect-gate" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: #38bdf8;" title="View full properties and truth table">
              🔍 Inspect
            </button>
          </div>
        </header>

        <div class="gate-schematic-row">
          <div class="gate-svg-box">
            ${gate.svgAnsi}
          </div>
          <div class="gate-equation-box">
            <span class="equation-label">Boolean Equation:</span>
            <div class="equation-formula">${gate.booleanEquation}</div>
          </div>
        </div>

        <!-- Live Interactive Simulation Sandbox for this gate -->
        <div class="gate-live-playground">
          <div class="live-controls-label">⚡ Live Interactive Signal Inputs:</div>
          <div class="live-inputs-cluster">
            ${gate.inputs.map((inp, idx) => `
              <button class="gate-input-toggle ${inputs[idx] ? 'is-high' : 'is-low'}" data-idx="${idx}" title="Click to toggle ${inp.name}">
                <span class="pin-name">${inp.id}</span>
                <span class="pin-state-val">${inputs[idx] ? '1 (HIGH)' : '0 (LOW)'}</span>
              </button>
            `).join('')}
          </div>

          <div class="live-output-cluster">
            <span class="output-arrow">➔</span>
            ${gate.outputs.map(out => `
              <div class="live-output-indicator" data-out="${out.id}">
                <span class="out-bulb"></span>
                <span class="out-name">${out.name}:</span>
                <span class="out-val">0</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Dynamic Truth Table with live row highlighting -->
        <div class="gate-truth-table-container">
          <table class="truth-table">
            <thead>
              <tr>
                ${gate.truthTable.headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${gate.truthTable.rows.map((row, rIdx) => `
                <tr data-row-idx="${rIdx}">
                  ${row.inputs.map(val => `<td class="cell-in">${val}</td>`).join('')}
                  ${row.outputs.map(val => `<td class="cell-out">${val}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <p class="gate-desc">${gate.description}</p>
        <div class="gate-fun-fact">💡 <strong>Did You Know:</strong> ${gate.funFact}</div>
      </article>
    `;
  }

  updateCardLiveOutput(gateId) {
    const gate = LOGIC_GATES_DATA.find(g => g.id === gateId);
    if (!gate) return;

    const card = document.querySelector(`.gate-card[data-gate="${gateId}"]`);
    if (!card) return;

    const currentInputs = this.galleryStates.get(gateId) || gate.inputs.map(i => i.default || 0);

    // Update toggle buttons appearance
    card.querySelectorAll('.gate-input-toggle').forEach((btn, idx) => {
      const isHigh = currentInputs[idx] === 1;
      btn.classList.toggle('is-high', isHigh);
      btn.classList.toggle('is-low', !isHigh);
      btn.querySelector('.pin-state-val').textContent = isHigh ? '1 (HIGH)' : '0 (LOW)';
    });

    // Evaluate output
    const outputs = gate.evaluate(currentInputs);

    // Update live output bulbs
    card.querySelectorAll('.live-output-indicator').forEach(ind => {
      const outId = ind.dataset.out;
      const val = outputs[outId] ?? 0;
      const isHigh = val === 1 || val === '1';

      const bulb = ind.querySelector('.out-bulb');
      const valText = ind.querySelector('.out-val');

      bulb.classList.toggle('is-lit', isHigh);
      valText.textContent = val;
      valText.classList.toggle('val-high', isHigh);
    });

    // Highlight active matching row in Truth Table
    const rows = card.querySelectorAll('.truth-table tbody tr');
    rows.forEach((rowEl, rIdx) => {
      const rowData = gate.truthTable.rows[rIdx];
      let matches = true;

      for (let i = 0; i < currentInputs.length; i++) {
        const expected = rowData.inputs[i];
        if (expected === 'X' || expected === '0 / 1 / \\downarrow' || expected === '\\uparrow (Rising)') {
          continue;
        }
        if (rowData.inputs[i] !== currentInputs[i]) {
          matches = false;
          break;
        }
      }

      rowEl.classList.toggle('row-active', matches);
    });
  }

  initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    this.quizUI = new LogicGateQuiz(quizContainer);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new LogicGatesApp();
});
