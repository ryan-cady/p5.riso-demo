// Demo 01: RISO Color Array
// Explore the RISOCOLORS array and pick random colors
//
// RISOCOLORS is a global array with 81 Risograph ink colors.
// Each entry has a .name (string) and .color ([r, g, b] array).
//
// Click to pick a new random color.

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  pickNewColor();
}

function pickNewColor() {
  // Pick a random color from the RISO palette
  let randomIndex = floor(random(RISOCOLORS.length));
  let risoColor = RISOCOLORS[randomIndex];

  // Log it to the console so students can see the data structure
  console.log('Index: ' + randomIndex);
  console.log('Name: ' + risoColor.name);
  console.log('RGB: ' + risoColor.color);
  console.log('---');

  // Draw it
  background(255);

  // Big color swatch
  fill(risoColor.color);
  noStroke();
  circle(200, 180, 250);

  // Label
  fill(0);
  textAlign(CENTER);
  textSize(18);
  textStyle(BOLD);
  text(risoColor.name, 200, 340);

  textSize(12);
  textStyle(NORMAL);
  text('RGB: ' + risoColor.color.join(', '), 200, 365);
  text('Click for a new color', 200, 390);

  textSize(10);
  text('RISOCOLORS[' + randomIndex + '] of ' + RISOCOLORS.length, 200, 20);
}

function mousePressed() {
  pickNewColor();
}
