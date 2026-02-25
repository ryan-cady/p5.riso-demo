// Demo 06: Two-Color Print
// Two Riso layers — one dithered, one halftoned.
// This simulates a two-drum RISO print.
//
// Up/Down arrows = adjust dither threshold
// Press "e" to export layers as separate PNGs

let img;
let pink;
let blue;
let threshold = 125;
let frequency = 8;

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

function draw() {
  background(220);
  clearRiso();

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
  if (keyCode == UP_ARROW) {
    threshold = constrain(threshold + 10, 50, 200);
    redraw();
  }
  if (keyCode == DOWN_ARROW) {
    threshold = constrain(threshold - 10, 50, 200);
    redraw();
  }
}