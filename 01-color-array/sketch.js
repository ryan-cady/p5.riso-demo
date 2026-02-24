// Demo 01: RISO Color Array
// The RISOCOLORS array has 81 Risograph ink colors.
// Each one has a .name and a .color (RGB values).
// Click to pick a new random color.

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  pickNewColor();
}

function pickNewColor() {
  let i = floor(random(RISOCOLORS.length));
  let c = RISOCOLORS[i];

  background(255);

  // Draw a circle in the random RISO color
  fill(c.color);
  noStroke();
  circle(200, 180, 250);

  // Show the color name
  fill(0);
  textAlign(CENTER);
  textSize(18);
  text(c.name, 200, 340);
  textSize(12);
  text("Click for a new color", 200, 375);
}

function mousePressed() {
  pickNewColor();
}
