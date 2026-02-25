// Demo 06: Two-Color Print
// Two Riso layers — one dithered, one halftoned.
// This simulates a two-drum RISO print.
//
// Mouse X = halftone dot density
// Mouse Y = dither threshold
// Press "e" to export layers as separate PNGs

let img;
let pink;
let blue;

function preload() {
  img = loadImage("../images/lee-scratch-perry-color.png"); // <-- CHANGE THIS
}

function setup() {
  pixelDensity(1);
  img.resize(825, 0); // resize to half-letter
  createCanvas(img.width, img.height);
  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");
  noLoop();
}

function mouseMoved() {
  redraw();
}

function draw() {
  background(220);
  clearRiso();

  let threshold = map(mouseY, 0, height, 50, 200);
  let frequency = map(mouseX, 0, width, 2, 15);

  // Pink layer: dithered
  let dithered = ditherImage(img, "atkinson", threshold);
  pink.image(dithered, 0, 0);

  // Blue layer: halftoned
  let halftoned = halftoneImage(img, "circle", frequency, 45, 100);
  blue.image(halftoned, 0, 0);

  drawRiso();
}

function keyReleased() {
  if (key == "e") {
    exportRiso();
  }
}