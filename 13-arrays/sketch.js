// Demo 13: Arrays
// An array of objects where each element controls one visual column.
// This is the same pattern you'll use with loadTable() in demo 10 —
// the only difference is the data lives here in the sketch instead of a CSV file.
//
// Each entry has:
//   val   → controls dot size and spacing (0–100)
//   warm  → which Riso layer (true = pink, false = blue)
//
// Press "e" to export layers as PNGs.
// Press "r" to toggle labels / raw values.

let pink, blue;
let showLabels = true;

const data = [
  { label: "sub",    val: 82, warm: false },
  { label: "kick",   val: 61, warm: false },
  { label: "bass",   val: 74, warm: true  },
  { label: "rhythm", val: 45, warm: false },
  { label: "pad",    val: 88, warm: true  },
  { label: "lead",   val: 55, warm: false },
  { label: "arp",    val: 93, warm: true  },
  { label: "vox",    val: 38, warm: true  },
  { label: "fx",     val: 67, warm: false },
  { label: "top",    val: 72, warm: true  },
];

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

  // data.length gives the number of elements — no magic numbers needed
  let colW = width / data.length;

  for (let i = 0; i < data.length; i++) {
    // data[i] is one object from the array
    let item    = data[i];
    let val     = item.val;   // 0–100
    let warm    = item.warm;

    // Map the value to visual properties
    let dotSize = map(val, 0, 100, 4, 28);
    let spacing = map(val, 0, 100, 38, 9);
    let layer   = warm ? pink : blue;

    let x = (i + 0.5) * colW;
    layer.noStroke();
    layer.fill(220);

    let y = spacing / 2;
    while (y < height - 55) {
      layer.circle(x, y, dotSize);
      y += spacing;
    }
  }

  drawRiso();

  // Labels
  noStroke();
  for (let i = 0; i < data.length; i++) {
    let x = (i + 0.5) * (width / data.length);
    push();
    translate(x, height - 50);
    rotate(-HALF_PI);
    fill(30);
    textSize(9);
    textAlign(LEFT, CENTER);
    if (showLabels) {
      text(data[i].label, 0, 0);
    } else {
      text("val:" + data[i].val + " w:" + data[i].warm, 0, 0);
    }
    pop();
  }

  fill(140);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text("r = toggle labels / values   |   e = export", 10, height - 4);
}

function keyReleased() {
  if (key === "r") { showLabels = !showLabels; redraw(); }
  if (key === "e") exportRiso();
}
