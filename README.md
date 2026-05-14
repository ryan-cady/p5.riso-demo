# p5.riso Demos — Glitch & Grain

Demo sketches for learning the [p5.riso](https://antiboredom.github.io/p5.riso/) library. Covers RISO color channels, image import, dithering, halftone effects, and data-driven layouts.

Open `index.html` in a browser to browse all demos with the sidebar navigation. The homepage includes a searchable glossary, resource links, and an inline RISO ink color reference with swatches for all available 1-color and 2-color drums.

Additional docs:
- [WALKTHROUGH.md](WALKTHROUGH.md) — detailed notes and code explanations for each demo
- [WORKING-WITH-DATA.md](WORKING-WITH-DATA.md) — reference for CSV, JSON/APIs, and randomization in p5.js
- [CCS-RISO-COLORS.md](CCS-RISO-COLORS.md) — available RISO ink drums and p5.riso color names

## Setup

Each folder is a standalone p5.js sketch. To run them:

### Option A: p5.js Web Editor
1. Go to [editor.p5js.org](https://editor.p5js.org) and log in
2. Create a new sketch
3. Open the file sidebar (click the `>` arrow)
4. Click the dropdown `▼` and add a new file called `p5.riso.js`
5. Copy the contents of the [p5.riso library](https://raw.githubusercontent.com/antiboredom/p5.riso/master/lib/p5.riso.js) into that file
6. In `index.html`, add inside the `<head>` tag:
   ```html
   <script src="p5.riso.js"></script>
   ```
7. Replace `sketch.js` with the code from any demo
8. For image demos (03–07), upload an image file and update the `loadImage()` path

### Option B: Run Locally
1. Clone this repo
2. Run a local server from the project root (e.g., VS Code Live Server)
3. Open `index.html` — the sidebar links to every demo

Images are in the shared `images/` folder; sketches reference them via `../images/`.

### Project Structure

```
p5.riso demo/
├── css/
│   └── global.css          # shared styles for all pages
├── lib/
│   └── p5.riso.js
├── nav.js                  # shared sidebar navigation (injected into every page)
├── images/                 # shared image assets
├── 00-glossary/            # searchable term reference
├── 00-template/            # blank boilerplate sketch
├── 00-intro/
├── 01-color-array/
│   ├── index.html
│   └── sketch.js
└── ...                     # same structure for each demo
```

## Demos

| # | Folder | Topic | Description |
|---|--------|-------|-------------|
| 00 | `00-glossary` | Reference | Searchable glossary of JavaScript, p5.js, and p5.riso terms |
| 00 | `00-template` | Template | Boilerplate starter — half-letter at 150 DPI |
| 00 | `00-intro` | Intro | Basic p5.riso setup: color channels, drawing to layers, compositing |
| 01 | `01-color-array` | RISO Colors | Explore the `RISOCOLORS` array, pick random colors |
| 02 | `02-curated-palette` | Color Palette | Build a custom subset of RISO colors, draw swatches |
| 03 | `03-load-image` | Images | Use `preload()` and `loadImage()` to bring images into p5 |
| 04 | `04-basic-dither` | Dithering | Apply Atkinson dither to an image on a Riso layer |
| 05 | `05-dither-comparison` | Dither Types | Compare all 4 dither algorithms — press 1–4 to switch |
| 06 | `06-two-color-dither` | Two-Color Print | Dither + halftone on two Riso layers |
| 07 | `07-data-driven` | Data-Driven | Data controls dither threshold, halftone frequency, intensity, and angle |
| 08 | `08-functions` | Functions | Defining functions, parameters, and return values |
| 09 | `09-api-data` | API Data | `loadJSON()` fetches live Pokémon stats to drive visual output |
| 10 | `10-csv-data` | CSV Data | `loadTable()` reads a spreadsheet — each row becomes a column of dots |
| 11 | `11-random-data` | Random Data | `shuffle()` + `randomSeed()` on CSV data — press space for a new composition |
| 12 | `12-webcam` | Webcam | Live camera feed with dither + halftone on two Riso layers |
| 13 | `13-arrays` | Arrays | Arrays of objects drive the sketch — same loop pattern as CSV data |
| 14 | `14-random-array` | Randomize Array | `shuffle()` + `randomSeed()` on a hardcoded array |
| 15 | `15-image-array` | Image Array | Load multiple images, dither each one, scatter with `randomSeed()` |
| 16 | `16-data-cruncher` | Data Cruncher | Drop any CSV — toggle columns, filter rows, copy a ready-to-paste sketch |

## Image Demos (03–07)

These sketches require an image file. The repo includes sample images in `images/`. To use your own:
- Add your image to the sketch folder (or `images/`)
- Update the `loadImage()` path in `sketch.js`
- High-contrast photos work best for dithering and halftone demos

## Data Demos (09–11)

- **09** fetches live data from the PokéAPI — requires an internet connection
- **10 and 11** read from a local `data.csv` included in each folder — replace it with your own spreadsheet and update the column names in `sketch.js`

## Key Concepts

### Essential p5.riso Functions
```javascript
let pink = new Riso('fluorescentpink'); // create a color layer
clearRiso();                            // clear all layers (top of draw)
drawRiso();                             // composite layers to screen (end of draw)
exportRiso();                           // export each layer as a separate PNG

ditherImage(img, 'atkinson', threshold);           // convert image to 1-bit dots
halftoneImage(img, 'circle', frequency, angle, intensity); // halftone pattern
```

### RISOCOLORS Array
The library includes a global `RISOCOLORS` array with 81 ink colors. Each entry:
```javascript
{ name: "FLUORESCENTPINK", color: [255, 72, 176] }
```

### Reminders
- Always use `pixelDensity(1)` in `setup()`
- Always load images in `preload()`, not `setup()`
- Riso layer fill takes a single value 0–255 (opacity, not color)

## Resources
- [p5.riso Documentation](https://antiboredom.github.io/p5.riso/)
- [p5.riso GitHub](https://github.com/antiboredom/p5.riso)
- [p5.js Reference](https://p5js.org/reference/)
- [p5.riso Getting Started Tutorial](https://github.com/antiboredom/p5.riso/blob/master/tutorials/getting-started.md)
- [p5.riso Color Separation Tutorial](https://github.com/antiboredom/p5.riso/blob/master/tutorials/color-separation.md)
