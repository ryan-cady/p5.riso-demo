// Demo 03: Loading an Image
// Use preload() and loadImage() to bring images into P5.
//
// IMPORTANT: Upload an image to your sketch first!
//   In the P5.js editor: click > to open files, then upload.
//   Change the filename below to match yours.

let img;

function preload() {
  img = loadImage("../images/lee-scratch-perry.jpg"); // <-- CHANGE THIS
}

function setup() {
  pixelDensity(1);
  img.resize(825, 0); // resize to half-letter
  createCanvas(img.width, img.height);
}

function draw() {
  background(220);
  image(img, 0, 0);
}

// KEY POINTS:
// - Always load images in preload(), not setup() or draw()
// - preload() waits until the file is fully loaded before continuing
// - Always set pixelDensity(1) when using p5.riso
