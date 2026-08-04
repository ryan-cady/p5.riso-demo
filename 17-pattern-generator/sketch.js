// Demo 17: Pattern Generator
// A grid of rotated shapes, drawn onto two RISO ink layers.
// Click the canvas for a new random layout. Press "e" to export each layer as a PNG.

let cols, rows; // number of columns and rows
let shape1Type = "arc", shape1Size = 80; // try: "arc", "triangle", "square"
let shape2Type = "triangle", shape2Size = 60;
let layerColor1, layerColor2; // two RISO ink layers — swap the color names below to try a different combo

function setup() {
  createCanvas(1275, 1650); // 8.5 x 11in sheet at 150 DPI
  pixelDensity(1);
  noLoop(); // stops looping of the draw function
  noStroke();

  layerColor1 = new Riso("orange");
  layerColor2 = new Riso("sunflower");

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
  clearRiso(); // wipe both layers before redrawing

  //calculates spacing between the shapes by dividing the canvas width by the number of columns and rows
  const spacingX = width / cols;
  const spacingY = height / rows;

  //nested loop that iterates over each column (i) and row (j) to draw the shapes.
  for (let i = 0; i < cols; i++) {
    //calculates the coordinates for the center of the current shape based on the column/row index (i/j) and spacing.
    for (let j = 0; j < rows; j++) {
      const x = i * spacingX + spacingX / 2;
      const y = j * spacingY + spacingY / 2;

      //checks if the sum of the current column and row are even (floor rounds to a solid number)
      if ((i + j) % 2 === 0) {
        const rotation = radians(floor(random(4)) * 90);
        // random rotation in increments of 90 degrees
        const isLayer1 = random() < 0.5;
        // 50% chance of landing on layerColor1 vs. layerColor2
        const layer = isLayer1 ? layerColor1 : layerColor2;

        const isShape1 = random() < 0.5;
        // independent 50% chance of using shape1 vs. shape2 — any
        // shape can land on either color layer
        const type = isShape1 ? shape1Type : shape2Type;
        const size = isShape1 ? shape1Size : shape2Size;

        layer.noStroke();
        layer.fill(255); // full ink density

        // Transform the layer itself, then draw the shape at its local
        // origin — layer.push()/translate()/rotate() are scoped to this
        // layer, so they don't touch the canvas or the other layer.
        layer.push();
        layer.translate(x, y);
        layer.rotate(rotation);
        drawShape(layer, type, size);
        layer.pop();
      }
    }
  }

  drawRiso();
}

// draws the given shape type, at the given size, centered on the layer's local origin
function drawShape(layer, type, size) {
  if (type === "triangle") {
    layer.triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
  } else if (type === "square") {
    layer.rect(-size / 2, -size / 2, size, size);
  } else {
    // "arc" — a quarter-circle wedge, same shape the original sketch used
    layer.arc(0, 0, size, size, PI, 0, CHORD);
  }
}

//generates new pattern when mouse is pressed
function mousePressed() {
  generatePattern();
}

//exports each RISO layer as a separate PNG
function keyReleased() {
  if (key === "e") exportRiso();
}
