# P5.riso Demos — Glitch & Grain

Demo sketches for learning the [p5.riso](https://antiboredom.github.io/p5.riso/) library. Covers RISO color arrays, importing images, dithering, and halftone effects.

Additional docs:
- [WALKTHROUGH.md](WALKTHROUGH.md) — detailed notes and code explanations for every demo
- [WORKING-WITH-DATA.md](WORKING-WITH-DATA.md) — reference for CSV, JSON/APIs, and randomization in p5.js
- [CCS-RISO-COLORS.md](CCS-RISO-COLORS.md) — full list of available RISO ink colors

## Setup

Each folder is a standalone P5.js sketch. To run them:

### Option A: P5.js Web Editor
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
2. Images are in the shared `images/` folder at the project root — sketches reference them via `../images/`
3. Run a local server from the project root (e.g., VS Code Live Server extension)

### Project Structure

```
p5.riso demo/
├── css/
│   └── global.css        # shared styles for all pages
├── lib/
│   └── p5.riso.js
├── images/               # shared image assets
├── 00-template/
├── 00-intro/
├── 01-color-array/
│   ├── index.html
│   └── sketch.js
└── ...                   # same structure for each demo
```

## Demos

| # | Folder | Topic | Description |
|---|--------|-------|-------------|
| 00 | `00-template` | Template | Boilerplate starter — half-letter at 150 DPI |
| 00 | `00-intro` | Intro | Basic p5.riso setup: color channels, drawing to layers, compositing |
| 01 | `01-color-array` | RISO Colors | Explore the `RISOCOLORS` array, pick random colors |
| 02 | `02-curated-palette` | Color Palette | Build a custom subset of RISO colors, draw swatches |
| 03 | `03-load-image` | Importing Images | Use `preload()` and `loadImage()` to bring images into P5 |
| 04 | `04-basic-dither` | Dithering | Apply Atkinson dither to an image on a Riso layer |
| 05 | `05-dither-comparison` | Dither Types | Compare all 4 dither algorithms — press 1–4 to switch |
| 06 | `06-two-color-dither` | Two-Color Print | Dither + halftone on two Riso layers |
| 07 | `07-data-driven` | Data-Driven | Use data to control dither threshold, halftone frequency, intensity, and angle |
| 08 | `08-functions` | Functions | Defining functions, parameters, and return values |
| 09 | `09-api-data` | API Data | `loadJSON()` fetches live Pokémon stats to drive visual output |
| 10 | `10-csv-data` | CSV Data | `loadTable()` reads a spreadsheet — each row becomes a column of dots |
| 11 | `11-random-data` | Random Data | `shuffle()` + `randomSeed()` — sample a CSV dataset, press space for a new composition |
| 12 | `12-webcam` | Webcam | Live camera feed with dither + halftone on two Riso layers |

## Image Demos (03–07)

These sketches require an image file. The repo includes images in the `images/` folder at the project root. To use your own:
- Add your image to the `images/` folder
- Update the `loadImage()` path in `sketch.js` to match your filename (e.g., `"../images/your-photo.jpg"`)
- A high-contrast photo works best for dithering demos

## Data Demos (09–11)

- **09** fetches live data from the PokéAPI — requires an internet connection
- **10 and 11** read from a local `data.csv` file included in each folder. To use your own spreadsheet, replace `data.csv` and update the column names in `sketch.js`

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
