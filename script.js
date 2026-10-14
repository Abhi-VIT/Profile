/* ==========================================================================
   Abhishek Kumar — Interactive Portfolio Engine (script.js)
   Repository: https://github.com/Abhi-VIT/Profile/
   Live Site:  https://abhi-vit.github.io/Profile/
   ========================================================================== */

(function () {
  'use strict';

  // 1. Scroll Progress Bar & Cursor Spotlight
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) progressBar.style.width = scrolled + '%';
  });

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
  });

  // 2. Multi-Theme Switcher
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-theme', e.target.value);
      drawCNNChart();
    });
  }

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 4. Dynamic Hero Typewriter
  const roles = [
    'Data Scientist & Analytics Specialist',
    'Machine Learning & Deep Learning Engineer',
    'AI-Powered Data Insights Intern @ TOEHO AI',
    'TCS AI Cloud (SE) Digital Selected',
    'IEEE Published Deep Learning Researcher'
  ];
  const typeTarget = document.getElementById('typewriter-text');
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function stepTypewriter() {
    if (!typeTarget) return;
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(stepTypewriter, 1900);
        return;
      }
      setTimeout(stepTypewriter, 52);
    } else {
      charIdx--;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(stepTypewriter, 260);
        return;
      }
      setTimeout(stepTypewriter, 26);
    }
  }
  stepTypewriter();

  // 5. Interactive Hero Telemetry Tabs (Python Profile / JSON Specs / CLI)
  const winTabs = document.querySelectorAll('.win-tab');
  const winPanes = document.querySelectorAll('.window-pane');
  winTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      winTabs.forEach((t) => t.classList.remove('active'));
      winPanes.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.getAttribute('data-pane'));
      if (target) target.classList.add('active');
    });
  });

  // 6. Project Filtering & 3D Card Tilt Effect
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projCards = document.querySelectorAll('.proj-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter');
      projCards.forEach((card) => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  projCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY = ((x / rect.width) - 0.5) * 6;
      const rotX = ((y / rect.height) - 0.5) * -6;
      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 7. Interactive Project Workbench Simulator
  const simData = {
    graphnet: {
      title: 'Graph Net – Intelligent Knowledge Graph (2025)',
      desc: 'Click any concept node below to simulate Neo4j & NetworkX prerequisite sequencing and personalized recommendation ranking:',
      nodes: [
        { label: '01. Web Scraping Corpus', out: 'Extracted raw domain entities & topic dependencies from educational documents using Python scraping pipelines.' },
        { label: '02. Neo4j Graph Storage', out: 'Constructed directed property graph with 1,200+ concept nodes and prerequisite edge weights in Neo4j.' },
        { label: '03. NetworkX Centrality', out: 'Computed PageRank & topological sorting via NetworkX to rank prerequisite criticality.' },
        { label: '04. Personalized Path', out: 'Recommended optimal learning path: Linear Algebra -> Probability -> ML Foundations -> Deep Learning CNNs.' }
      ]
    },
    argml: {
      title: 'ARG Data & Modeling – No-Code ML Platform (2025)',
      desc: 'Inspect each drag-and-drop workflow module powered by TensorFlow, PyTorch, Pandas, and NumPy:',
      nodes: [
        { label: '01. Drag & Drop Ingestion', out: 'Automated schema detection, missing-value imputation, and outlier trimming with Pandas & NumPy.' },
        { label: '02. Feature Engineering', out: 'One-hot encoding, standard scaling, and correlation pruning with instant visual distribution feedback.' },
        { label: '03. Model Training Engine', out: 'Parallel training across Scikit-learn, TensorFlow, and PyTorch backends with automated hyperparameter grid search.' },
        { label: '04. One-Click Deployment', out: 'Exported trained pipeline with live inference endpoint and drift monitoring metrics.' }
      ]
    },
    rshiny: {
      title: 'Dynamic R Dataset Analysis Tool (2025)',
      desc: 'Explore the no-code R Shiny statistical analysis & automated dashboard engines:',
      nodes: [
        { label: '01. OLS & ANOVA Suite', out: 'Interactive Ordinary Least Squares regression & multi-group ANOVA tables with F-statistic and p-value diagnostics.' },
        { label: '02. Hypothesis Testing', out: 'Automated t-tests, Chi-square tests, and normality checks (Shapiro-Wilk) with plain-language statistical conclusions.' },
        { label: '03. Correlation & Heatmaps', out: 'Dynamic Pearson/Spearman correlation matrices and multi-variable pair plots.' },
        { label: '04. Time-Series & KPIs', out: 'Seasonal decomposition, rolling averages, and executive monitoring dashboards.' }
      ]
    },
    stockapp: {
      title: 'Stock Comparison Web App (2024)',
      desc: 'Inspect how Streamlit, BeautifulSoup, and yfinance combine for real-time equity analysis:',
      nodes: [
        { label: '01. yfinance Live Feed', out: 'Fetched historical OHLCV time-series and volume data across multiple global stock tickers.' },
        { label: '02. BeautifulSoup Scraper', out: 'Parsed key financial ratios, market headlines, and fundamental indicators from financial web pages.' },
        { label: '03. Comparative Charts', out: 'Rendered normalized return curves, moving averages, and volatility bands inside Streamlit.' }
      ]
    },
    chatbot: {
      title: 'AI E-Learning Chatbot (2021)',
      desc: 'Test the interactive student query & voice synthesis workflow:',
      nodes: [
        { label: '01. Student Query Parser', out: 'Processed natural-language academic questions from students across STEM topics.' },
        { label: '02. Wikipedia API Engine', out: 'Retrieved and summarized verified encyclopedic paragraphs matching the query context.' },
        { label: '03. pyttsx3 Voice Output', out: 'Synthesized clear offline text-to-speech audio responses alongside formatted text explanations.' }
      ]
    }
  };

  const simTabs = document.querySelectorAll('.sim-tab');
  const simTitle = document.getElementById('sim-title');
  const simDesc = document.getElementById('sim-desc');
  const simNodes = document.getElementById('sim-nodes');
  const simOutput = document.getElementById('sim-output');

  function renderWorkbench(key) {
    const item = simData[key];
    if (!item || !simTitle) return;
    simTitle.textContent = item.title;
    simDesc.textContent = item.desc;
    simNodes.innerHTML = '';
    item.nodes.forEach((n, idx) => {
      const btn = document.createElement('button');
      btn.className = 'node-btn' + (idx === 0 ? ' active' : '');
      btn.textContent = n.label;
      btn.addEventListener('click', () => {
        simNodes.querySelectorAll('.node-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        simOutput.textContent = n.out;
      });
      simNodes.appendChild(btn);
    });
    simOutput.textContent = item.nodes[0].out;
  }

  simTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      simTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderWorkbench(tab.getAttribute('data-sim'));
    });
  });

  // Allow project cards' "Launch in Workbench" button to select that project
  window.openInWorkbench = function (key) {
    simTabs.forEach((t) => {
      t.classList.toggle('active', t.getAttribute('data-sim') === key);
    });
    renderWorkbench(key);
    const panel = document.getElementById('workbench-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  renderWorkbench('graphnet');

  // 8. Interactive IEEE CNN Hyperparameter Synergy Simulator Canvas
  const cnnCanvas = document.getElementById('cnn-chart');
  const optSel = document.getElementById('cnn-opt');
  const actSel = document.getElementById('cnn-act');
  const lrSel = document.getElementById('cnn-lr');
  const accReadout = document.getElementById('cnn-acc');
  const convReadout = document.getElementById('cnn-conv');

  function drawCNNChart() {
    if (!cnnCanvas) return;
    const ctx = cnnCanvas.getContext('2d');
    const w = (cnnCanvas.width = cnnCanvas.clientWidth || 420);
    const h = (cnnCanvas.height = cnnCanvas.clientHeight || 170);
    ctx.clearRect(0, 0, w, h);

    const opt = optSel ? optSel.value : 'adam';
    const act = actSel ? actSel.value : 'relu';
    const lr = lrSel ? lrSel.value : 'dynamic';

    let baseAcc = 88.0;
    let speed = 0.14;
    if (opt === 'adam') { baseAcc += 4.2; speed += 0.05; }
    if (opt === 'sgd') { baseAcc += 2.8; speed += 0.02; }
    if (act === 'gelu') { baseAcc += 2.1; speed += 0.03; }
    if (act === 'relu') { baseAcc += 1.6; speed += 0.02; }
    if (lr === 'dynamic') { baseAcc += 2.6; speed += 0.04; }
    if (lr === 'step') { baseAcc += 1.2; }

    const finalAcc = Math.min(97.8, baseAcc).toFixed(1);
    if (accReadout) accReadout.textContent = `Validation Accuracy: ${finalAcc}%`;
    if (convReadout) convReadout.textContent = lr === 'dynamic' ? 'Stability: High (Dynamic LR Synergy)' : 'Stability: Moderate';

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Plot training accuracy curve
    ctx.beginPath();
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * (w - 24) + 12;
      const progress = 1 - Math.exp(-speed * i * 1.4);
      const normAcc = (finalAcc / 100) * progress;
      const y = h - 18 - normAcc * (h - 36);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  [optSel, actSel, lrSel].forEach((el) => {
    if (el) el.addEventListener('change', drawCNNChart);
  });
  window.addEventListener('resize', drawCNNChart);
  setTimeout(drawCNNChart, 60);

  // 9. Command Palette (Ctrl+K / Cmd+K)
  const cmdBackdrop = document.getElementById('cmd-backdrop');
  const cmdOpenBtn = document.getElementById('cmd-open-btn');
  const cmdInput = document.getElementById('cmd-input');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function toggleCmd(open) {
    if (!cmdBackdrop) return;
    const next = typeof open === 'boolean' ? open : !cmdBackdrop.classList.contains('open');
    cmdBackdrop.classList.toggle('open', next);
    if (next && cmdInput) {
      cmdInput.value = '';
      filterCmd('');
      setTimeout(() => cmdInput.focus(), 50);
    }
  }

  function filterCmd(q) {
    const query = q.toLowerCase();
    cmdItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  }

  if (cmdOpenBtn) cmdOpenBtn.addEventListener('click', () => toggleCmd(true));
  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdBackdrop) toggleCmd(false);
    });
  }
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => filterCmd(e.target.value));
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCmd();
    } else if (e.key === 'Escape') {
      toggleCmd(false);
    }
  });

  window.runCmd = function (action) {
    toggleCmd(false);
    if (action.startsWith('#')) {
      const el = document.querySelector(action);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action.startsWith('theme:')) {
      const th = action.split(':')[1];
      document.documentElement.setAttribute('data-theme', th);
      if (themeSelect) themeSelect.value = th;
      drawCNNChart();
    } else if (action === 'copy-email') {
      window.copyToClip('abhishek.k.jalandhar@gmail.com', 'Email copied to clipboard!');
    } else if (action.startsWith('http')) {
      window.open(action, '_blank', 'noopener');
    }
  };

  // 10. Copy to Clipboard & Mailto Form
  window.copyToClip = function (text, msg) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  };

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const subj = document.getElementById('c-subj').value.trim();
      const body = document.getElementById('c-body').value.trim();
      window.location.href = `mailto:abhishek.k.jalandhar@gmail.com?subject=${encodeURIComponent(subj + ' — ' + name)}&body=${encodeURIComponent(body)}`;
    });
  }

  // 11. Interactive Hero Particle Constellation (HTML5 Canvas, Zero SVG)
  const canvas = document.getElementById('constellation-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [];

    function initConstellation() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      pts = [];
      const count = Math.min(42, Math.floor((canvas.width * canvas.height) / 21000));
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: Math.random() * 1.8 + 1.2
        });
      }
    }

    function loopConstellation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.55)';
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loopConstellation);
    }

    window.addEventListener('resize', initConstellation);
    initConstellation();
    loopConstellation();
  }
})();
