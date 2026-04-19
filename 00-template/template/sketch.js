// ─────────────────────────────────────────────────────────────
//  p5.riso starter — 8.5 × 5.5 in at 150 DPI
//  Press SPACE to redraw with a new seed
//  Press E to export each Riso layer as a PNG
// ─────────────────────────────────────────────────────────────
//
//  HOW RISO LAYERS WORK
//  Each Riso() creates a separate ink channel.
//  Draw on the channel just like a normal p5 graphics buffer.
//  Call drawRiso() at the end to composite them onto the canvas.
//
//  SETTING UP COLORS
//  Pass any RISOCOLORS name (all caps) to new Riso():
//
//    let pink = new Riso("FLUORESCENTPINK");
//    let blue = new Riso("BLUE");
//    let yellow = new Riso("YELLOW");
//
//  Some available names:
//    YELLOW, BLUE, BURGUNDY, SUNFLOWER, ORANGE, GREEN,
//    LIGHTLIME, MINT, MIST, COPPER, TEAL, FLUORESCENTPINK,
//    BRIGHTRED, BLACK, AQUA
//
//  DRAWING ON A LAYER
//  Use the layer as a graphics context — fill(255) means "full ink":
//
//    pink.fill(255);           // full ink
//    pink.fill(128);           // ~50% ink (halftone in print)
//    pink.noFill();
//    pink.stroke(255);
//    pink.circle(x, y, d);
//    pink.rect(x, y, w, h);
//    pink.image(img, x, y, w, h);
//
// ─────────────────────────────────────────────────────────────

let layer1, layer2, layer3;
let seed = 0;

function setup() {
  createCanvas(1275, 825);
  pixelDensity(1);
  seed = floor(random(9999));
  noLoop();
}

function draw() {
  background(245, 240, 232); // natural riso paper
  clearRiso();

  // Reset channels each redraw so SPACE regenerates correctly
  Riso.channels = [];
  layer1 = new Riso("FLUORESCENTPINK");
  layer2 = new Riso("BLUE");
  layer3 = new Riso("YELLOW");

  // ── Example: three overlapping circles, one per layer ──────
  layer1.noStroke();
  layer1.fill(255);
  layer1.circle(425, 412, 500);

  layer2.noStroke();
  layer2.fill(255);
  layer2.circle(637, 412, 500);

  layer3.noStroke();
  layer3.fill(255);
  layer3.circle(850, 412, 500);
  // ── Replace everything above this line with your sketch ────

  drawRiso();
}

function keyReleased() {
  if (key === " ") {
    seed = floor(random(9999));
    redraw();
  }
  if (key === "e") exportRiso();
}
