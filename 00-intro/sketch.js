/*
 * p5.riso - RISOGRAPH Print Simulation
 * 
 * p5.riso simulates the RISOGRAPH printing process, where each color is printed 
 * as a separate layer using stencil-based ink application. Unlike CMYK printing, 
 * Risograph uses spot colors (like screen printing) and prints one color at a time.
 * 
 * KEY CONCEPTS:
 * 1. Color Channels: Each Riso() object represents one ink color
 * 2. Ink Density: fill() values (0-255) control ink coverage, not color
 *    - 255 = full ink coverage
 *    - 128 = 50% ink density
 *    - 0 = no ink (transparent)
 * 3. Optical Mixing: Colors blend where layers overlap (subtractive color mixing)
 * 4. Separation: Each channel can be exported as a separate image file
 * 
 * WORKFLOW:
 * - Create color channels: let blue = new Riso('blue');
 * - Clear channels each frame: clearRiso();
 * - Draw to channels: blue.ellipse(x, y, size);
 * - Composite to canvas: drawRiso();
 * 
 * EXPORTING:
 * - exportRiso() exports each color channel as a separate PNG file
 * - Each PNG shows only that color's ink on a white background
 * - These files are exactly what you'd send to an actual Risograph printer
 * - File naming: [color-name].png (e.g., blue.png, red.png)
 * - Browser may block multiple downloads - allow them when prompted
 * 
 * AVAILABLE COLORS:
 * black, burgundy, blue, green, mediumblue, brightred, scarlet, yellow, 
 * orange, fluorescentpink, violet, teal, lightteal, sunflower, seablue, 
 * greenlime, brown, crimson, forest, metallicgold, metallicsilver
 * 
 * IMPORTANT NOTES:
 * - You don't draw directly to the main canvas - you draw to Riso channels
 * - clearRiso() must be called each frame before drawing (usually in draw())
 * - drawRiso() must be called after all channel drawing to composite them
 * - Order matters: channels composite in the order they're created
 * - Think of it like working with transparencies - each channel is a clear 
 *   sheet with one color, and the final image is the stack of all sheets
 * 
 * COMMON PATTERN:
 * function draw() {
 *   background(255);
 *   clearRiso();           // Clear all channels
 *   blue.fill(255);        // Draw to blue channel
 *   blue.ellipse(x, y, r);
 *   red.fill(255);         // Draw to red channel
 *   red.ellipse(x, y, r);
 *   drawRiso();            // Composite all channels to canvas
 * }
 */


let blue, red, yellow, black;

function setup() {
    createCanvas(800, 600);

    // Initialize color channels
    blue = new Riso('blue');
    red = new Riso('red');
    yellow = new Riso('yellow');
    black = new Riso('black');

    noLoop(); // Draw once, click to redraw
}

function draw() {
    background(255);
    clearRiso();
    

    // ============================================
    // UNCOMMENT ONE EXAMPLE AT A TIME
    // ============================================

    // --- EXAMPLE 1: Basic Color Mixing ---
    // Demonstrates how colors blend optically
    basicColorMixing();

    // --- EXAMPLE 2: Halftone Gradients ---
    // Creates smooth gradients using ink density
    // halftoneGradients();

    // --- EXAMPLE 3: Text Layering ---
    // Shows registration and overlap with typography
    //   textLayering();

    // --- EXAMPLE 4: Geometric Patterns ---
    // Grid-based designs with color interaction
    //   geometricPatterns();

    // --- EXAMPLE 5: Line Work and Hatching ---
    // Cross-hatching and line-based textures
    //   lineWorkHatching();

    // --- EXAMPLE 6: Texture and Noise ---
    // Organic textures using Perlin noise
    //   textureNoise();

    // --- EXAMPLE 7: Radial Patterns ---
    // Concentric circles and radiating lines
    //   radialPatterns();

    // --- EXAMPLE 8: Offset/Misregistration ---
    // Simulates printing misalignment
    // offsetMisregistration();

    // --- EXAMPLE 9: Overlapping Shapes ---
    // Complex color mixing with multiple overlaps
    //   overlappingShapes();

    // --- EXAMPLE 10: Dots and Stippling ---
    // Pointillist approach to tone
    //   dotsStippling();

    drawRiso();
}

