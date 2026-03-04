// Demo 11: Random Data
// random() and shuffle() let you sample and reorder a dataset at will.
// Each press of spacebar picks a new seed — same data, different composition.
//
// Concepts:
//   random(low, high)  — random float in a range
//   random(array)      — pick one element at random
//   shuffle(array)     — return a new array in random order
//   randomSeed(n)      — lock the sequence so a seed always produces the same result
//
// Press "space" — regenerate with a new random seed
// Press "e"     — export layers as PNGs

let table;
let pink, blue;
let seed = 42;

function preload() {
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  noLoop();
  textFont("monospace");
  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");
}

function draw() {
  background(245, 240, 232);
  clearRiso();

  // randomSeed() locks the random sequence.
  // The same seed always produces the same layout — press space to change it.
  randomSeed(seed);

  // Collect all rows into a plain JS array so we can shuffle them.
  let rows = [];
  for (let i = 0; i < table.getRowCount(); i++) {
    rows.push(table.getRow(i));
  }

  // shuffle() returns a new array with the same items in a random order.
  // slice(0, 5) keeps only the first 5 — a random subset of the 10 records.
  let selected = shuffle(rows).slice(0, 5);

  for (let row of selected) {
    let energy = row.getNum("energy");  // 45–98
    let warmth = row.getNum("warmth");  // 30–72
    let bpm    = row.getNum("bpm");     // 88–145

    // random(low, high) places each cluster at a different spot every seed
    let x = random(80, width - 80);
    let y = random(80, height - 80);

    let clusterR = map(energy, 0, 100, 20, 80);       // energy → cluster spread
    let dotCount = floor(map(bpm, 60, 180, 5, 22));   // BPM → number of dots
    let dotSize  = map(energy, 0, 100, 4, 18);        // energy → dot diameter

    // warmth > 55 → pink layer; warmth ≤ 55 → blue layer
    let layer = (warmth > 55) ? pink : blue;
    layer.noStroke();
    layer.fill(220);

    // Scatter dots around the cluster center using polar coordinates
    for (let i = 0; i < dotCount; i++) {
      let a = random(TWO_PI);
      let d = random(clusterR);
      layer.circle(x + cos(a) * d, y + sin(a) * d, dotSize);
    }

    // Label each cluster with the record title
    fill(30);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text(row.getString("title").substring(0, 16), x, y + clusterR + 6);
  }

  drawRiso();

  // Corner hint
  fill(140);
  noStroke();
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text("seed:" + seed + "   space = new layout   e = export", 10, height - 4);
}

function keyReleased() {
  if (key === " ") {
    // random() here is NOT seeded — it's truly random, giving us a new seed each press
    seed = floor(random(9999));
    redraw();
  }
  if (key === "e") exportRiso();
}
