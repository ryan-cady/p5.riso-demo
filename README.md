# P5.riso Demos — Glitch & Grain

Demo sketches for learning the [p5.riso](https://antiboredom.github.io/p5.riso/) library. Covers RISO color arrays, importing images, dithering, and halftone effects.

## Setup

Each folder is a standalone P5.js sketch. To run them:

### Option A: P5.js Web Editor (Recommended)
1. Go to [editor.p5js.org](https://editor.p5js.org) and log in
2. Create a new sketch
3. Open the file sidebar (click the `>` arrow)
4. Click the dropdown `▼` and add a new file called `p5.riso.js`
5. Copy the contents of the [p5.riso library](https://raw.githubusercontent.com/antiboredom/p5.riso/master/lib/p5.riso.js) into that file
6. In `index.html`, add this line inside the `<head>` tag:
   ```html
   <script src="p5.riso.js"></script>
   ```
7. Replace the contents of `sketch.js` with the code from any demo below
8. For demos that use images (03–07), upload an image file to your sketch and update the filename in the code

### Option B: Run Locally
1. Clone this repo
2. Download [p5.riso.js](https://raw.githubusercontent.com/antiboredom/p5.riso/master/lib/p5.riso.js) and place it in each demo folder (or in a shared `lib/` folder and update the paths)
3. For image demos, add a `data/` folder with a `.jpg` image and update the filename in `sketch.js`
4. Run a local server (e.g., VS Code Live Server extension)

## Demos

| # | Folder | Topic | Description |
|---|--------|-------|-------------|
| 01 | `01-color-array` | RISO Colors | Explore the `RISOCOLORS` array, pick random colors |
| 02 | `02-curated-palette` | Color Palette | Build a custom subset of RISO colors, draw swatches |
| 03 | `03-load-image` | Importing Images | Use `preload()` and `loadImage()` to bring images into P5 |
| 04 | `04-basic-dither` | Dithering | Apply atkinson dither to an image on a Riso layer |
| 05 | `05-dither-comparison` | Dither Types | Compare all 4 dither algorithms with keyboard + mouse control |
| 06 | `06-two-color-dither` | Two-Color Print | Combine dither + halftone on two Riso layers |
| 07 | `07-data-driven` | Data-Driven | Use data to control color selection and dither parameters |

## Image Demos (03–07)

These sketches require an image file. Add your own image:
- Place it in a `data/` folder inside the sketch directory (or at the root of your P5 editor sketch)
- Update the `loadImage()` path in `sketch.js` to match your filename
- A high-contrast photo works best for dithering demos

## Key Concepts

### RISOCOLORS Array
The p5.riso library includes a global `RISOCOLORS` array with 81 ink colors. Each entry is an object:
```javascript
{ name: "FLUORESCENTPINK", color: [255, 72, 176] }
```

### Essential p5.riso Functions
- `new Riso('colorname')` — Create a color layer
- `clearRiso()` — Clear all layers (use at start of draw)
- `drawRiso()` — Composite all layers to screen (use at end of draw)
- `ditherImage(img, type, threshold)` — Dither an image (types: atkinson, floydsteinberg, bayer, none)
- `halftoneImage(img, shape, frequency, angle, intensity)` — Halftone an image (shapes: circle, line, square, ellipse, cross)
- `exportRiso()` — Export each layer as a separate PNG for printing

### Important Reminders
- Always use `pixelDensity(1)` in setup
- Always load images in `preload()`, not `setup()`
- Riso layer fill takes a single value 0–255 (opacity, not color)

## Resources
- [p5.riso Documentation](https://antiboredom.github.io/p5.riso/)
- [p5.riso GitHub](https://github.com/antiboredom/p5.riso)
- [p5.riso Getting Started Tutorial](https://github.com/antiboredom/p5.riso/blob/master/tutorials/getting-started.md)
- [p5.riso Color Separation Tutorial](https://github.com/antiboredom/p5.riso/blob/master/tutorials/color-separation.md)
