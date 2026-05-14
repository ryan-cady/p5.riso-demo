(function () {
  const src = document.currentScript.getAttribute('src');
  const root = src.startsWith('../') ? '../' : '';

  const categories = [
    {
      label: 'Reference',
      demos: [
        { path: '00-glossary',   title: 'Glossary' },
        { path: '00-bookmarks',  title: 'Class Bookmarks' },
        { path: '00-template',   title: 'Template' },
        { path: '00-debugging',  title: 'Debugging' },
      ]
    },
    {
      label: 'Basics',
      demos: [
        { path: '00-p5js',       title: 'p5.js Overview' },
        { path: '00-setup',      title: 'Setting Up p5.js' },
        { path: '00-variables',  title: 'Variables & Conditionals' },
        { path: '00-intro',      title: 'Intro to p5.riso' },
        { path: '00-interaction', title: 'Mouse & Keyboard' },
      ]
    },
    {
      label: 'Printing',
      demos: [
        { path: '00-riso-color', title: 'How RISO Color Works' },
        { path: '00-export',     title: 'Exporting for Print' },
      ]
    },
    {
      label: 'Color',
      demos: [
        { path: '01-color-array',     title: 'RISO Color Array' },
        { path: '02-curated-palette', title: 'Curated Palette' },
      ]
    },
    {
      label: 'Images',
      demos: [
        { path: '03-load-image',        title: 'Load Image' },
        { path: '04-basic-dither',      title: 'Basic Dither' },
        { path: '05-dither-comparison', title: 'Dither Comparison' },
        { path: '06-two-color-dither',  title: 'Two-Color Print' },
        { path: '15-image-array',       title: 'Image Array' },
        { path: '12-webcam',            title: 'Webcam Riso' },
      ]
    },
    {
      label: 'Code',
      demos: [
        { path: '08-functions',    title: 'Functions' },
        { path: '00-transforms',   title: 'Transforms' },
        { path: '13-arrays',       title: 'Arrays' },
        { path: '14-random-array', title: 'Randomize Array' },
        { path: '00-random',       title: 'Random & Noise' },
        { path: '00-fonts',        title: 'Working with Fonts' },
      ]
    },
    {
      label: 'Data',
      demos: [
        { path: '07-data-driven', title: 'Data-Driven' },
        { path: '09-api-data',    title: 'API Data' },
        { path: '10-csv-data',    title: 'CSV Data' },
        { path: '11-random-data', title: 'Random Data' },
      ]
    },
    {
      label: 'Tools',
      demos: [
        { path: '16-data-cruncher', title: 'Data Cruncher' },
      ]
    },
  ];

  const currentPath = location.pathname;
  const savedState = JSON.parse(localStorage.getItem('sidebar-state') || '{}');

  const navItems = categories.map(cat => {
    const hasActive = cat.demos.some(d => currentPath.includes('/' + d.path + '/'));
    // Active category always open; otherwise use saved state, default open
    const isOpen = hasActive ? true : (savedState[cat.label] !== false);

    const items = cat.demos.map(d => {
      const href = root + d.path + '/index.html';
      const isActive = currentPath.includes('/' + d.path + '/');
      return `<a href="${href}" class="nav-item${isActive ? ' active' : ''}">` +
        `<span class="nav-title">${d.title}</span>` +
        `</a>`;
    }).join('');

    return (
      `<div class="nav-category">` +
        `<button class="nav-category-btn" aria-expanded="${isOpen}" data-label="${cat.label}">` +
          `<span>${cat.label}</span>` +
          `<span class="nav-chevron"></span>` +
        `</button>` +
        `<div class="nav-category-items"${isOpen ? '' : ' style="max-height:0"'}>${items}</div>` +
      `</div>`
    );
  }).join('');

  const html =
    `<nav class="sidebar">` +
      `<div class="sidebar-brand">` +
        `<a href="${root}index.html" class="sidebar-logo">` +
          `<span class="sidebar-logo-pink">Glitch</span> &amp; <span class="sidebar-logo-blue">Grain</span>` +
        `</a>` +
        `<div class="sidebar-sub">p5.riso demos</div>` +
      `</div>` +
      `<div class="sidebar-nav">${navItems}</div>` +
    `</nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.classList.add('has-sidebar');

  // Wire up accordion toggles
  document.querySelectorAll('.nav-category-btn').forEach(btn => {
    const items = btn.nextElementSibling;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const nowOpen = !isOpen;

      btn.setAttribute('aria-expanded', nowOpen);
      items.style.maxHeight = nowOpen ? items.scrollHeight + 'px' : '0';

      // Persist state (but never save active category as closed)
      const state = JSON.parse(localStorage.getItem('sidebar-state') || '{}');
      state[btn.dataset.label] = nowOpen;
      localStorage.setItem('sidebar-state', JSON.stringify(state));
    });

    // Set initial max-height so transitions work from the start
    if (btn.getAttribute('aria-expanded') === 'true') {
      items.style.maxHeight = items.scrollHeight + 'px';
    }
  });
})();
