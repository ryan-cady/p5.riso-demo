// Demo 08: Functions
// Functions let you name and reuse a block of code.
// This sketch builds up through three levels:
//
// Press 1 = Basic function (no parameters)
// Press 2 = Function with parameters
// Press 3 = Function that returns a value
// Press r = Redraw with new random values

let mode = 1;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  noLoop();
  textFont("monospace");
}

function draw() {
  background(245, 240, 232);

  if (mode == 1) drawMode1();
  if (mode == 2) drawMode2();
  if (mode == 3) drawMode3();

  // Label
  fill(30);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("Mode " + mode + " of 3  |  Press 1, 2, 3 to switch  |  r to redraw", 20, 20);
}


// =============================================
// MODE 1: Basic function — no parameters
// A function is just a named block of code.
// Call it by name to run it.
// =============================================

function drawMode1() {
  // Call the function 3 times — same result every time
  drawCircleStamp();
  drawCircleStamp();
  drawCircleStamp();

  // Label
  fill(30);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("drawCircleStamp() — same output every time", width / 2, height - 40);
}

// This function always draws the same thing
function drawCircleStamp() {
  noStroke();
  fill(255, 72, 176, 180); // fluorescent pink
  circle(width / 2, height / 2, 200);

  stroke(255, 72, 176);
  strokeWeight(2);
  noFill();
  circle(width / 2, height / 2, 260);
}


// =============================================
// MODE 2: Function with parameters
// Parameters let you change the output each
// time you call the function.
// =============================================

function drawMode2() {
  // Same function, different inputs = different results
  drawRing(150, 200, 80, color(255, 72, 176, 180));  // pink
  drawRing(300, 350, 140, color(0, 120, 191, 180));   // blue
  drawRing(450, 250, 60, color(255, 108, 47, 180));   // orange
  drawRing(200, 450, 100, color(0, 168, 155, 180));   // teal
  drawRing(420, 430, 50, color(255, 232, 0, 180));    // yellow

  // Label
  fill(30);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("drawRing(x, y, size, col) — parameters change the output", width / 2, height - 40);
}

// x, y, size, and col are parameters
// They work like variables that get filled in when you call the function
function drawRing(x, y, size, col) {
  noStroke();
  fill(col);
  circle(x, y, size);

  stroke(col);
  strokeWeight(2);
  noFill();
  circle(x, y, size * 1.3);
  circle(x, y, size * 1.6);
}


// =============================================
// MODE 3: Function that returns a value
// return sends a result back to whoever called
// the function — like a machine with an output.
// =============================================

function drawMode3() {
  for (let i = 0; i < 12; i++) {
    let x = random(60, width - 60);
    let y = random(60, height - 80);
    let size = random(30, 120);

    // pickColor() RETURNS a color — we store it in col
    let col = pickColor();

    drawRing(x, y, size, col);
  }

  // Label
  fill(30);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("pickColor() returns a random RISO color — press r to redraw", width / 2, height - 40);
}

// This function RETURNS a value
// It picks a random color and sends it back
function pickColor() {
  let colors = [
    color(255, 72, 176, 180),  // fluorescent pink
    color(0, 120, 191, 180),   // blue
    color(255, 108, 47, 180),  // orange
    color(0, 168, 155, 180),   // teal
    color(255, 232, 0, 180),   // yellow
  ];

  let i = floor(random(colors.length));
  return colors[i]; // <-- sends the color back
}


// =============================================
// Keyboard controls
// =============================================

function keyReleased() {
  if (key == "1") { mode = 1; redraw(); }
  if (key == "2") { mode = 2; redraw(); }
  if (key == "3") { mode = 3; redraw(); }
  if (key == "r") { redraw(); }
}
