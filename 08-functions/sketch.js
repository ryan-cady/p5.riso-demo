// Demo 08: Functions
// Functions let you name and reuse a block of code.
// This sketch builds up through three levels:
//
// Press 1 = Basic function (no parameters)
// Press 2 = Function with parameters
// Press 3 = Function that returns a value
// Press r = Redraw with new random values

// `mode` tracks which demo is currently active (1, 2, or 3)
let mode = 1;

function setup() {
  createCanvas(600, 600);  // Create a 600x600 pixel canvas
  pixelDensity(1);          // Use 1:1 pixels (no retina scaling)
  noLoop();                 // Don't call draw() repeatedly — only once per redraw()
  textFont("monospace");    // Use a monospace font for all text
}

function draw() {
  background(245, 240, 232); // Fill the canvas with a warm off-white (RISO paper color)

  // Route to the right drawing function based on the current mode
  if (mode == 1) drawMode1();
  if (mode == 2) drawMode2();
  if (mode == 3) drawMode3();

  // Draw a label at the top showing what mode we're in and available controls
  fill(30);                    // Dark gray text
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
  // Call the same function 3 times — because it has no parameters,
  // it always does the exact same thing and draws in the same spot.
  // All three circles stack on top of each other.
  drawCircleStamp();
  drawCircleStamp();
  drawCircleStamp();

  // Draw a label at the bottom of the canvas
  fill(30);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("drawCircleStamp() — same output every time", width / 2, height - 40);
}

// This function always draws the same thing in the same place.
// No inputs — no variation possible.
function drawCircleStamp() {
  noStroke();
  fill(255, 72, 176, 180);            // Semi-transparent fluorescent pink
  circle(width / 2, height / 2, 200); // Filled circle at canvas center, diameter 200

  stroke(255, 72, 176);               // Pink outline (same hue, fully opaque)
  strokeWeight(2);
  noFill();
  circle(width / 2, height / 2, 260); // Larger outline-only ring, diameter 260
}


// =============================================
// MODE 2: Function with parameters
// Parameters let you change the output each
// time you call the function.
// =============================================

function drawMode2() {
  // Call drawRing() five times with different arguments each time.
  // The same function produces completely different results based on what you pass in.
  drawRing(150, 200, 80, color(255, 72, 176, 180));  // small pink ring, upper left
  drawRing(300, 350, 140, color(0, 120, 191, 180));   // large blue ring, center
  drawRing(450, 250, 60, color(255, 108, 47, 180));   // small orange ring, upper right
  drawRing(200, 450, 100, color(0, 168, 155, 180));   // medium teal ring, lower left
  drawRing(420, 430, 50, color(255, 232, 0, 180));    // tiny yellow ring, lower right

  // Draw a label describing this mode
  fill(30);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("drawRing(x, y, size, col) — parameters change the output", width / 2, height - 40);
}

// x, y, size, and col are parameters —
// they act like variables that get filled in with new values each time the function is called.
// This lets one function produce many different outputs.
function drawRing(x, y, size, col) {
  noStroke();
  fill(col);                   // Use the color passed in as the fill
  circle(x, y, size);          // Filled circle at (x, y) with diameter `size`

  stroke(col);                 // Use the same color for the outline strokes
  strokeWeight(2);
  noFill();
  circle(x, y, size * 1.3);   // First ring, 30% larger than the filled circle
  circle(x, y, size * 1.6);   // Second ring, 60% larger — creates a ripple effect
}


// =============================================
// MODE 3: Function that returns a value
// return sends a result back to whoever called
// the function — like a machine with an output.
// =============================================

function drawMode3() {
  // Draw 12 rings at random positions, sizes, and colors
  for (let i = 0; i < 12; i++) {
    let x = random(60, width - 60);   // Random x position, with padding from edges
    let y = random(60, height - 80);  // Random y position, with padding from edges
    let size = random(30, 120);       // Random diameter between 30 and 120

    // pickColor() RETURNS a color value — we store it in col and pass it along
    let col = pickColor();

    drawRing(x, y, size, col); // Reuse the same drawRing() from Mode 2
  }

  // Draw a label for this mode
  fill(30);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("pickColor() returns a random RISO color — press r to redraw", width / 2, height - 40);
}

// This function RETURNS a value — it doesn't draw anything itself.
// Think of it like a vending machine: you call it, and it hands you back a color.
function pickColor() {
  // An array of RISO-inspired colors (all semi-transparent)
  let colors = [
    color(255, 72, 176, 180),  // fluorescent pink
    color(0, 120, 191, 180),   // blue
    color(255, 108, 47, 180),  // orange
    color(0, 168, 155, 180),   // teal
    color(255, 232, 0, 180),   // yellow
  ];

  // Pick a random integer index between 0 and the last index
  let i = floor(random(colors.length));
  return colors[i]; // <-- sends the chosen color back to the caller
}


// =============================================
// Keyboard controls
// =============================================

function keyReleased() {
  // When a number key is released, switch to that mode and redraw
  if (key == "1") { mode = 1; redraw(); }
  if (key == "2") { mode = 2; redraw(); }
  if (key == "3") { mode = 3; redraw(); }
  // "r" redraws without changing mode — useful in Mode 3 to get new random values
  if (key == "r") { redraw(); }
}
