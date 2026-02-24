// Demo 04: Basic Dither
// Apply an Atkinson dither to an image using p5.riso.
//
// ditherImage() converts a photograph into a pattern of dots
// suitable for single-color RISO printing.
//
// IMPORTANT: Upload your own image and update the filename below.

let img;
let black;

function preload() {
  // CHANGE THIS to your image filename
  img = loadImage('data/photo.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);

  // Create a black Riso layer
  black = new Riso('black');
}

function draw() {
  background(220);
  clearRiso();

  // Dither the image using the Atkinson algorithm
  let dithered = ditherImage(img, 'atkinson');

  // Draw the dithered image onto the black Riso layer
  black.image(dithered, 0, 0);

  // Render all Riso layers to screen
  drawRiso();
}

// KEY TAKEAWAYS:
// - ditherImage(img, type) returns a new dithered image
// - The dithered image is drawn onto a Riso color layer
// - clearRiso() at start of draw clears all layers each frame
// - drawRiso() at end composites all layers to the screen
// - The Riso layer color determines what ink it prints in