// ============================================
// EXAMPLE FUNCTIONS
// ============================================

function basicColorMixing() {
    // Three circles creating secondary colors where they overlap
    blue.fill(255);
    blue.noStroke();
    blue.ellipse(300, 250, 250);

    red.fill(255);
    red.noStroke();
    red.ellipse(500, 250, 250);

    yellow.fill(255);
    yellow.noStroke();
    yellow.ellipse(400, 400, 250);
}

function halftoneGradients() {
    // Horizontal gradient using varying ink density
    for (let x = 0; x < width; x += 10) {
        let density = map(x, 0, width, 255, 0);
        blue.fill(density);
        blue.noStroke();
        blue.rect(x, 0, 10, height / 3);
    }

    // Diagonal gradient with red
    for (let y = 0; y < height / 3; y += 10) {
        for (let x = 0; x < width; x += 10) {
            let density = map(x + y, 0, width + height / 3, 0, 255);
            red.fill(density);
            red.noStroke();
            red.rect(x, height / 3 + y, 10, 10);
        }
    }

    // Radial gradient with yellow
    for (let r = 0; r < 300; r += 10) {
        let density = map(r, 0, 300, 255, 0);
        yellow.fill(density);
        yellow.noStroke();
        yellow.ellipse(width / 2, 2 * height / 3 + 100, r);
    }
}

function textLayering() {
    // Large background text
    blue.textSize(180);
    blue.textAlign(CENTER, CENTER);
    blue.fill(255);
    blue.text('RISO', width / 2, height / 2 - 20);

    // Offset smaller text for depth
    red.textSize(180);
    red.textAlign(CENTER, CENTER);
    red.fill(180);
    red.text('RISO', width / 2 + 8, height / 2 - 12);

    // Accent lines
    yellow.strokeWeight(8);
    yellow.stroke(255);
    yellow.noFill();
    for (let i = 0; i < 5; i++) {
        yellow.line(100, 150 + i * 80, 700, 150 + i * 80);
    }
}

function geometricPatterns() {
    // Grid of squares with alternating colors
    let gridSize = 60;
    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            if ((x / gridSize + y / gridSize) % 2 == 0) {
                blue.fill(255);
                blue.noStroke();
                blue.rect(x, y, gridSize * 0.8, gridSize * 0.8);
            } else {
                red.fill(255);
                red.noStroke();
                red.ellipse(x + gridSize / 2, y + gridSize / 2, gridSize * 0.7);
            }
        }
    }

    // Overlapping triangles
    yellow.fill(200);
    yellow.noStroke();
    yellow.triangle(200, 100, 600, 100, 400, 500);
}

function lineWorkHatching() {
    // Vertical lines - blue
    blue.strokeWeight(2);
    blue.stroke(255);
    for (let x = 0; x < width / 2; x += 8) {
        blue.line(x, 0, x, height);
    }

    // Horizontal lines - red
    red.strokeWeight(2);
    red.stroke(255);
    for (let y = 0; y < height; y += 8) {
        red.line(width / 2, y, width, y);
    }

    // Diagonal cross-hatch - yellow
    yellow.strokeWeight(2);
    yellow.stroke(180);
    for (let i = -height; i < width; i += 15) {
        yellow.line(i, 0, i + height, height);
        yellow.line(width - i, 0, width - i - height, height);
    }
}

function textureNoise() {
    // Perlin noise texture with blue
    blue.noStroke();
    for (let x = 0; x < width; x += 5) {
        for (let y = 0; y < height; y += 5) {
            let n = noise(x * 0.01, y * 0.01);
            let density = map(n, 0, 1, 0, 255);
            blue.fill(density);
            blue.rect(x, y, 5, 5);
        }
    }

    // Random dots with red
    red.noStroke();
    for (let i = 0; i < 800; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(2, 8);
        red.fill(random(100, 255));
        red.ellipse(x, y, size);
    }
}

