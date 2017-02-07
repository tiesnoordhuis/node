/* game of life achtige bedoeling vooral voor testen */

var fs = require("fs");

console.log("eerste regel");

var tileNames = ["nummer", "naam", "waarde", "bestaat"];
var tileNummer = [1, 2, 3, 4, 5, 6];
var tileNaam = ["title1", "title2", "title3", "title4", "title5", "title6"];
var tileWaarde = [50, 40, 70, 20, 50, 00];
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

//var tile1 = {tilenames[1]:1, tilenames[2]:"tile1", tilenames[3]:50, tilenames[4]:true};
//var tile2 = {tilenames[1]:2, tilenames[2]:"tile2", tilenames[3]:40, tilenames[4]:true};
//var tile3 = {tilenames[1]:3, tilenames[2]:"tile3", tilenames[3]:70, tilenames[4]:true};
//var tile4 = {tilenames[1]:4, tilenames[2]:"tile4", tilenames[3]:20, tilenames[4]:true};
//var tile5 = {tilenames[1]:5, tilenames[2]:"tile5", tilenames[3]:50, tilenames[4]:true};
//var tile6 = {tilenames[1]:6, tilenames[2]:"tile6", tilenames[3]:00, tilenames[4]:false};

var tiles = [tile1, tile2, tile3, tile4, tile5, tile6];

console.log(tileNames);

console.log(tile2);

console.log(tiles);

/*
var inputData = fs.readFile("ties.txt", (err, inputData) => {
  if (err) {
    return console.error(err);
  }
  else {
    console.log(inputData.toString());
  }
});

fs.writeFile('ties2.txt', writeTiles(), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

/*function writeTiles(){
  var string = "";
  for (var i1 = 0; i1 < tiles.length; i1++) {
    for (var i2 = 0; i2 < (tileNames.length); i2++) {
      string +=  tiles[i1][tileNames[i2]];
    }
  }
  return string;
}
*/
