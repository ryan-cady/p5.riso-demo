// Template: p5.riso Boilerplate
// Canvas = half-letter (5.5 × 8.5 in) at 150 DPI
//
// Press "e" to export Riso layers as separate PNGs
// Press "c" to toggle composite preview on/off
//
// Add your Riso layers and drawing code below!

let showComposite = true;

function setup() {
  createCanvas(825, 1275); // 5.5 × 8.5 in at 150 DPI
  pixelDensity(1);

  // Create your Riso layers here:
  // pink = new Riso("fluorescentpink");
  // blue = new Riso("blue");
}

function draw() {
  background(220);
  clearRiso();

  // Draw to your Riso layers here:
  // pink.fill(255);
  // pink.circle(width / 2, height / 2, 200);

  if (showComposite) {
    drawRiso();
  }
}

function keyReleased() {
  if (key == "e") {
    exportRiso();
  }
  if (key == "c") {
    showComposite = !showComposite;
  }
}