function radialPatterns() {
    // Concentric circles
    for (let r = 300; r > 0; r -= 20) {
        if (r % 40 == 0) {
            blue.fill(255);
            blue.noStroke();
            blue.ellipse(width / 2, height / 2, r);
        }
    }

    // Radiating lines
    red.strokeWeight(3);
    red.stroke(255);
    for (let angle = 0; angle < TWO_PI; angle += PI / 16) {
        let x1 = width / 2 + cos(angle) * 50;
        let y1 = height / 2 + sin(angle) * 50;
        let x2 = width / 2 + cos(angle) * 250;
        let y2 = height / 2 + sin(angle) * 250;
        red.line(x1, y1, x2, y2);
    }

    // Center dot
    yellow.fill(255);
    yellow.noStroke();
    yellow.ellipse(width / 2, height / 2, 100);
}

function offsetMisregistration() {
    // Same shape drawn in three colors with slight offsets
    // to simulate printing misalignment

    let shapes = [
        { x: 200, y: 150, w: 120, h: 180 },
        { x: 350, y: 200, w: 180, h: 120 },
        { x: 250, y: 350, w: 150, h: 150 },
        { x: 450, y: 320, w: 140, h: 200 }
    ];

    // Blue layer - offset up and left
    blue.fill(255);
    blue.noStroke();
    for (let s of shapes) {
        blue.rect(s.x - 3, s.y - 3, s.w, s.h);
    }

    // Red layer - centered
    red.fill(255);
    red.noStroke();
    for (let s of shapes) {
        red.rect(s.x, s.y, s.w, s.h);
    }

    // Yellow layer - offset down and right
    yellow.fill(255);
    yellow.noStroke();
    for (let s of shapes) {
        yellow.rect(s.x + 3, s.y + 3, s.w, s.h);
    }
}

function overlappingShapes() {
    // Multiple organic shapes creating complex color interactions
    blue.fill(255);
    blue.noStroke();
    blue.ellipse(250, 200, 300, 400);
    blue.ellipse(500, 350, 280, 280);

    red.fill(255);
    red.noStroke();
    red.ellipse(400, 250, 350, 250);
    red.rect(150, 400, 300, 150, 20);

    yellow.fill(255);
    yellow.noStroke();
    yellow.ellipse(550, 200, 200, 300);
    yellow.ellipse(300, 450, 250, 180);

    black.fill(200);
    black.noStroke();
    black.ellipse(400, 300, 80, 80);
}

function dotsStippling() {
    // Density-based stippling creating tonal variation
    for (let x = 50; x < width - 50; x += 15) {
        for (let y = 50; y < height - 50; y += 15) {
            // Calculate density based on distance from center
            let d = dist(x, y, width / 2, height / 2);
            let maxDist = dist(0, 0, width / 2, height / 2);
            let probability = map(d, 0, maxDist, 1, 0);

            if (random() < probability) {
                let size = random(3, 10);
                blue.fill(255);
                blue.noStroke();
                blue.ellipse(x + random(-5, 5), y + random(-5, 5), size);
            }
        }
    }

    // Overlay with red dots in opposite pattern
    for (let x = 50; x < width - 50; x += 15) {
        for (let y = 50; y < height - 50; y += 15) {
            let d = dist(x, y, width / 2, height / 2);
            let maxDist = dist(0, 0, width / 2, height / 2);
            let probability = map(d, 0, maxDist, 0, 1);

            if (random() < probability) {
                let size = random(2, 8);
                red.fill(255);
                red.noStroke();
                red.ellipse(x + random(-5, 5), y + random(-5, 5), size);
            }
        }
    }
}

// ============================================
// INTERACTION
// ============================================

function mousePressed() {
    redraw(); // Refresh for examples with randomness
}

function keyPressed() {
    if (key === 'e') {
        exportRiso(); // Export all channels as separate PNGs
    }
    if (key === 's') {
        saveCanvas('riso-composite', 'png'); // Save composite image
    }
}