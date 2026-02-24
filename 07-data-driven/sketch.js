// Demo 07: Data-Driven
// Data values control the dither and halftone settings.
// Click to randomize the data and see a new result.
// Press "e" to export layers as PNGs.
//
// This is the core idea behind Project 2:
// your data set drives how the image looks.

let img;
let pink;
let blue;

// Sample data — try replacing these with your own numbers!
let data = [42, 87, 15, 63];

function preload() {
  img = loadImage("data/photo.jpg"); // <-- CHANGE THIS
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");
}

function draw() {
  background(220);
  clearRiso();

  // Data controls the visual parameters
  let threshold = map(data[0], 0, 100, 50, 200);
  let frequency = map(data[1], 0, 100, 2, 15);
  let intensity = map(data[2], 0, 100, 50, 200);
  let angle = map(data[3], 0, 100, 0, 90);

  // Pink layer: dithered
  let dithered = ditherImage(img, "atkinson", threshold);
  pink.image(dithered, 0, 0);

  // Blue layer: halftoned
  let halftoned = halftoneImage(img, "circle", frequency, angle, intensity);
  blue.image(halftoned, 0, 0);

  drawRiso();

  // Show current data
  fill(0);
  textSize(12);
  text("data: [" + data.join(", ") + "]  — click to randomize", 10, 20);
}

function mousePressed() {
  // Randomize the data
  for (let i = 0; i < data.length; i++) {
    data[i] = floor(random(100));
  }
}

function keyReleased() {
  if (key == "e") {
    exportRiso();
  }
}
