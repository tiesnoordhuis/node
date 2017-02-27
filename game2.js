// test om de problemen van de game te vinden

// om alles te laten beginnen
runGame(5, 5, "file");



// vanaf hier de functies

//grid voor groote van het bord
//cycle voor het aantal cycles dat de game moet lopen
// dist voor de distributie van het bord
function runGame(grid, cycle, dist) {
  console.log("de game wordt " + cycle + " keer gedraait met een lijn van " + grid + " blokjes.");
  if (dist === "random") {
    console.log("de blokjes zijn random 1 of 0 gemaakt.");
  }

  else if (dist === "file") {
    console.log("de blokjes komen uit een file.");
  }

  var bord = maakBord(grid, dist);
  console.log(bord);
  runCycle(bord, cycle, grid);

}

function maakBord(grid, dist) {
  var bord = [];
  if (dist === "random") {
    bord = maakBordRandom(grid);
  }
  else if (dist === "file") {
    maakBordFile();
  }
  else {
    console.log("err, geen geldige distributie in maakBord");
  }
  return bord;
}

function maakBordRandom(grid) {
  var bord = [];
  for (var i = 0; i < grid; i++) {
    if (Math.random() < 0.5) {
      bord[i] = 0;
    }
    else {
      bord[i] = 1
    }
  }
  return bord;
}

function maakBordFile() {
  console.log("deze functie is nog niet af");
  var data = loadFile();
}

function runCycle(bord, cycle, grid) {
  if (bord.length != grid) {
    console.log("de groote van het bord en grid komen niet overeen");
    return
  }
  for (var i = 0; i < cycle; i++) {
    var bordTemp1 = [];
    var bordTemp2 = [];
    var bordTemp = [];
    for (var i = 0; i < grid; i++) {
      bordTemp1[i] = bord[i+1];
    }
    bordTemp1[bordTemp1.length-1] = bord[0];
    for (var i = 0; i < grid; i++) {
      bordTemp2[i] = bord[i-1];
    }
    bordTemp2[0] = bord[bord.length-1];
    //console.log(bordTemp1);
    //console.log(bordTemp2);
    for (var i = 0; i < grid; i++) {
      bordTemp[i] = bordTemp1[i] + bordTemp2[i];
    }
    console.log(bordTemp);
  }

}

function loadFile() {
  var fs = require("fs");
  var data = fs.readFile("input_test.txt", (err, data) => {
    if (err) {
      return console.error(err);
    }
    else {
      
      console.log(data.toString());

    }
  });
}
