// Cover Gen
// 17 × 8.5 in at 150 DPI
// Press "e" to export Riso layers
// Press "r" to randomize

const RISO_COLOR_NAMES = [
  "YELLOW", "BLUE", "BURGUNDY", "SUNFLOWER", "ORANGE", "GREEN",
  "LIGHTLIME", "MINT", "MIST", "COPPER", "TEAL", "FLUORESCENTPINK",
  "BRIGHTRED", "BLACK", "AQUA",
];

// Add new image filenames here as you drop them into cover-gen/images/
const IMAGE_PATHS = [
  "images/hansonmeierdakota_9267_1900816_Hanson-Meier_Dakota_CoverContribution.png",
  "images/pejaszofia_4011_1900085_cereal_bw.png",
  "images/GenerativeCover_Mar.png",
  "images/Elise_Generative Cover.png",
  "images/Project2_GenerativeComp_NidhiSrikanth.grayscale.ink-1-brightred.png",
  "images/Smith_Destiny_Gen-Cover.png",
  "images/ZanderConnally.png",
  "images/Rascol_p2_cover_G&G.png",
  "images/Ordiway_Generative_Cover.png",
  "images/Breton_Generative_Cover.png",
  "images/avifacecover.png",
  "images/tobe.png",
];

const HALFTONE_SHAPES = ["circle", "square", "line", "ellipse", "cross"];

const PAPER_COLORS = [
  [245, 240, 232], // natural riso
  [255, 250, 195], // butter yellow
  [200, 230, 255], // baby blue
  [255, 210, 180], // peach orange
  [255, 210, 220], // light pink
  [210, 240, 210], // mint green
  [240, 220, 255], // lavender
  [255, 235, 160], // warm yellow
  [195, 235, 235], // powder teal
  [255, 220, 200], // salmon
  [230, 230, 255], // periwinkle
  [245, 245, 220], // cream
];

const WORDS = ["glitch &", "grain", "vol 1"];
const TEXT_COLS = 12;

const CONTRIBUTORS = [
  "Eben Breton", "Zander Connally", "Dakota Hanson-Meier", "Davin Ordiway",
  "Mar Oviedo", "Zofia Pejas", "Tobe Porter", "Thomas Rascol",
  "Elise Sansbury", "Destiny Smith", "Nidhi Srikanth", "Veronica Trevino",
];

const BLURB ="Glitch & Grain Press is a publication presenting work created in Glitch & Grain, a course at the College for Creative Studies in Detroit exploring the intersection of generative code and analog printmaking. Each student built a data-driven visual system in p5.js — translating a self-chosen dataset into form, density, and mark through the p5.riso library — and contributed a series of generative compositions printed with the RISOgraph. This work collects the result of their completed systems, combined as a collabortive edition of zines.";

