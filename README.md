# p5.riso - RISOGRAPH Print Simulation

p5.riso simulates the RISOGRAPH printing process, where each color is printed as a separate layer using stencil-based ink application. Unlike CMYK printing, Risograph uses spot colors (like screen printing) and prints one color at a time.

**Documentation**: [antiboredom.github.io/p5.riso](https://antiboredom.github.io/p5.riso)

## KEY CONCEPTS

1. **Color Channels**: Each Riso() object represents one ink color
2. **Ink Density**: fill() values (0-255) control ink coverage, not color
   - 255 = full ink coverage
   - 128 = 50% ink density
   - 0 = no ink (transparent)
3. **Optical Mixing**: Colors blend where layers overlap (subtractive color mixing)
4. **Separation**: Each channel can be exported as a separate image file

## WORKFLOW

- Create color channels: `let blue = new Riso('blue');`
- Clear channels each frame: `clearRiso();`
- Draw to channels: `blue.ellipse(x, y, size);`
- Composite to canvas: `drawRiso();`

## EXPORTING

- `exportRiso()` exports each color channel as a separate PNG file
- Each PNG shows only that color's ink on a white background
- These files are exactly what you'd send to an actual Risograph printer
- File naming: [color-name].png (e.g., blue.png, red.png)
- Browser may block multiple downloads - allow them when prompted

## AVAILABLE COLORS

black, burgundy, blue, green, mediumblue, brightred, scarlet, yellow, orange, fluorescentpink, violet, teal, lightteal, sunflower, seablue, greenlime, brown, crimson, forest, metallicgold, metallicsilver

## IMPORTANT NOTES

- You don't draw directly to the main canvas - you draw to Riso channels
- `clearRiso()` must be called each frame before drawing (usually in draw())
- `drawRiso()` must be called after all channel drawing to composite them
- Order matters: channels composite in the order they're created
- Think of it like working with transparencies - each channel is a clear sheet with one color, and the final image is the stack of all sheets

## COMMON PATTERN

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
