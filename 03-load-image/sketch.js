// Demo 03: Importing Images
// Use preload() and loadImage() to bring images into P5.js.
//
// IMPORTANT: You must upload an image to your sketch first!
// In the P5.js web editor:
//   1. Click the > arrow to open the file sidebar
//   2. Click the dropdown and choose "Upload file"
//   3. Select your image
//   4. Update the filename below to match
//
// For running locally, place your image in a "data" folder
// next to this sketch.

let img;

function preload() {
  // CHANGE THIS to your image filename
  img = loadImage('data/photo.jpg');
}

function setup() {
  pixelDensity(1);

  // Size canvas to match the image
  createCanvas(img.width, img.height);

  console.log('Image loaded!');
  console.log('Width: ' + img.width);
  console.log('Height: ' + img.height);
}

function draw() {
  background(220);
  image(img, 0, 0);

  // Info overlay
  fill(255);
  noStroke();
  rect(5, 5, 200, 45);
  fill(0);
  textSize(12);
  text('Image: ' + img.width + ' x ' + img.height, 10, 22);
  text('pixelDensity: 1', 10, 40);
}

// KEY TAKEAWAYS:
// - Always load images in preload(), never in setup() or draw()
// - preload() runs BEFORE setup and waits until everything is loaded
// - Always use pixelDensity(1) when working with p5.riso
// - The image path must match your file exactly (case sensitive)
