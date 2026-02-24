# p5.riso Demos — Glitch & Grain

Demo sketches for learning the [p5.riso](https://antiboredom.github.io/p5.riso/) library. Covers RISO color channels, color arrays, importing images, dithering, and halftone effects.

p5.riso simulates the Risograph printing process, where each color is printed as a separate layer using stencil-based ink application. Unlike CMYK printing, Risograph uses spot colors (like screen printing) and prints one color at a time. Think of it like working with transparencies — each channel is a clear sheet with one color, and the final image is the stack of all sheets.

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
| 00 | `00-intro` | Intro to p5.riso | Basic color channels, drawing to layers, compositing |
| 01 | `01-color-array` | RISO Colors | Explore the `RISOCOLORS` array, pick random colors |
| 02 | `02-curated-palette` | Color Palette | Build a custom subset of RISO colors, draw swatches |
| 03 | `03-load-image` | Importing Images | Use `preload()` and `loadImage()` to bring images into P5 |
| 04 | `04-basic-dither` | Dithering | Apply atkinson dither to an image on a Riso layer |
| 05 | `05-dither-comparison` | Dither Types | Compare all 4 dither algorithms with keyboard + mouse control |
| 06 | `06-two-color-dither` | Two-Color Print | Combine dither + halftone on two Riso layers |
| 07 | `07-data-driven` | Data-Driven | Use data to control color selection and dither parameters |

### Image Demos (03–07)

These sketches require an image file. Add your own image:
- Place it in a `data/` folder inside the sketch directory (or at the root of your P5 editor sketch)
- Update the `loadImage()` path in `sketch.js` to match your filename
- A high-contrast photo works best for dithering demos

## Key Concepts

### Color Channels

Each `Riso()` object represents one ink color. You don't draw directly to the main canvas — you draw to Riso channels, then composite them.

- `fill()` values (0–255) control **ink density**, not color. 255 = full ink coverage, 128 = 50% density, 0 = no ink (transparent).
- Where layers overlap, colors blend through optical mixing (subtractive color mixing).
- Channel order matters: `drawRiso()` composites layers in the order they were created, with the last layer on top.

### Common Pattern

```javascript
function draw() {
  background(255);
  clearRiso();           // Clear all channels
  blue.fill(255);        // Draw to blue channel
  blue.ellipse(x, y, r);
  red.fill(255);         // Draw to red channel
  red.ellipse(x, y, r);
  drawRiso();            // Composite all channels to canvas
}
```

### RISOCOLORS Array

The p5.riso library includes a global `RISOCOLORS` array with 81 ink colors. Each entry is an object with a name and RGB values:

```javascript
{ name: "FLUORESCENTPINK", color: [255, 72, 176] }
```

Some commonly available colors: black, burgundy, blue, green, mediumblue, brightred, scarlet, yellow, orange, fluorescentpink, violet, teal, lightteal, sunflower, seablue, brown, crimson, forest, metallicgold, coral, mint, aqua

## Reference

### Essential Functions

- `new Riso('colorname')` — Create a color channel
- `clearRiso()` — Clear all channels (use at start of draw)
- `drawRiso()` — Composite all channels to screen (use at end of draw)
- `ditherImage(img, type, threshold)` — Dither an image (types: atkinson, floydsteinberg, bayer, none)
- `halftoneImage(img, shape, frequency, angle, intensity)` — Halftone an image (shapes: circle, line, square, ellipse, cross)
- `Riso.cutout(graphic)` — Remove overlapping areas from a layer
- `exportRiso()` — Export each channel as a separate PNG for printing

### Exporting

`exportRiso()` exports each color channel as a separate PNG file. Each PNG shows only that color's ink on a white background — these are exactly what you'd send to an actual Risograph printer. Your browser may block multiple simultaneous downloads; allow them when prompted.

### Important Reminders

- Always use `pixelDensity(1)` in setup — otherwise retina screens double your export size
- Always load images in `preload()`, not `setup()` or `draw()`
- Riso layer `fill()` takes a single value 0–255 (ink density, not color)
- `clearRiso()` must be called each frame before drawing
- `drawRiso()` must be called after all channel drawing to composite

## Resources

- [p5.riso Documentation](https://antiboredom.github.io/p5.riso/)
- [p5.riso GitHub](https://github.com/antiboredom/p5.riso)
- [Getting Started Tutorial](https://github.com/antiboredom/p5.riso/blob/master/tutorials/getting-started.md)
- [Color Separation Tutorial](https://github.com/antiboredom/p5.riso/blob/master/tutorials/color-separation.md)