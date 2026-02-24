// Demo 02: Curated Palette
// Build a custom subset of RISO colors from the RISOCOLORS array.
// Draws swatches of your selected palette.
//
// Try changing the color names in myColorNames to build your own palette.

let myPalette = [];
let myColorNames = ['fluorescentpink', 'blue', 'yellow', 'orange', 'teal'];

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  // Filter RISOCOLORS to just the ones we want
  for (let i = 0; i < RISOCOLORS.length; i++) {
    if (myColorNames.includes(RISOCOLORS[i].name.toLowerCase())) {
      myPalette.push(RISOCOLORS[i]);
    }
  }

  console.log('My palette:');
  for (let i = 0; i < myPalette.length; i++) {
    console.log(myPalette[i].name + ' → ' + myPalette[i].color);
  }

  drawPalette();
}

function drawPalette() {
  background(255);
  noStroke();

  let swatchWidth = width / myPalette.length;
  let swatchHeight = height * 0.6;

  // Draw color swatches
  for (let i = 0; i < myPalette.length; i++) {
    fill(myPalette[i].color);
    rect(i * swatchWidth, 0, swatchWidth, swatchHeight);

    // Label each swatch
    push();
    fill(0);
    textAlign(CENTER);
    textSize(10);
    text(myPalette[i].name, i * swatchWidth + swatchWidth / 2, swatchHeight + 20);

    textSize(8);
    let c = myPalette[i].color;
    text(c[0] + ', ' + c[1] + ', ' + c[2], i * swatchWidth + swatchWidth / 2, swatchHeight + 35);
    pop();
  }

  // Random circle using palette
  let randomColor = myPalette[floor(random(myPalette.length))];
  fill(randomColor.color);
  noStroke();
  circle(width / 2, height * 0.85, 80);

  fill(0);
  textAlign(CENTER);
  textSize(10);
  text('Random from palette: ' + randomColor.name, width / 2, height - 15);
}

// Click to re-randomize the circle color
function mousePressed() {
  drawPalette();
}
