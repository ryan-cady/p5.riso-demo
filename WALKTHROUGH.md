# p5.riso Demo Walkthrough

A collection of 14 sketches introducing the [p5.riso](https://antiboredom.github.io/p5.riso/) library for Risograph printing with P5.js. Each demo builds on the last, moving from basic color exploration through data-driven and live-input generative output.

## Setup

1. Download or clone this repo
2. Images are in the shared `images/` folder at the project root — sketches reference them via `../images/`
3. Serve locally from the project root or copy individual sketches into the [P5.js web editor](https://editor.p5js.org/)

> Every sketch includes `pixelDensity(1)` — this is required for p5.riso. Without it, dithering and halftone output will render incorrectly on retina screens.

---

## 00 — Template

Boilerplate starter — half-letter canvas at 150 DPI. Press `e` to export Riso layers, `c` to toggle the composite view. Download the `.zip` from the demo page to start a new sketch from scratch.

---

## 00 — Intro

Basic p5.riso setup: creating color channels, drawing to layers, and compositing. Start here to understand the library's core workflow.

---

## 01 — RISO Color Array

Click the canvas to pick a new random color from the library's built-in `RISOCOLORS` array.

### Key concepts

`RISOCOLORS` is a global array provided by p5.riso containing 81 Risograph ink colors. Each entry is an object with two properties: `.name` (a string like `"fluorescentpink"`) and `.color` (RGB values you can pass to `fill()`).

```js
let i = floor(random(RISOCOLORS.length));
let c = RISOCOLORS[i];
```

`i` is an **index number** — a random position in the array. `random()` returns a decimal like `42.739`, but array positions must be whole numbers, so `floor()` rounds it down to `42`. Without `floor()`, the sketch would crash.

`c` is the **color object** at that position. The sketch uses `c.color` for the fill and `c.name` for the label.

This pattern — `floor(random(array.length))` — works for picking a random item from any array.

---

## 02 — Curated Palette

Draws swatches from a hand-picked set of RISO color names. Change the array to build your own palette.

### Key concepts

```js
let myColors = ["fluorescentpink", "blue", "yellow", "orange", "teal"];
```

An array of strings matching RISO color names (lowercase, no spaces). The full list is on the [p5.riso site](https://antiboredom.github.io/p5.riso/).

```js
let r = new Riso(myColors[i]);
fill(r.channelColor);
```

`new Riso()` creates a Riso layer. Here it's used just to grab the RGB preview color from `.channelColor` for drawing swatches. In later demos, Riso layers serve their real purpose — separate print channels.

`i` is the **loop counter**, stepping through positions 0, 1, 2, 3, 4 to draw one swatch per color. The swatch width is calculated as `width / myColors.length`, so adding or removing colors automatically adjusts the layout.

---

## 03 — Load Image

Displays an uploaded image on the canvas. Simple, but the `preload()` pattern here is critical for every demo that follows.

### Key concepts

```js
function preload() {
  img = loadImage("../images/lee-scratch-perry.jpg");
}
```

`preload()` runs **before** `setup()`. P5 waits until everything inside it is fully loaded before continuing. Loading images in `setup()` instead can result in a blank canvas or errors because the file isn't ready yet.

The image is resized to half-letter width and the canvas is sized to match: `pixelDensity(1); img.resize(825, 0); createCanvas(img.width, img.height)`.

> This is the most common failure point — wrong filename, wrong folder path, or forgetting to use `preload()`.

---

## 04 — Basic Dither

Converts the photo into a dithered dot pattern on a single Riso layer.

### Key concepts

```js
let black = new Riso("black");
```

Creates a **Riso layer** — think of it as a separate transparency. Everything drawn to this layer becomes one color channel when printed. On a real Risograph, each layer corresponds to one ink drum/pass.

```js
clearRiso();
let dithered = ditherImage(img, "atkinson");
black.image(dithered, 0, 0);
drawRiso();
```

The **p5.riso workflow** follows the same pattern in every sketch:

1. `clearRiso()` — wipe all layers clean (start fresh each frame)
2. Draw to your Riso layers — `black.image()`, `pink.circle()`, etc.
3. `drawRiso()` — composite all layers and display the result

`ditherImage()` takes a continuous-tone image and converts it to pure black-and-white pixels using a pattern algorithm. `"atkinson"` is the classic Macintosh dither — high contrast with a retro, textured look.

Note that you're drawing to the Riso layer (`black.image()`), not the main canvas. `fill()` on a Riso layer controls **ink density** (0–255), not color — the color is set when you create the layer with `new Riso("black")`.

---

## 05 — Dither Comparison

Interactive comparison of all four dither algorithms. Press keys 1–4 to switch. Move mouse left/right to change the threshold.

### Key concepts

```js
let threshold = map(mouseX, 0, width, 0, 255);
let dithered = ditherImage(img, ditherType, threshold);
```

`map()` **converts one number range to another**. Mouse X position (0 to canvas width) becomes a brightness threshold (0–255). Left = low threshold (more dots, darker). Right = high threshold (fewer dots, lighter).

The **four dither types**:

- `"atkinson"` — classic Mac look, high contrast, loses some shadow detail
- `"floydsteinberg"` — smoother gradients, most common in print production
- `"bayer"` — ordered grid pattern, very mechanical/digital feel
- `"none"` — hard threshold, not real dithering — everything above the cutoff is white, below is black

Different types suit different images. Portraits often look best with `floydsteinberg`, while graphic content works well with `atkinson`.

---

## 06 — Two-Color Print

Two Riso layers (pink dithered, blue halftoned) overlapping to simulate a two-drum print. Press `1` to increase or `2` to decrease dither threshold. Press `e` to export.

### Key concepts

```js
pink = new Riso("fluorescentpink");
blue = new Riso("blue");
```

Two layers = **two-color print**. Each layer becomes a separate PNG on export. On the real Risograph, each gets printed with a different ink drum. Where they overlap, the colors mix — the on-screen preview simulates this.

```js
let halftoned = halftoneImage(img, "circle", frequency, 45, 100);
```

`halftoneImage()` parameters:

- **Image** — source image
- **Shape** — `"circle"`, `"ellipse"`, `"square"`, `"line"`, or `"cross"`
- **Frequency** — dot density (higher = smaller, tighter dots)
- **Angle** — rotation of the dot grid in degrees (45° is standard; other values create moiré patterns)
- **Intensity** — effect strength (0–255)

`exportRiso()` saves one PNG per Riso layer. Each PNG is grayscale — the RISO operator loads them separately and assigns ink colors at the printer. White = no ink, black = full ink, gray = partial coverage.

---

## 07 — Data-Driven

An array of four numbers controls the entire visual output. Click to randomize the data. Press `e` to export.

### Key concepts

```js
let data = [42, 87, 15, 63];
```

The **data set**. Each number is 0–100. In a real project, this could be survey results, sensor readings, statistics, or any numerical data source.

```js
let threshold = map(data[0], 0, 100, 50, 200);
let frequency = map(data[1], 0, 100, 2, 15);
let intensity = map(data[2], 0, 100, 50, 200);
let angle     = map(data[3], 0, 100, 0, 90);
```

Each data point **drives a visual parameter** through `map()`. The data doesn't control color — colors are fixed (pink and blue). The data controls *how the image is processed*: dither threshold, halftone dot density, intensity, and angle.

```js
for (let i = 0; i < data.length; i++) {
  data[i] = floor(random(100));
}
```

`i` is the **loop counter**, walking through each position in the data array (0, 1, 2, 3) and replacing the value with a new random whole number. `floor(random(100))` gives a random integer from 0 to 99.

The core idea: same image, same colors, but every data set produces a different print. Click a few times to see how dramatically different values change the output.

---

## 08 — Functions

Three levels of functions — press 1, 2, 3 to switch modes. Press `r` to redraw.

### Key concepts

**Mode 1: Basic function** — a named block of code you define once and call whenever you want.

```js
function drawCircleStamp() {
  fill(255, 72, 176, 180);
  circle(width / 2, height / 2, 200);
}
```

Called three times, it draws in the same spot every time because nothing varies. Useful for organization, but limited without parameters.

**Mode 2: Parameters** — variables that get filled in at call time, making the same function produce different results.

```js
function drawRing(x, y, size, col) {
  fill(col);
  circle(x, y, size);
}

drawRing(150, 200, 80, color(255, 72, 176));  // small pink ring
drawRing(300, 350, 140, color(0, 120, 191));  // big blue ring
```

One function, many outputs. Write the recipe once, change the ingredients each time.

**Mode 3: Return values** — a function that hands a result back to the caller.

```js
function pickColor() {
  let colors = [color(255,72,176,180), color(0,120,191,180), color(255,108,47,180)];
  return colors[floor(random(colors.length))];
}

let col = pickColor();
drawRing(x, y, size, col);
```

`return` sends a value back to wherever the function was called. Mode 3 combines both concepts — `pickColor()` returns a color, `drawRing()` uses it as a parameter.

You've been using functions all along — `setup()`, `draw()`, `random()`, and `map()` are all functions. Now you can write your own.

---

## 09 — API Data

Fetches live Pokémon stats from the PokéAPI. Press 1–5 to switch Pokémon. Requires an internet connection.

### Key concepts

```js
function preload() {
  pokemon = loadJSON("https://pokeapi.co/api/v2/pokemon/bulbasaur");
}
```

`loadJSON()` fetches any URL that returns JSON and parses it automatically. Inside `preload()`, p5 waits for the request to finish before `setup()` runs — `pokemon` is fully loaded by the time you need it.

The API returns a nested object. Stats are in an array of objects, not a named field, so we use a helper function to extract them:

```js
function getStat(name) {
  for (let s of pokemon.stats) {
    if (s.stat.name === name) return s.base_stat;
  }
  return 50; // fallback
}
```

This is a common real-world pattern — API responses rarely organize data the way you want it, so you write a small function to find what you need.

Stats are then mapped to visual parameters the same way as Demo 07:

```js
let cols     = floor(map(speed,   5, 180, 3, 10));
let pinkSize = map(attack,  5, 190, 8, 56);
let blueSize = map(defense, 5, 230, 6, 48);
let angle    = map(hp,      1, 255, 0, HALF_PI);
```

When switching Pokémon after setup, `loadJSON()` is **asynchronous** — it starts the request and moves on immediately. A callback function runs when the data arrives:

```js
loadJSON(url, function(data) {
  pokemon = data;
  redraw();
});
```

Same code, same two Riso colors — Bulbasaur (slow, small) looks nothing like Mewtwo (dense grid, large shapes, heavy rotation). The data *is* the design.

---

## 10 — CSV Data

Reads a local `data.csv` file with `loadTable()`. Each row becomes one visual column of dots. Press `r` to toggle record labels.

### Key concepts

```js
function preload() {
  table = loadTable("data.csv", "csv", "header");
}
```

`loadTable()` reads a CSV and gives you a structured object. The `"header"` argument treats the first row as column names so you can access values by name instead of index.

```js
let rowCount = table.getRowCount();
for (let i = 0; i < rowCount; i++) {
  let row = table.getRow(i);
  let bpm    = row.getNum("bpm");
  let energy = row.getNum("energy");
  let warmth = row.getNum("warmth");
}
```

`getRow(i)` returns a single record. `getNum()` reads a numeric column, `getString()` reads text. Column names come from your header row — rename a column in the CSV and rename it here, and everything still works.

```js
let dotSize = map(energy, 0, 100, 3, 26);  // energy → dot diameter
let spacing = map(bpm,   60, 180, 40, 9);  // BPM → gap between dots
let layer   = (warmth > 55) ? pink : blue; // warmth → ink color
```

The **ternary operator** (`? :`) is a compact if/else: if warmth is above 55, use pink; otherwise blue. High BPM → small spacing → many dots. Low BPM → large spacing → open, airy column.

To use your own data: replace `data.csv` with any spreadsheet (Google Sheets → File → Download → CSV), update the column names in `getNum()`, and adjust the `map()` input ranges to match your data's actual min/max.

---

## 11 — Random Data

Same dataset as Demo 10, but shuffled and randomly sampled each time. Press `space` for a new composition.

### Key concepts

```js
let shuffled = shuffle(rows);
let selected = shuffled.slice(0, 5);
```

`shuffle()` returns a new array with the same items in a random order. Slicing the first N elements after shuffling picks a random subset without repetition — each record appears at most once.

```js
let seed = 42;

function draw() {
  randomSeed(seed);
  // ...
}

function keyReleased() {
  if (key === " ") {
    seed = floor(random(9999));
    redraw();
  }
}
```

Without `randomSeed()`, every call to `random()` pulls from an unpredictable sequence — good for animation, bad for reproducible prints. `randomSeed(n)` locks the sequence to a known starting point, so the same seed always produces the same composition.

The key insight: `seed = floor(random(9999))` in the keypress handler runs *outside* the seeded context, so it draws from the system's unseeded RNG — genuinely random, giving a new seed each time.

Where Demo 10 places each record in a fixed column, Demo 11 scatters them freely:

```js
let x = random(80, width - 80);
let y = random(80, height - 80);
```

The data controls the *shape* (dot count, cluster size from BPM and energy). The seed controls the *composition* (where clusters land).

---

## 12 — Webcam

Live camera feed processed in real time — pink = Atkinson dither, blue = halftone circles. Press `f` to freeze, `e` to export.

### Key concepts

```js
function setup() {
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
}
```

`createCapture(VIDEO)` asks the browser for camera access and returns a live video element. `hide()` removes it from the DOM — we draw the processed output to the p5 canvas instead.

```js
function draw() {
  clearRiso();
  let frame = capture.get(); // snapshot current video → p5.Image
  let dithered  = ditherImage(frame, "atkinson", threshold);
  let halftoned = halftoneImage(frame, "circle", frequency, 45, 100);
  pink.image(dithered, 0, 0);
  blue.image(halftoned, 0, 0);
  drawRiso();
}
```

`capture.get()` returns a static `p5.Image` copy of the video at that instant — the same format `ditherImage()` and `halftoneImage()` expect. The pipeline is identical to the static image demos; only the image source changes.

Processing two full frames every tick is expensive, so the sketch runs at `frameRate(6)` — slow enough to stay smooth, fast enough to feel live.

**Freeze, tweak, export:**

```js
if (!frozen) {
  frozenFrame = getFrame();
  frozen = true;
  noLoop();
}
```

`noLoop()` stops the animation loop. While frozen, pressing `1`/`2` (threshold) or `3`/`4` (halftone frequency) calls `redraw()` once using the stored frame — so you can dial in the look before exporting. Press `f` again to resume live view.

Keys: `f` freeze/resume · `e` export (frozen only) · `m` mirror · `1/2` dither threshold · `3/4` halftone frequency

---

## Recurring Patterns

### The Riso workflow

Every sketch from 04 onward follows three steps:

1. `clearRiso()` at the top of `draw()`
2. Draw to Riso layers in the middle
3. `drawRiso()` at the bottom of `draw()`

Forgetting `clearRiso()` causes layers to stack and go solid. Forgetting `drawRiso()` means nothing appears.

### `preload()` → `setup()` → `draw()`

- **`preload()`** — load external files. Runs once before anything else. P5 waits for it to finish.
- **`setup()`** — create canvas, create Riso layers. Runs once.
- **`draw()`** — the animation loop, runs ~60 times per second.

### `floor()` for whole numbers

`random()` returns decimals. Array indices and pixel values need integers. `floor()` rounds down. The pattern `floor(random(n))` gives a random integer from 0 to n-1.

### `map()` for range conversion

Converts a value from one range to another. Appears in demos 05–11. It's the bridge between input (mouse position, data values, API stats) and visual parameters (threshold, frequency, dot size, intensity).

### Exporting for print

`exportRiso()` saves one grayscale PNG per layer. White = no ink, black = full ink. The RISO operator assigns ink colors at the machine.
