// Demo 04: Basic Dither
// ditherImage() converts a photo into a dot pattern
// for single-color RISO printing.
//
// Change "black" to any RISO color name to preview
// what it looks like in a different ink.

let img;
let black;

function preload() {
  img = loadImage("data/photo.jpg"); // <-- CHANGE THIS
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  black = new Riso("black");
}

function draw() {
  background(220);
  clearRiso();

  let dithered = ditherImage(img, "atkinson");
  black.image(dithered, 0, 0);

  drawRiso();
}
