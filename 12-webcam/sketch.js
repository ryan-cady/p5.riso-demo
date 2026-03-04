// Demo 11: Webcam Riso
// Live webcam feed processed through two Riso layers in real time.
// Pink layer = Atkinson dither  ·  Blue layer = halftone circles
//
// Press "f"   — freeze the current frame / resume live view
// Press "e"   — export frozen layers as separate PNGs
// Press "m"   — toggle mirror (default: on)
// Press "1/2" — raise / lower dither threshold
// Press "3/4" — raise / lower halftone frequency

let capture;
let pink, blue;
let mirrorBuffer;
let frozen = false;
let frozenFrame = null;
let threshold = 130;
let frequency = 5;
let mirrored = true;

function setup() {
  pixelDensity(1);
  createCanvas(640, 480);
  frameRate(6);

  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  mirrorBuffer = createGraphics(640, 480);
}

// Return the current video frame as a p5.Image, optionally mirrored.
function getFrame() {
  if (!mirrored) return capture.get();
  mirrorBuffer.clear();
  mirrorBuffer.push();
  mirrorBuffer.translate(640, 0);
  mirrorBuffer.scale(-1, 1);
  mirrorBuffer.image(capture, 0, 0);
  mirrorBuffer.pop();
  return mirrorBuffer.get();
}

function draw() {
  background(240);

  // Wait until the camera stream is ready
  if (!capture.elt.videoWidth) {
    fill(30);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textFont("monospace");
    text("waiting for camera...", width / 2, height / 2);
    return;
  }

  clearRiso();

  // Use the frozen snapshot when paused, live frame otherwise
  let frame = frozen && frozenFrame ? frozenFrame : getFrame();

  // Pink layer: Atkinson dither
  let dithered = ditherImage(frame, "atkinson", threshold);
  pink.image(dithered, 0, 0);

  // Blue layer: halftone circles
  let halftoned = halftoneImage(frame, "circle", frequency, 45, 100);
  blue.image(halftoned, 0, 0);

  drawRiso();
  drawStatusBar();
}

function drawStatusBar() {
  noStroke();
  fill(0, 0, 0, 140);
  rect(0, height - 32, width, 32);
  fill(255);
  textSize(11);
  textFont("monospace");
  textAlign(LEFT, CENTER);
  if (frozen) {
    text("FROZEN  |  e = export  ·  f = resume live  ·  1/2 = threshold  ·  3/4 = freq", 10, height - 16);
  } else {
    let m = mirrored ? "on" : "off";
    text(`LIVE  thr:${threshold}  freq:${frequency}  mirror:${m}  |  f=freeze  1/2=thr  3/4=freq  m=mirror`, 10, height - 16);
  }
}

function keyReleased() {
  // f — freeze / unfreeze
  if (key === "f" || key === "F") {
    if (!frozen) {
      frozenFrame = getFrame();
      frozen = true;
      noLoop();
      redraw();
    } else {
      frozen = false;
      frozenFrame = null;
      loop();
    }
  }

  // e — export (only when frozen)
  if (key === "e" || key === "E") {
    if (frozen) exportRiso();
  }

  // m — toggle mirror (live only)
  if (key === "m" || key === "M") {
    if (!frozen) mirrored = !mirrored;
  }

  // 1/2 — adjust dither threshold
  if (key === "1") { threshold = constrain(threshold + 10, 50, 220); if (frozen) redraw(); }
  if (key === "2") { threshold = constrain(threshold - 10, 50, 220); if (frozen) redraw(); }

  // 3/4 — adjust halftone frequency
  if (key === "3") { frequency = constrain(frequency + 1, 2, 12); if (frozen) redraw(); }
  if (key === "4") { frequency = constrain(frequency - 1, 2, 12); if (frozen) redraw(); }
}
