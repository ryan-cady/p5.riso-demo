// Demo 10: CSV Data
// loadTable() reads a .csv file and parses it into rows and columns.
// Each row in the spreadsheet becomes one visual element on the canvas.
//
// This sketch reads a dataset of 10 influential records.
// Each column of dots represents one record:
//   BPM      → spacing between dots (faster tempo = tighter/more dots)
//   energy   → size of each dot (high energy = bigger)
//   warmth   → which Riso layer (warm = pink, cool = blue)
//
// Press "e" to export layers as PNGs.
// Press "r" to toggle between showing artist labels and raw data values.

let table;
let pink, blue;
let showLabels = true;

function preload() {
  // loadTable() reads a CSV file and parses it into a p5.Table object.
  // "csv"    = file format
  // "header" = treat the first row as column names (not data)
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  noLoop();
  textFont("monospace");
  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");
}

function draw() {
  background(245, 240, 232);
  clearRiso();

  // table.getRowCount() returns the number of data rows (not counting the header)
  let rowCount = table.getRowCount();
  let colW = width / rowCount;  // width of each vertical column

  for (let i = 0; i < rowCount; i++) {
    // table.getRow(i) returns a p5.TableRow — one row from the CSV
    let row = table.getRow(i);

    // getString() and getNum() pull values by column name (from the header row)
    let title  = row.getString("title");
    let bpm    = row.getNum("bpm");      // 88–145
    let energy = row.getNum("energy");  // 45–98
    let warmth = row.getNum("warmth");  // 30–72

    // Map values to visual parameters
    let dotSize = map(energy, 0, 100, 3, 26);   // energy → dot diameter
    let spacing = map(bpm,   60, 180, 40, 9);   // BPM → gap between dots

    // warmth > 55 → pink layer; warmth ≤ 55 → blue layer
    let layer = (warmth > 55) ? pink : blue;

    // Draw a column of dots from top to bottom
    let x = (i + 0.5) * colW;
    layer.noStroke();
    layer.fill(220);

    let y = spacing / 2;
    while (y < height - 55) {  // leave 55px at bottom for labels
      layer.circle(x, y, dotSize);
      y += spacing;
    }
  }

  drawRiso();

  // --- Labels at the bottom ---
  noStroke();
  for (let i = 0; i < table.getRowCount(); i++) {
    let row  = table.getRow(i);
    let x    = (i + 0.5) * (width / table.getRowCount());

    push();
    translate(x, height - 50);
    rotate(-HALF_PI);

    fill(30);
    textSize(9);
    textAlign(LEFT, CENTER);

    if (showLabels) {
      // Show record title (trimmed to fit)
      text(row.getString("title").substring(0, 14), 0, 0);
    } else {
      // Show raw data values
      let bpm    = row.getNum("bpm");
      let energy = row.getNum("energy");
      let warmth = row.getNum("warmth");
      text("bpm:" + bpm + " e:" + energy + " w:" + warmth, 0, 0);
    }

    pop();
  }

  // Corner hint
  fill(140);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text("r = toggle data / labels   |   e = export", 10, height - 4);
}

function keyReleased() {
  if (key == "r") { showLabels = !showLabels; redraw(); }
  if (key == "e") exportRiso();
}