// Seeded RNG (mulberry32) — guarantees same output for same seed across browsers
let _rng;
function seedRng(seed) {
  let s = seed >>> 0;
  _rng = () => { s += 0x6D2B79F5; let t = Math.imul(s ^ s >>> 15, 1 | s); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function rnd(a, b) {
  if (Array.isArray(a)) return a[floor(_rng() * a.length)];
  if (b == null) return _rng() * a;
  return a + _rng() * (b - a);
}
function rndInt(a, b) { return floor(rnd(a, b)); }

let wordSize = 14;
let paperColor = [245, 240, 232];

let imgs = [];
let layer1, layer2;
let composition = [];
let textComposition = [];
let blurbComposition = [];
let blurbBox = {};
let creditsComposition = [];

function preload() {
  for (let path of IMAGE_PATHS) {
    imgs.push(loadImage(path));
  }
}

function setup() {
  createCanvas(2550, 1275);
  pixelDensity(1);
  // Use seed from URL hash if present, otherwise pick a new one
  let hashSeed = parseInt(window.location.hash.slice(1));
  randomize(isNaN(hashSeed) ? null : hashSeed);
}

function randomize(seed) {
  if (seed == null) seed = floor(Math.random() * 1_000_000);
  window.location.hash = seed;
  seedRng(seed);

  paperColor = rnd(PAPER_COLORS);

  // Reset channels and pick 2 distinct random riso colors
  Riso.channels = [];
  let pool = [...RISO_COLOR_NAMES];
  let i1 = rndInt(pool.length);
  let name1 = pool.splice(i1, 1)[0];
  let name2 = rnd(pool);
  layer1 = new Riso(name1);
  layer2 = new Riso(name2);

  // Build random layout and effect params for each image
  composition = imgs.map((img) => {
    let scale = rnd(0.10, 0.25); // fraction of canvas width
    let displayW = floor(width * scale);
    let displayH = floor(displayW * img.height / img.width);
    return {
      img,
      displayW,
      displayH,
      x: rnd(0, width - displayW),
      y: rnd(0, height - displayH),
      rotation: rnd([0, HALF_PI, PI, -HALF_PI]),
      halftoneShape: rnd(HALFTONE_SHAPES),
      halftoneFreq: rndInt(3, 12),
      halftoneAngle: rnd(TWO_PI),
      halftoneIntensity: rnd(80, 180),
      layer: _rng() > 0.5 ? layer1 : layer2,
    };
  });

  // Pick a uniform size for this composition, then fit each word within
  // a 6-column grid on the right half without going off the canvas edge
  wordSize = rndInt(64, 150);

  // Text is constrained to the first 60% of the right half
  const LINE_GAP = 2;
  const mainWords = WORDS.filter((w) => w !== "vol 1");
  const volSize = floor(wordSize / 3);
  let textZone = (width / 2) * 0.6;


  // Scale wordSize down if the widest main word would overflow the text zone
  textFont("rig-shaded-bold-face");
  let maxWordWidth = max(mainWords.map((w) => { textSize(wordSize); return textWidth(w); }));
  if (maxWordWidth > textZone) {
    wordSize = floor(wordSize * textZone / maxWordWidth);
  }

  // --- Main block (all words except "vol 1") ---
  let blockH = mainWords.reduce((sum) => sum + wordSize, LINE_GAP * (mainWords.length - 1));
  let totalH = blockH;
  let blockY = rnd(100, height - totalH - 100);
  textSize(wordSize);
  const TEXT_MIN_X = width / 2 + 75; // 40px clearance past the right spine line (width/2 + 35)
  let blockX = TEXT_MIN_X;
  textComposition = [];
  let curY = blockY;
  mainWords.forEach((word) => {
    let y = curY + wordSize / 2;
    textComposition.push({ word, x: blockX, y, size: wordSize, font: "rig-shaded-bold-extrude", layer: layer1 });
    textComposition.push({ word, x: blockX, y, size: wordSize, font: "rig-shaded-bold-face",    layer: layer2 });
    curY += wordSize + LINE_GAP;
  });

  // --- "vol 1" sits to the right of "grain" (last mainWord), top-right of the block ---
  textFont("rig-shaded-bold-face");
  textSize(wordSize);
  let grainW = textWidth("grain");
  textSize(volSize);
  let volX = blockX + grainW + LINE_GAP * 4 + 30;
  let volY = blockY + wordSize + LINE_GAP + wordSize / 2; // vertically centered with grain
  textComposition.push({ word: "vol 1", x: volX, y: volY, size: volSize, font: "rig-shaded-bold-extrude", layer: layer1 });
  textComposition.push({ word: "vol 1", x: volX, y: volY, size: volSize, font: "rig-shaded-bold-face",    layer: layer2 });

  // --- Back cover blurb — centered between left spine line and left trim line ---
  const BLURB_MARGIN = 60;
  const leftSpine = width / 2 - 35;
  const leftTrim = width / 2 - 35 - 825;
  const blurbZoneCenter = (leftSpine + leftTrim) / 2;
  const blurbZone = (leftSpine - leftTrim) - BLURB_MARGIN * 2;
  const blurbFontSize = 16;
  const blurbLineH = blurbFontSize + 4;

  textFont("rig-shaded-medium-face");
  textSize(blurbFontSize);

  // Word-wrap the blurb into lines that fit within blurbZone
  let blurbWords = BLURB.split(" ");
  let blurbLines = [];
  let line = "";
  for (let w of blurbWords) {
    let test = line ? line + " " + w : w;
    if (textWidth(test) > blurbZone && line !== "") {
      blurbLines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) blurbLines.push(line);

  const BLURB_PAD = 40;
  let blurbBlockH = blurbLines.length * blurbLineH;
  let blurbStartY = (height - blurbBlockH) / 2;
  let blurbX = blurbZoneCenter;
  let blurbLayer = _rng() > 0.5 ? layer1 : layer2;

  blurbBox = {
    x: blurbX - blurbZone / 2 - BLURB_PAD,
    y: blurbStartY - BLURB_PAD,
    w: blurbZone + BLURB_PAD * 2,
    h: blurbBlockH + BLURB_PAD * 2,
    layer: blurbLayer,
  };

  blurbComposition = blurbLines.map((text, i) => ({
    word: text,
    x: blurbX,
    y: blurbStartY + i * blurbLineH + blurbFontSize / 2,
    size: blurbFontSize,
    font: "rig-shaded-medium-face",
    layer: blurbLayer,
  }));

  // --- Right flap credits ---
  const creditsFontSize = 16;
  const creditsLineH = creditsFontSize + 6;
  const rightFlapX = width / 2 + 35 + 825 + 80;
  const boldLines = new Set(["Featuring work by", "Instructor", "2026", "College for Creative Studies", "Detroit MI"]);
  const creditsLines = [
    "Featuring work by", ...[...CONTRIBUTORS].sort(() => _rng() - 0.5),
    "", "Instructor", "Ryan Cady",
    "", "College for Creative Studies", "Detroit MI", "", "2026",
  ];
  const creditsTotalH = creditsLines.length * creditsLineH;
  const creditsStartY = height - 100 - creditsTotalH;
  const creditsLayer = _rng() > 0.5 ? layer1 : layer2;

  creditsComposition = creditsLines.map((text, i) => ({
    word: text,
    x: rightFlapX,
    y: creditsStartY + i * creditsLineH + creditsFontSize / 2,
    size: creditsFontSize,
    font: boldLines.has(text) ? "rig-shaded-bold-face" : "rig-shaded-medium-face",
    layer: creditsLayer,
  }));

  loop();
}

function draw() {
  background(...paperColor);
  clearRiso();

  // Two vertical spine lines on the lightest of the two colors
  let lum1 = 0.299 * layer1.channelColor[0] + 0.587 * layer1.channelColor[1] + 0.114 * layer1.channelColor[2];
  let lum2 = 0.299 * layer2.channelColor[0] + 0.587 * layer2.channelColor[1] + 0.114 * layer2.channelColor[2];
  let lightLayer = lum1 > lum2 ? layer1 : layer2;
  lightLayer.stroke(200);
  lightLayer.strokeWeight(1);
  lightLayer.noFill();
  const DASH = 12, GAP = 8;
  const SPINE_OFFSET = 35;
  const PAGE_W = 825; // 5.5in at 150 DPI
  for (let y = 0; y < height; y += DASH + GAP) {
    let segH = min(DASH, height - y);
    // Spine lines
    lightLayer.line(width / 2 - SPINE_OFFSET, y, width / 2 - SPINE_OFFSET, y + segH);
    lightLayer.line(width / 2 + SPINE_OFFSET, y, width / 2 + SPINE_OFFSET, y + segH);
    // Outer trim lines — 5.5" from each spine line
    lightLayer.line(width / 2 - SPINE_OFFSET - PAGE_W, y, width / 2 - SPINE_OFFSET - PAGE_W, y + segH);
    lightLayer.line(width / 2 + SPINE_OFFSET + PAGE_W, y, width / 2 + SPINE_OFFSET + PAGE_W, y + segH);
    // Bleed lines — 6mm (35px) outside each trim line
    lightLayer.line(width / 2 - SPINE_OFFSET - PAGE_W - 35, y, width / 2 - SPINE_OFFSET - PAGE_W - 35, y + segH);
    lightLayer.line(width / 2 + SPINE_OFFSET + PAGE_W + 35, y, width / 2 + SPINE_OFFSET + PAGE_W + 35, y + segH);
  }

  // Spine text — rotated 90°, centered between the two dashed lines
  let darkLyr = lum1 <= lum2 ? layer1 : layer2;
  darkLyr.push();
  darkLyr.translate(width / 2, height / 2);
  darkLyr.rotate(HALF_PI);
  darkLyr.textFont("rig-shaded-bold-face");
  darkLyr.textSize(22);
  darkLyr.textAlign(CENTER, CENTER);
  darkLyr.noStroke();
  darkLyr.fill(255);
  darkLyr.text("Glitch & Grain: Vol 1", 0, 0);
  darkLyr.pop();

  for (let c of composition) {
    // Resize for processing (cap at 700px wide for performance)
    let procW = min(700, c.img.width);
    let resized = c.img.get();
    resized.resize(procW, 0);
    resized.filter(GRAY);

    let processed = halftoneImage(
      resized,
      c.halftoneShape,
      c.halftoneFreq,
      c.halftoneAngle,
      c.halftoneIntensity
    );

    // Draw centered at (cx, cy) with rotation, scaled to displayW/H
    let cx = c.x + c.displayW / 2;
    let cy = c.y + c.displayH / 2;

    c.layer.push();
    c.layer.translate(cx, cy);
    c.layer.rotate(c.rotation);
    c.layer.image(processed, -c.displayW / 2, -c.displayH / 2, c.displayW, c.displayH);
    c.layer.pop();
  }


  // Draw the text fills on their respective layers
  for (let t of textComposition) {
    t.layer.push();
    t.layer.textFont(t.font);
    t.layer.textSize(t.size);
    t.layer.textAlign(LEFT, CENTER);
    t.layer.noStroke();
    t.layer.fill(255);
    t.layer.text(t.word, t.x, t.y);
    t.layer.pop();
  }

  // Draw solid box then erase text through it so paper shows through
  blurbBox.layer.noStroke();
  blurbBox.layer.fill(255);
  blurbBox.layer.rect(blurbBox.x, blurbBox.y, blurbBox.w, blurbBox.h);

  blurbBox.layer.erase();
  for (let b of blurbComposition) {
    blurbBox.layer.textFont(b.font);
    blurbBox.layer.textSize(b.size);
    blurbBox.layer.textAlign(CENTER, CENTER);
    blurbBox.layer.text(b.word, b.x, b.y);
  }
  blurbBox.layer.noErase();

  for (let cr of creditsComposition) {
    cr.layer.push();
    cr.layer.textFont(cr.font);
    cr.layer.textSize(cr.size);
    cr.layer.textAlign(LEFT, CENTER);
    cr.layer.noStroke();
    cr.layer.fill(255);
    cr.layer.text(cr.word, cr.x, cr.y);
    cr.layer.pop();
  }

  drawRiso();
  noLoop();
}

function keyReleased() {
  if (key === "e") exportRiso();
  if (key === "r") randomize();
}
