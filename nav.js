(function () {
  const src = document.currentScript.getAttribute('src');
  const root = src.startsWith('../') ? '../' : '';

  const demos = [
    { path: '00-glossary',        num: '00', title: 'Glossary' },
    { path: '00-bookmarks',       num: '00', title: 'Class Bookmarks' },
    { path: '00-template',        num: '00', title: 'Template' },
    { path: '00-intro',           num: '00', title: 'Intro to p5.riso' },
    { path: '01-color-array',     num: '01', title: 'RISO Color Array' },
    { path: '02-curated-palette', num: '02', title: 'Curated Palette' },
    { path: '03-load-image',      num: '03', title: 'Load Image' },
    { path: '04-basic-dither',    num: '04', title: 'Basic Dither' },
    { path: '05-dither-comparison', num: '05', title: 'Dither Comparison' },
    { path: '06-two-color-dither',  num: '06', title: 'Two-Color Print' },
    { path: '07-data-driven',     num: '07', title: 'Data-Driven' },
    { path: '08-functions',       num: '08', title: 'Functions' },
    { path: '09-api-data',        num: '09', title: 'API Data' },
    { path: '10-csv-data',        num: '10', title: 'CSV Data' },
    { path: '11-random-data',     num: '11', title: 'Random Data' },
    { path: '12-webcam',          num: '12', title: 'Webcam Riso' },
    { path: '13-arrays',          num: '13', title: 'Arrays' },
    { path: '14-random-array',    num: '14', title: 'Randomize Array' },
    { path: '15-image-array',     num: '15', title: 'Image Array' },
    { path: '16-data-cruncher',   num: '16', title: 'Data Cruncher' },
  ];

  const currentPath = location.pathname;

  const navItems = demos.map(d => {
    const href = root + d.path + '/index.html';
    const isActive = currentPath.includes('/' + d.path + '/');
    return `<a href="${href}" class="nav-item${isActive ? ' active' : ''}">` +
      `<span class="nav-num">${d.num}</span>` +
      `<span class="nav-title">${d.title}</span>` +
      `</a>`;
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
        `<a href="https://github.com/ryan-cady/p5.riso-demo/blob/main/CCS-RISO-COLORS.md" target="_blank" class="sidebar-resource">RISO Color Reference</a>` +
        `<a href="https://p5js.org/reference/" target="_blank" class="sidebar-resource">p5.js Reference</a>` +
        `<a href="https://antiboredom.github.io/p5.riso/" target="_blank" class="sidebar-resource">p5.riso Docs</a>` +
      `</div>` +
    `</nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.classList.add('has-sidebar');
})();
