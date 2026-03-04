// Riso Camera sketch
// Full-screen webcam processed through two Riso ink layers in real time.

let capture, ink1, ink2, mirrorBuffer;
let frozen = false, frozenFrame = null;
let facingMode = 'environment';

function setup() {
  pixelDensity(1);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvas-container');
  frameRate(5);
  buildLayers();
  startCamera();
}

function buildLayers() {
  Riso.channels = [];
  ink1 = new Riso(window.cfg.color1);
  ink2 = new Riso(window.cfg.color2);
}

function startCamera() {
  if (capture) capture.remove();
  capture = createCapture({ video: { facingMode: facingMode }, audio: false });
  capture.size(windowWidth, windowHeight);
  capture.hide();
  mirrorBuffer = createGraphics(windowWidth, windowHeight);
}

function getFrame() {
  if (facingMode === 'user') {
    mirrorBuffer.clear();
    mirrorBuffer.push();
    mirrorBuffer.translate(windowWidth, 0);
    mirrorBuffer.scale(-1, 1);
    mirrorBuffer.image(capture, 0, 0, windowWidth, windowHeight);
    mirrorBuffer.pop();
    return mirrorBuffer.get();
  }
  return capture.get();
}

function draw() {
  background(240);

  if (!capture || !capture.elt.videoWidth) {
    fill(180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textFont('monospace');
    text('requesting camera…', width / 2, height / 2);
    return;
  }

  clearRiso();

  const frame = (frozen && frozenFrame) ? frozenFrame : getFrame();
  const { dither, halftone, mode, threshold, frequency } = window.cfg;

  if (mode === 'both' || mode === 'dither') {
    ink1.image(ditherImage(frame, dither, threshold), 0, 0, width, height);
  }
  if (mode === 'both' || mode === 'halftone') {
    ink2.image(halftoneImage(frame, halftone, frequency, 45, 100), 0, 0, width, height);
  }

  drawRiso();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mirrorBuffer = createGraphics(windowWidth, windowHeight);
}

// --- API exposed to the HTML UI ---

window.rebuildLayers = function () {
  buildLayers();
  if (frozen) redraw();
};

window.captureFrame = function () {
  frozenFrame = getFrame();
  frozen = true;
  noLoop();
  redraw();
  window.setFrozenUI && window.setFrozenUI(true);
};

window.retake = function () {
  frozen = false;
  frozenFrame = null;
  loop();
  window.setFrozenUI && window.setFrozenUI(false);
};

window.saveCapture = function () {
  saveCanvas('riso-capture', 'png');
};

window.flipCamera = function () {
  facingMode = (facingMode === 'environment') ? 'user' : 'environment';
  startCamera();
};

window.isFrozen = function () { return frozen; };
window.redrawFrozen = function () { if (frozen) redraw(); };
