/* game of life achtige bedoeling vooral voor testen */

var fs = require("fs");

console.log("eerste regel");

var tileNames = ["nummer", "naam", "waarde", "bestaat"];
var tileNummer = [1, 2, 3, 4, 5, 6];
var tileNaam = ["title1", "title2", "title3", "title4", "title5", "title6"];
var tileWaarde = [55, 40, 70, 20, 50, 00];
var tileBestaat = [true, true, true, true, true, false];
var tileProperties = [tileNummer, tileNaam, tileWaarde, tileBestaat];

function tile(n) {
  var tile = {};
  for (var i = 0; i < tileNames.length; i++) {
    tile[tileNames[i]] = tileProperties[i][n];
  }
  return tile;
}

var tile1 = tile(0);
var tile2 = tile(1);
var tile3 = tile(2);
var tile4 = tile(3);
var tile5 = tile(4);
var tile6 = tile(5);
var tiles = [tile1, tile2, tile3, tile4, tile5, tile6];

console.log(tileNames);

console.log(tileProperties);

console.log(tiles);

console.log(tiles[3]["waarde"]);

var inputData = fs.readFile("ties.txt", (err, inputData) => {
  if (err) {
    return console.error(err);
  }
  else {
    console.log(inputData.toString());
  }
});

fs.writeFile('ties2.txt', writeTiles(), "utf8", (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

function writeTiles(){
  var string = "";
  for (var i1 = 0; i1 < tiles.length; i1++) {
    for (var i2 = 0; i2 < (tileNames.length); i2++) {
      string +=  tiles[i1][tileNames[i2]] + " , ";
    }
  string += "\r\n";
  }
  return string;
}

function ageCycle() {
  var waardeNu = [];
  var waardeNuExtended = [];
  for (var i = 0; i < tiles.length; i++) {
    waardeNu[i] = tiles[i]["waarde"];
    waardeNuExtended[i] = tiles[i]["waarde"];
  }
  var temp = waardeNu[waardeNu.length-1];
  waardeNuExtended.splice(0,0,temp);
  waardeNuExtended.push(waardeNu[0]);
  var waardeNuRest = [];
  for (var i = 0; i < tiles.length; i++) {
    waardeNuRest[i] = ((waardeNuExtended[i] + waardeNuExtended[i+2])/2);
  }
  for (var i = 0; i < waardeNu.length; i++) {
    if (waardeNu[i] <= waardeNuRest[i]) {
      console.log("if statement: "+ waardeNu[i] +" "+ waardeNuRest[i]);
      waardeNu[i] ++;
    }
    else {
      waardeNu[i] --;
    }
  }
  console.log("waardeNu: "+waardeNu);
  return waardeNu;
}

function doCycle() {
for (var i = 0; i < tiles.length; i++) {
  var waardeNu = ageCycle();
  tiles[i]["waarde"] = waardeNu[i];
  if (i == tiles.length-1) {
    console.log(tiles);
  }
}
}

for (var i = 0; i < 200; i++) {
  doCycle();
}
