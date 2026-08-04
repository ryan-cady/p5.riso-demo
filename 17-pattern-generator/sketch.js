// Demo 17: Pattern Generator
// A grid of rotated arcs, colored with two RISO inks.
// Click the canvas for a new random layout.

let cols, rows; // number of columns and rows
const circleSize = 80;
let darkColor, lightColor; // RGB colors pulled from two RISO inks

function setup() {
  createCanvas(1275, 1650); // 8.5 x 11in sheet at 150 DPI
  pixelDensity(1);
  noLoop(); // stops looping of the draw function
  noStroke();

  // Create temporary Riso layers just to read their RGB preview color
  darkColor = new Riso("orange").channelColor;
  lightColor = new Riso("sunflower").channelColor;

  generatePattern(); // initializes cols and rows with random values and draws the pattern
}

// generates a random number of columns and rows for the pattern and then calls redraw() to draw the pattern. int converts a value to an integer number

// the redraw() function is called within generatePattern(). When redraw() is called, it triggers the draw() function to execute once, effectively redrawing the pattern with the updated cols and rows. used with noLoop().

function generatePattern() {
  cols = int(random(6, 13));
  rows = int(random(6, 13));
  redraw();
}

function draw() {
  background(255);

  //calculates spacing between the arcs by dividing the canvas width by the number of columns and rows
  const spacingX = width / cols;
  const spacingY = height / rows;

  //nested loop that iterates over each column (i) and row (j) to draw the arcs.
  for (let i = 0; i < cols; i++) {
    //calculates the coordinates for the center of the current arc based on the column/row index (i/j) and spacing.
    for (let j = 0; j < rows; j++) {
      const x = i * spacingX + spacingX / 2;
      const y = j * spacingY + spacingY / 2;

      //checks if the sum of the current column and row are even (floor rounds to a solid number)
      if ((i + j) % 2 === 0) {
        const rotation = floor(random(4)) * 90;
        // random rotation in increments of 90 degrees
        const isDarker = random() < 0.5;
        // 50% chance of being the darker RISO ink
        const fillColor = isDarker ? darkColor : lightColor;

        push();
        translate(x, y);
        rotate(radians(rotation));
        fill(fillColor);
        arc(0, 0, circleSize, circleSize, PI, 0, CHORD);
        pop();
      }
    }
  }
}

//generates new pattern when mouse is pressed
function mousePressed() {
  generatePattern();
}
