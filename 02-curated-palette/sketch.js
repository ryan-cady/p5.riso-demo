// Demo 02: Curated Palette
// Build your own palette by picking RISO color names.
// Try changing the names in the array below!
//
// Full list of color names:
// https://antiboredom.github.io/p5.riso/

let myColors = ["fluorescentpink", "blue", "yellow", "orange", "teal"];

function setup() {
  createCanvas(400, 300);
  pixelDensity(1);

  background(255);
  noStroke();

  let w = width / myColors.length;

  for (let i = 0; i < myColors.length; i++) {

    // Create a temporary Riso layer to get the RGB color
    let r = new Riso(myColors[i]);

    // Draw the swatch using the layer's color
    fill(r.channelColor);
    rect(i * w, 0, w, 200);

    // Label it
    fill(0);
    textAlign(CENTER);
    textSize(10);
    text(myColors[i], i * w + w / 2, 225);
  }
}
