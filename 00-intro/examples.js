// Shared example functions — used by both sketch.js and runner.html

function basicColorMixing() {
    blue.fill(255); blue.noStroke();
    blue.ellipse(300, 250, 250);
    red.fill(255); red.noStroke();
    red.ellipse(500, 250, 250);
    yellow.fill(255); yellow.noStroke();
    yellow.ellipse(400, 400, 250);
}

function halftoneGradients() {
    for (let x = 0; x < width; x += 10) {
        blue.fill(map(x, 0, width, 255, 0)); blue.noStroke();
        blue.rect(x, 0, 10, height / 3);
    }
    for (let y = 0; y < height / 3; y += 10) {
        for (let x = 0; x < width; x += 10) {
            red.fill(map(x + y, 0, width + height / 3, 0, 255)); red.noStroke();
            red.rect(x, height / 3 + y, 10, 10);
        }
    }
    for (let r = 0; r < 300; r += 10) {
        yellow.fill(map(r, 0, 300, 255, 0)); yellow.noStroke();
        yellow.ellipse(width / 2, 2 * height / 3 + 100, r);
    }
}

function textLayering() {
    blue.textSize(180); blue.textAlign(CENTER, CENTER); blue.fill(255);
    blue.text('RISO', width / 2, height / 2 - 20);
    red.textSize(180); red.textAlign(CENTER, CENTER); red.fill(180);
    red.text('RISO', width / 2 + 8, height / 2 - 12);
    yellow.strokeWeight(8); yellow.stroke(255); yellow.noFill();
    for (let i = 0; i < 5; i++) yellow.line(100, 150 + i * 80, 700, 150 + i * 80);
}

function geometricPatterns() {
    let g = 60;
    for (let x = 0; x < width; x += g) {
        for (let y = 0; y < height; y += g) {
            if ((x / g + y / g) % 2 == 0) {
                blue.fill(255); blue.noStroke(); blue.rect(x, y, g * 0.8, g * 0.8);
            } else {
                red.fill(255); red.noStroke(); red.ellipse(x + g / 2, y + g / 2, g * 0.7);
            }
        }
    }
    yellow.fill(200); yellow.noStroke();
    yellow.triangle(200, 100, 600, 100, 400, 500);
}

function lineWorkHatching() {
    blue.strokeWeight(2); blue.stroke(255);
    for (let x = 0; x < width / 2; x += 8) blue.line(x, 0, x, height);
    red.strokeWeight(2); red.stroke(255);
    for (let y = 0; y < height; y += 8) red.line(width / 2, y, width, y);
    yellow.strokeWeight(2); yellow.stroke(180);
    for (let i = -height; i < width; i += 15) {
        yellow.line(i, 0, i + height, height);
        yellow.line(width - i, 0, width - i - height, height);
    }
}

function textureNoise() {
    blue.noStroke();
    for (let x = 0; x < width; x += 5) {
        for (let y = 0; y < height; y += 5) {
            blue.fill(map(noise(x * 0.01, y * 0.01), 0, 1, 0, 255));
            blue.rect(x, y, 5, 5);
        }
    }
    red.noStroke();
    for (let i = 0; i < 800; i++) {
        red.fill(random(100, 255));
        red.ellipse(random(width), random(height), random(2, 8));
    }
}

function radialPatterns() {
    for (let r = 300; r > 0; r -= 20) {
        if (r % 40 == 0) { blue.fill(255); blue.noStroke(); blue.ellipse(width / 2, height / 2, r); }
    }
    red.strokeWeight(3); red.stroke(255);
    for (let a = 0; a < TWO_PI; a += PI / 16) {
        red.line(width/2 + cos(a)*50, height/2 + sin(a)*50, width/2 + cos(a)*250, height/2 + sin(a)*250);
    }
    yellow.fill(255); yellow.noStroke(); yellow.ellipse(width / 2, height / 2, 100);
}

function offsetMisregistration() {
    let shapes = [
        { x: 200, y: 150, w: 120, h: 180 }, { x: 350, y: 200, w: 180, h: 120 },
        { x: 250, y: 350, w: 150, h: 150 }, { x: 450, y: 320, w: 140, h: 200 },
    ];
    blue.fill(255); blue.noStroke();
    for (let s of shapes) blue.rect(s.x - 3, s.y - 3, s.w, s.h);
    red.fill(255); red.noStroke();
    for (let s of shapes) red.rect(s.x, s.y, s.w, s.h);
    yellow.fill(255); yellow.noStroke();
    for (let s of shapes) yellow.rect(s.x + 3, s.y + 3, s.w, s.h);
}

function overlappingShapes() {
    blue.fill(255); blue.noStroke();
    blue.ellipse(250, 200, 300, 400); blue.ellipse(500, 350, 280, 280);
    red.fill(255); red.noStroke();
    red.ellipse(400, 250, 350, 250); red.rect(150, 400, 300, 150, 20);
    yellow.fill(255); yellow.noStroke();
    yellow.ellipse(550, 200, 200, 300); yellow.ellipse(300, 450, 250, 180);
    black.fill(200); black.noStroke(); black.ellipse(400, 300, 80, 80);
}

function dotsStippling() {
    for (let x = 50; x < width - 50; x += 15) {
        for (let y = 50; y < height - 50; y += 15) {
            let p = map(dist(x, y, width/2, height/2), 0, dist(0,0,width/2,height/2), 1, 0);
            if (random() < p) { blue.fill(255); blue.noStroke(); blue.ellipse(x + random(-5,5), y + random(-5,5), random(3,10)); }
        }
    }
    for (let x = 50; x < width - 50; x += 15) {
        for (let y = 50; y < height - 50; y += 15) {
            let p = map(dist(x, y, width/2, height/2), 0, dist(0,0,width/2,height/2), 0, 1);
            if (random() < p) { red.fill(255); red.noStroke(); red.ellipse(x + random(-5,5), y + random(-5,5), random(2,8)); }
        }
    }
}
