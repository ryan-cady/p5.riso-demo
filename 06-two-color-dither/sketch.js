// Demo 06: Two-Color Dither + Halftone
// Combine dithering and halftone effects on two separate Riso layers.
// This simulates a two-color RISO print.
//
// - Pink layer: Atkinson dither
// - Blue layer: Circle halftone
//
// Controls:
//   Mouse X → Halftone frequency (dot density)
//   Mouse Y → Dither threshold
//   Press 'e' → Export layers as separate PNGs for printing
//
// halftoneImage() parameters:
//   image, dot shape, frequency (lpi), angle, intensity
//   Dot shapes: 'circle', 'line', 'square', 'ellipse', 'cross'
//
// IMPORTANT: Upload your own image and update the filename below.

let img;
let pink;
let blue;

function preload() {
  // CHANGE THIS to your image filename
  img = loadImage('data/photo.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);

  // Create two Riso layers — order matters for layering
  pink = new Riso('fluorescentpink');
  blue = new Riso('blue');

  console.log('Two-Color Demo');
  console.log('Mouse X: halftone frequency');
  console.log('Mouse Y: dither threshold');
  console.log('Press "e" to export layers as PNGs');
}

function draw() {
  background(220);
  clearRiso();

  // Map mouse to parameters
  let threshold = map(mouseY, 0, height, 50, 200);
  let frequency = map(mouseX, 0, width, 2, 15);

  // Pink layer: dithered
  let dithered = ditherImage(img, 'atkinson', threshold);
  pink.image(dithered, 0, 0);

  // Blue layer: halftoned
  let halftoned = halftoneImage(img, 'circle', frequency, 45, 100);
  blue.image(halftoned, 0, 0);

  drawRiso();

  // Info overlay
  fill(255);
  noStroke();
  rect(5, 5, 300, 65);
  fill(0);
  textSize(14);
  textStyle(BOLD);
  text('Two-Color RISO Preview', 10, 24);
  textStyle(NORMAL);
  textSize(11);
  text('Pink: atkinson dither | threshold: ' + int(threshold), 10, 42);
  text('Blue: circle halftone | frequency: ' + nf(frequency, 1, 1) + ' lpi', 10, 58);
}

function keyReleased() {
  if (key == 'e' || key == 'E') {
    exportRiso();
    console.log('Exported! Check your downloads for the separated layers.');
  }
}
