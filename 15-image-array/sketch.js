// Demo 15: Image Array
// Load multiple images into an array, dither each one,
// and scatter them randomly across the canvas.
//
// IMPORTANT: Add your own images to the sketch folder
// and update the paths in imagePaths below.
//
// Press space for a new layout. Press e to export.

// ── Add or remove image paths here ───────────────────────────────
const imagePaths = [
  "../images/lee-scratch-perry.jpg",
  "../images/lee-scratch-perry-color.png",
  // "../images/your-image.jpg",
];

let images = [];
let pink, blue;
let seed = 42;

function preload() {
  // Loop through the paths and load each one.
  // images[i] corresponds to imagePaths[i] — same index, two arrays in sync.
  for (let i = 0; i < imagePaths.length; i++) {
    images[i] = loadImage(imagePaths[i]);
  }
}

function setup() {
  createCanvas(825, 1275); // half-letter at 150 DPI
  pixelDensity(1);
  noLoop();

  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");

  // Resize all images once in setup — cheaper than resizing on every draw.
  // resize(width, 0) scales height automatically to preserve aspect ratio.
  for (let i = 0; i < images.length; i++) {
    images[i].resize(400, 0);
  }
}

function draw() {
  background(245, 240, 232);
  clearRiso();

  // randomSeed locks the layout — same seed always produces the same result.
  randomSeed(seed);

  for (let i = 0; i < images.length; i++) {
    let img = images[i];

    // Alternate layers: even indexes → pink, odd → blue.
    let layer = i % 2 === 0 ? pink : blue;

    // ditherImage converts the photo to a 1-bit dot pattern.
    let dithered = ditherImage(img, "atkinson");

    // Random display size — doesn't change the image data, just how it's drawn.
    let w = random(250, 600);
    let h = img.height * (w / img.width); // preserve aspect ratio

    // Random position — allow images to hang slightly off the edge.
    let x = random(-50, width - w + 50);
    let y = random(-50, height - h + 50);

    // layer.image() works like p5's image() but draws to the Riso layer.
    layer.image(dithered, x, y, w, h);
  }

  drawRiso();

  fill(140);
  noStroke();
  textFont("monospace");
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text("space = new layout   |   seed: " + seed + "   |   e = export", 10, height - 4);
}

function keyReleased() {
  if (key === " ") {
    // Runs outside draw(), so pulls from the unseeded system RNG — truly random.
    seed = floor(random(9999));
    redraw();
  }
  if (key === "e") exportRiso();
}
