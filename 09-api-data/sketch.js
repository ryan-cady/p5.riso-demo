// Demo 09: Live API Data
// loadJSON() fetches a URL and automatically parses the response as JSON.
// Here we pull a Pokémon's base stats from the PokéAPI and use them
// to drive a two-layer RISO grid: pink circles on one layer, blue squares on another.
//
// Each Pokémon has wildly different stats — the same code produces a
// completely different print for each one.
//
// Press 1–5 to load a different Pokémon.
// Press "e" to export layers as PNGs.

let pokemon = null;
let pink, blue;
let loading = false;

// Five Pokémon chosen for very different stat profiles
const names = ["bulbasaur", "snorlax", "jolteon", "mewtwo", "dragonite"];

function preload() {
  // loadJSON() fetches a URL and parses the response as a JavaScript object.
  // When used inside preload(), p5 pauses setup() until the fetch completes.
  pokemon = loadJSON("https://pokeapi.co/api/v2/pokemon/bulbasaur");
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  noLoop();
  textFont("monospace");
  pink = new Riso("fluorescentpink");
  blue = new Riso("blue");
}

function draw() {
  background(245, 240, 232);
  clearRiso();

  if (loading) {
    fill(30);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text("fetching...", width / 2, height / 2);
    return;
  }

  // --- Read stats from the JSON response ---
  // pokemon.stats is an array. Each element looks like:
  //   { base_stat: 45, stat: { name: "hp" } }
  // We use a helper to find a stat by name (see getStat below).
  let hp      = getStat("hp");        // 1–255
  let attack  = getStat("attack");    // 5–190
  let defense = getStat("defense");   // 5–230
  let speed   = getStat("speed");     // 5–180

  // --- Map each stat to a visual parameter ---
  let cols     = floor(map(speed,   5, 180,  3, 10));  // fast Pokémon → dense grid
  let pinkSize = map(attack,  5, 190,  8, 56);          // strong attack → big circles
  let blueSize = map(defense, 5, 230,  6, 48);          // high defense → big squares
  let angle    = map(hp,      1, 255,  0, HALF_PI);     // high HP → strong rotation

  let cellW = width / cols;
  let cellH = height / cols;

  // --- Pink layer: grid of filled circles ---
  // Circles are centered in each grid cell
  pink.noStroke();
  pink.fill(220);  // 220 out of 255 = mostly opaque
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < cols; r++) {
      let x = (c + 0.5) * cellW;
      let y = (r + 0.5) * cellH;
      pink.circle(x, y, pinkSize);
    }
  }

  // --- Blue layer: offset grid of rotated squares ---
  // Offset by one full cell so squares fall between the pink circles
  blue.noStroke();
  blue.fill(200);
  blue.rectMode(CENTER);
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < cols; r++) {
      let x = (c + 1) * cellW;  // half-cell offset from pink
      let y = (r + 1) * cellH;
      blue.push();
      blue.translate(x, y);
      blue.rotate(angle);
      blue.rect(0, 0, blueSize, blueSize);
      blue.pop();
    }
  }

  drawRiso();

  // --- Labels ---
  fill(30);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text(
    pokemon.name.toUpperCase() +
    "   hp:" + hp + "  atk:" + attack + "  def:" + defense + "  spd:" + speed,
    10, 10
  );
  textAlign(LEFT, BOTTOM);
  text("1=bulbasaur  2=snorlax  3=jolteon  4=mewtwo  5=dragonite", 10, height - 10);
}

// Helper: find a stat value by name in the stats array
// The API returns stats as an array, not a plain object — so we loop to find the right one
function getStat(name) {
  for (let s of pokemon.stats) {
    if (s.stat.name === name) return s.base_stat;
  }
  return 50; // fallback if stat name not found
}

function keyReleased() {
  // Keys 1–5: fetch a different Pokémon using loadJSON() with a success callback.
  // The callback runs when the request finishes — not immediately.
  let idx = int(key) - 1;
  if (idx >= 0 && idx < names.length) {
    loading = true;
    redraw(); // show "fetching..." while we wait
    loadJSON(
      "https://pokeapi.co/api/v2/pokemon/" + names[idx],
      function(data) {  // this runs when the request completes
        pokemon = data;
        loading = false;
        redraw();
      }
    );
  }
  if (key == "e") exportRiso();
}
