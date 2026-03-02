// Demo 04: Basic Dither
// ditherImage() converts a photo into a dot pattern
// for single-color RISO printing.
//
// Change "black" to any RISO color name to preview
// what it looks like in a different ink.

let img;
let teal;

function preload() {
  img = loadImage("../images/lee-scratch-perry.jpg"); // <-- CHANGE THIS
}

function setup() {
  pixelDensity(1);
  img.resize(825, 0); // resize to half-letter
  createCanvas(img.width, img.height);
  teal = new Riso("teal");
}

function draw() {
  background(220);
  clearRiso();

  let dithered = ditherImage(img, "atkinson");
  teal.image(dithered, 0, 0);

  drawRiso();
}
