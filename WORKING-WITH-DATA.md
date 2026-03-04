# Working with Data in p5.js
## CSV, Randomization & JSON/APIs

---

## Part 1: CSV with `loadTable()`

Upload your `.csv` file to the p5 editor, then load it in `preload()`.

### Load the table

```javascript
let data;

function preload() {
  data = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 400);
  console.log(data.getRowCount());   // number of rows
  console.log(data.getColumnCount()); // number of columns
}
```

### Read a single value

```javascript
let city = data.getString(0, 'city'); // text value
let temp = data.getNum(0, 'temp');    // numeric value
```

### Loop through all rows and draw

```javascript
let inkA;
let inkB;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  background(240);

  inkA = new Riso('fluorescentpink');
  inkB = new Riso('blue');

  let rowCount = data.getRowCount();

  for (let i = 0; i < rowCount; i++) {
    let temp     = data.getNum(i, 'temp');
    let humidity = data.getNum(i, 'humidity');

    let x       = map(temp, 20, 80, 50, 550);
    let d       = map(humidity, 40, 90, 20, 100);
    let opacity = map(temp, 20, 80, 60, 220);

    let ink = (i % 2 === 0) ? inkA : inkB;
    ink.noStroke();
    ink.fill(opacity);
    ink.circle(x, 200, d);
  }

  drawRiso();
}
```

---

## Part 2: Randomizing Data with `shuffle()` and `randomSeed()`

### Sample a random subset of rows

```javascript
function setup() {
  createCanvas(600, 400);
  pixelDensity(1);

  inkA = new Riso('fluorescentpink');
  inkB = new Riso('blue');

  drawComposition();
}

function drawComposition() {
  background(240);
  clearRiso();

  let rowCount = data.getRowCount();

  // Build array of row indices and shuffle
  let indices = [];
  for (let i = 0; i < rowCount; i++) indices.push(i);
  indices = shuffle(indices);

  // Take a random sample of 10
  let sample = indices.slice(0, 10);

  for (let i = 0; i < sample.length; i++) {
    let row     = sample[i];
    let val     = data.getNum(row, 'temp');

    let x       = map(i, 0, sample.length, 40, width - 40);
    let barH    = map(val, 20, 80, 10, 300);
    let opacity = map(val, 20, 80, 60, 220);

    let ink = (i % 2 === 0) ? inkA : inkB;
    ink.noStroke();
    ink.fill(opacity);
    ink.rect(x - 25, height - barH - 20, 50, barH);
  }

  drawRiso();
}

// Press SPACE for a new composition
function keyPressed() {
  if (key === ' ') drawComposition();
}
```

### Lock a composition with `randomSeed()`

```javascript
let currentSeed;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);

  inkA = new Riso('fluorescentpink');
  inkB = new Riso('blue');

  currentSeed = floor(random(10000));
  drawComposition();
}

function drawComposition() {
  background(240);
  clearRiso();

  // Same seed = same shuffle = same composition
  randomSeed(currentSeed);

  let rowCount = data.getRowCount();
  let indices = [];
  for (let i = 0; i < rowCount; i++) indices.push(i);
  indices = shuffle(indices);
  let sample = indices.slice(0, 10);

  for (let i = 0; i < sample.length; i++) {
    let row     = sample[i];
    let val     = data.getNum(row, 'temp');

    let x       = map(i, 0, sample.length, 40, width - 40);
    let barH    = map(val, 20, 80, 10, 300);
    let opacity = map(val, 20, 80, 60, 220);

    let ink = (i % 2 === 0) ? inkA : inkB;
    ink.noStroke();
    ink.fill(opacity);
    ink.rect(x - 25, height - barH - 20, 50, barH);
  }

  drawRiso();

  // Display seed so you can recreate this composition
  fill(80);
  noStroke();
  textSize(11);
  textAlign(LEFT);
  text('seed: ' + currentSeed, 10, height - 10);
}

// Press SPACE for a new seed
function keyPressed() {
  if (key === ' ') {
    currentSeed = floor(random(10000));
    drawComposition();
  }
}
```

---

## Part 3: JSON & APIs with `loadJSON()`

### Load from a public API

```javascript
let pokemon;

function preload() {
  pokemon = loadJSON('https://pokeapi.co/api/v2/pokemon/pikachu');
}

function setup() {
  createCanvas(400, 400);
  console.log(pokemon);              // full object
  console.log(pokemon.name);         // "pikachu"
  console.log(pokemon.weight);       // 60
  console.log(pokemon.stats);        // array of stat objects
  console.log(pokemon.stats[0].base_stat);   // first stat value
  console.log(pokemon.stats[0].stat.name);   // "hp"
}
```

### Draw stats as a bar chart with RISO inks

```javascript
let inkA;
let inkB;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  background(240);

  inkA = new Riso('fluorescentpink');
  inkB = new Riso('blue');

  let stats = pokemon.stats;

  for (let i = 0; i < stats.length; i++) {
    let statValue = stats[i].base_stat;

    let x       = map(i, 0, stats.length, 40, width - 40);
    let barH    = map(statValue, 0, 255, 10, 300);
    let opacity = map(statValue, 0, 255, 60, 220);

    let ink = (i % 2 === 0) ? inkA : inkB;
    ink.noStroke();
    ink.fill(opacity);
    ink.rect(x - 25, height - barH - 20, 50, barH);
  }

  drawRiso();

  fill(30);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text(pokemon.name.toUpperCase(), width / 2, 20);
}
```

### Load a different Pokémon on click

```javascript
let pokemon;
let names = ['bulbasaur', 'charmander', 'squirtle', 'pikachu', 'gengar', 'snorlax'];
let current = 0;

function preload() {
  pokemon = loadJSON('https://pokeapi.co/api/v2/pokemon/' + names[current]);
}

function mousePressed() {
  current = (current + 1) % names.length;
  loadJSON('https://pokeapi.co/api/v2/pokemon/' + names[current], (data) => {
    pokemon = data;
    redraw();
  });
}
```

---

## The `map()` Formula

```javascript
// map(value, dataMin, dataMax, visualMin, visualMax)

let x       = map(value, 0, 255,  40, width - 40);  // position
let barH    = map(value, 0, 255,  10, 300);          // height
let opacity = map(value, 0, 255,  60, 220);          // RISO ink density
let count   = map(value, 0, 255,   1,  10);          // repetition
```

---

## Reference

- [p5.js `loadTable()`](https://p5js.org/reference/p5/loadTable/)
- [p5.js `loadJSON()`](https://p5js.org/reference/p5/loadJSON/)
- [p5.js `shuffle()`](https://p5js.org/reference/p5/shuffle/)
- [p5.js `randomSeed()`](https://p5js.org/reference/p5/randomSeed/)
- [p5.js `map()`](https://p5js.org/reference/p5/map/)
- [PokéAPI](https://pokeapi.co/)
- [CSV → JSON converter](https://csvjson.com/csv2json)
- [p5.riso docs](https://antiboredom.github.io/p5.riso/)
