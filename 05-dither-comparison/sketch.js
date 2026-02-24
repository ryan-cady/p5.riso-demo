// Demo 05: Dither Comparison
// Compare all 4 dithering algorithms in p5.riso.
//
// Controls:
//   Press 1 → Atkinson (classic Mac dither, high contrast)
//   Press 2 → Floyd-Steinberg (smoother gradients, more detail)
//   Press 3 → Bayer (ordered grid pattern, very graphic)
//   Press 4 → None (pure threshold, pixels on or off)
//   Mouse X → Controls threshold (left = dark, right = light)
//
// IMPORTANT: Upload your own image and update the filename below.

let img;
let black;
let ditherType = 'atkinson';

function preload() {
  // CHANGE THIS to your image filename
  img = loadImage('data/photo.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  black = new Riso('black');

  console.log('Dither Comparison Demo');
  console.log('Press 1: atkinson');
  console.log('Press 2: floydsteinberg');
  console.log('Press 3: bayer');
  console.log('Press 4: none (threshold only)');
  console.log('Mouse X: threshold control');
}

function draw() {
  background(220);
  clearRiso();

  // Map mouse X position to threshold value (0-255)
  let threshold = map(mouseX, 0, width, 0, 255);

  // Dither the image with current type and threshold
  let dithered = ditherImage(img, ditherType, threshold);
  black.image(dithered, 0, 0);

  drawRiso();

  // Info overlay
  fill(255);
  noStroke();
  rect(5, 5, 280, 50);
  fill(0);
  textSize(14);
  textStyle(BOLD);
  text('Type: ' + ditherType, 10, 24);
  textStyle(NORMAL);
  textSize(12);
  text('Threshold: ' + int(threshold) + '  |  Keys 1-4 to switch', 10, 44);
}

function keyReleased() {
  if (key == '1') ditherType = 'atkinson';
  else if (key == '2') ditherType = 'floydsteinberg';
  else if (key == '3') ditherType = 'bayer';
  else if (key == '4') ditherType = 'none';

  console.log('Switched to: ' + ditherType);
}
