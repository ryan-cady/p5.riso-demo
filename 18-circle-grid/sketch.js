// Demo 18: Circle Grid
// The basics, all in one sketch: a nested loop draws a grid,
// using one RISO ink color, with a keyboard export shortcut.
// Press "e" to export the layer as a PNG.

let pink; // will hold our one RISO ink layer

function setup() {
  createCanvas(600, 600); // the drawing surface — 600 x 600 pixels
  pixelDensity(1); // keep 1 pixel = 1 pixel, so exports come out the right size
  noLoop(); // draw() only needs to run once — nothing here animates

  pink = new Riso("fluorescentpink"); // create one RISO ink layer, named "pink"
}

function draw() {
  background(255); // fill the canvas white
  clearRiso(); // wipe the RISO layer before drawing — good habit, even the first time

  let cols = 6; // how many circles across
  let rows = 6; // how many circles down
  let spacing = width / cols; // divide the canvas evenly by the number of columns

  // OUTER loop: walks down the rows, one at a time
  for (let row = 0; row < rows; row++) {

    // INNER loop: for every row, walks all the way across the columns
    for (let col = 0; col < cols; col++) {

      // turn the column/row count into a pixel position —
      // this is the center of the current grid cell
      let x = col * spacing + spacing / 2;
      let y = row * spacing + spacing / 2;

      pink.noStroke(); // no outline on the circle
      pink.fill(255); // 255 = full ink density (solid pink)
      pink.circle(x, y, spacing * 0.6); // draw the circle, sized to fit the cell
    }
  }

  drawRiso(); // composite the RISO layer onto the canvas — nothing shows until this runs
}

// pressing "e" exports the layer as its own PNG, ready to send to the RISO printer
function keyPressed() {
  if (key === "e") {
    exportRiso();
  }
}
