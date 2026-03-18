// Demo 14: Randomize Array
// Same dataset as demo 13 — but shuffled and sampled each time.
// Press space for a new composition. Press "e" to export.
//
// randomSeed() locks the random sequence so the same seed
// always produces the same result — good for reproducible prints.

let pink, blue;
let seed = 42;

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

  // Reset the random sequence at the top of draw so the same seed
  // always produces the same shuffle and positions.
  randomSeed(seed);

  // shuffle() returns a new array — the original data[] is unchanged.
  // slice(0, 5) takes the first 5 items from the shuffled list,
  // giving us a random subset without repeating any item.
  let selected = shuffle(data).slice(0, 5);

  let colW = width / selected.length;

  for (let i = 0; i < selected.length; i++) {
    let item    = selected[i];
    let val     = item.val;
    let warm    = item.warm;

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
  for (let i = 0; i < selected.length; i++) {
    let x = (i + 0.5) * colW;
    push();
    translate(x, height - 50);
    rotate(-HALF_PI);
    fill(30);
    textSize(9);
    textAlign(LEFT, CENTER);
    text(selected[i].label + "  val:" + selected[i].val, 0, 0);
    pop();
  }

  fill(140);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text("space = new composition   |   seed: " + seed + "   |   e = export", 10, height - 4);
}

function keyReleased() {
  if (key === " ") {
    // This random() call runs outside the seeded draw() context,
    // so it draws from the system's unseeded RNG — truly unpredictable.
    seed = floor(random(9999));
    redraw();
  }
  if (key === "e") exportRiso();
}
