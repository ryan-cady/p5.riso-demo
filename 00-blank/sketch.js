let showComposite = true;

function setup() {
  createCanvas(825, 1275); // 5.5 × 8.5 in at 150 DPI
  pixelDensity(1);
}

function draw() {
  background(220);
  clearRiso();

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
