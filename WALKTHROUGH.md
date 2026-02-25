# p5.riso Demo Walkthrough

A collection of 8 sketches introducing the [p5.riso](https://antiboredom.github.io/p5.riso/) library for Risograph printing with P5.js. Each demo builds on the last, moving from basic color exploration to data-driven generative output.

## Setup

1. Download or clone this repo
2. Images are in the shared `images/` folder at the project root — sketches reference them via `../images/`
3. Serve locally from the project root or copy individual sketches into the [P5.js web editor](https://editor.p5js.org/)

> Every sketch includes `pixelDensity(1)` — this is required for p5.riso. Without it, dithering and halftone output will render incorrectly on retina screens.

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

Converts a value from one range to another. Appears in demos 05, 06, and 07. It's the bridge between input (mouse position, data values) and visual parameters (threshold, frequency, intensity).

### Exporting for print

`exportRiso()` saves one grayscale PNG per layer. White = no ink, black = full ink. The RISO operator assigns ink colors at the machine.
