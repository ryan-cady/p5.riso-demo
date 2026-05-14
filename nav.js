(function () {
  const src = document.currentScript.getAttribute('src');
  const root = src.startsWith('../') ? '../' : '';

  const categories = [
    {
      label: 'Reference',
      demos: [
        { path: '00-glossary',  num: '00', title: 'Glossary' },
        { path: '00-bookmarks', num: '00', title: 'Class Bookmarks' },
        { path: '00-setup',     num: '00', title: 'Setting Up p5.js' },
      ]
    },
    {
      label: 'Basics',
      demos: [
        { path: '00-p5js',     num: '00', title: 'p5.js Overview' },
        { path: '00-template', num: '00', title: 'Template' },
        { path: '00-intro',    num: '00', title: 'Intro to p5.riso' },
      ]
    },
    {
      label: 'Color',
      demos: [
        { path: '01-color-array',     num: '01', title: 'RISO Color Array' },
        { path: '02-curated-palette', num: '02', title: 'Curated Palette' },
      ]
    },
    {
      label: 'Images',
      demos: [
        { path: '03-load-image',        num: '03', title: 'Load Image' },
        { path: '04-basic-dither',      num: '04', title: 'Basic Dither' },
        { path: '05-dither-comparison', num: '05', title: 'Dither Comparison' },
        { path: '06-two-color-dither',  num: '06', title: 'Two-Color Print' },
        { path: '15-image-array',       num: '15', title: 'Image Array' },
        { path: '12-webcam',            num: '12', title: 'Webcam Riso' },
      ]
    },
    {
      label: 'Code',
      demos: [
        { path: '08-functions',    num: '08', title: 'Functions' },
        { path: '13-arrays',       num: '13', title: 'Arrays' },
        { path: '14-random-array', num: '14', title: 'Randomize Array' },
      ]
    },
    {
      label: 'Data',
      demos: [
        { path: '07-data-driven', num: '07', title: 'Data-Driven' },
        { path: '09-api-data',    num: '09', title: 'API Data' },
        { path: '10-csv-data',    num: '10', title: 'CSV Data' },
        { path: '11-random-data', num: '11', title: 'Random Data' },
      ]
    },
    {
      label: 'Tools',
      demos: [
        { path: '16-data-cruncher', num: '16', title: 'Data Cruncher' },
      ]
    },
  ];

  const currentPath = location.pathname;

  const navItems = categories.map(cat => {
    const items = cat.demos.map(d => {
      const href = root + d.path + '/index.html';
      const isActive = currentPath.includes('/' + d.path + '/');
      return `<a href="${href}" class="nav-item${isActive ? ' active' : ''}">` +
        `<span class="nav-num">${d.num}</span>` +
        `<span class="nav-title">${d.title}</span>` +
        `</a>`;
    }).join('');
    return `<div class="nav-category-label">${cat.label}</div>` + items;
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
      `<div class="sidebar-resources">` +
        `<div class="sidebar-res-label">Resources</div>` +
        `<a href="https://antiboredom.github.io/p5.riso/" target="_blank" class="sidebar-resource">p5.riso Docs</a>` +
        `<a href="https://p5js.org/reference/" target="_blank" class="sidebar-resource">p5.js Reference</a>` +
      `</div>` +
    `</nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.classList.add('has-sidebar');
})();
