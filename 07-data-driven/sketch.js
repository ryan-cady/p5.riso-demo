// Demo 07: Data-Driven Color & Dither
// Use a data set to control RISO color selection and dither parameters.
// This demonstrates the core idea behind Project 2:
// data as a creative input for generative RISO output.
//
// The data array below drives:
//   - Which two RISO colors are used (data[0] and data[1])
//   - The dither threshold (data[2])
//   - The halftone frequency (data[3])
//
// Controls:
//   Click → Randomize the data set and regenerate
//   Press 'e' → Export layers as PNGs
//
// IMPORTANT: Upload your own image and update the filename below.

let img;
let layer1, layer2;

// Sample data — replace with your own data set!
let data = [42, 87, 15, 63, 91, 28, 74, 50, 33, 68];

let color1Name, color2Name;

function preload() {
  // CHANGE THIS to your image filename
  img = loadImage('data/photo.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  generateFromData();
}

function generateFromData() {
  // Clear any existing Riso channels
  // (Riso.channels is the internal list of all active layers)
  Riso.channels = [];

  // Use data values to pick two colors from the RISO palette
  let colorIndex1 = floor(map(data[0], 0, 100, 0, RISOCOLORS.length - 1));
  let colorIndex2 = floor(map(data[1], 0, 100, 0, RISOCOLORS.length - 1));

  // Make sure we don't pick the same color twice
  if (colorIndex2 == colorIndex1) {
    colorIndex2 = (colorIndex2 + 1) % RISOCOLORS.length;
  }

  color1Name = RISOCOLORS[colorIndex1].name;
  color2Name = RISOCOLORS[colorIndex2].name;

  layer1 = new Riso(color1Name.toLowerCase());
  layer2 = new Riso(color2Name.toLowerCase());

  console.log('--- New generation ---');
  console.log('Data: ' + data.join(', '));
  console.log('Color 1: ' + color1Name + ' (from data[0] = ' + data[0] + ')');
  console.log('Color 2: ' + color2Name + ' (from data[1] = ' + data[1] + ')');
}

function draw() {
  background(220);
  clearRiso();

  // Data drives the dither threshold and halftone frequency
  let threshold = map(data[2], 0, 100, 50, 200);
  let frequency = map(data[3], 0, 100, 2, 15);

  // Layer 1: dithered
  let dithered = ditherImage(img, 'floydsteinberg', threshold);
  layer1.image(dithered, 0, 0);

  // Layer 2: halftoned
  let halftoned = halftoneImage(img, 'circle', frequency, 45, 100);
  layer2.image(halftoned, 0, 0);

  drawRiso();

  // Info overlay
  fill(255);
  noStroke();
  rect(5, 5, 320, 95);
  fill(0);
  textSize(13);
  textStyle(BOLD);
  text('Data-Driven RISO', 10, 22);
  textStyle(NORMAL);
  textSize(11);
  text('Layer 1: ' + color1Name + ' | threshold: ' + int(threshold), 10, 40);
  text('Layer 2: ' + color2Name + ' | frequency: ' + nf(frequency, 1, 1) + ' lpi', 10, 56);
  text('Data: [' + data.join(', ') + ']', 10, 72);
  text('Click to randomize data | "e" to export', 10, 90);
}

function mousePressed() {
  // Randomize the data set
  for (let i = 0; i < data.length; i++) {
    data[i] = floor(random(100));
  }
  generateFromData();
}

function keyReleased() {
  if (key == 'e' || key == 'E') {
    exportRiso();
    console.log('Exported!');
  }
}
