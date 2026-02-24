// Demo 05: Dither Comparison
// Press 1-4 to switch between dither types.
// Move mouse left/right to change the threshold.
//
// 1 = atkinson (classic Mac look)
// 2 = floydsteinberg (smooth gradients)
// 3 = bayer (grid pattern)
// 4 = none (hard threshold, not really dithering)

let img;
let black;
let ditherType = "atkinson";

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

  let threshold = map(mouseX, 0, width, 0, 255);

  let dithered = ditherImage(img, ditherType, threshold);
  black.image(dithered, 0, 0);

  drawRiso();

  // Label
  fill(0);
  textSize(14);
  text(ditherType + "  |  threshold: " + int(threshold), 10, 24);
}

function keyReleased() {
  if (key == "1") ditherType = "atkinson";
  if (key == "2") ditherType = "floydsteinberg";
  if (key == "3") ditherType = "bayer";
  if (key == "4") ditherType = "none";
}
