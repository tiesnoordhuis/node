/* game of life achtige bedoeling vooral voor testen */

var fs = require("fs");

console.log("eerste regel");

var tilenames = ["true", "nummer", "naam", "waarde", "bestaat"];

var tile1 = {};
tile1[tilenames[1]] = "1";
tile1[tilenames[2]] = "tile1";

//var tile1 = {tilenames[1]:1, tilenames[2]:"tile1", tilenames[3]:50, tilenames[4]:true};
//var tile2 = {tilenames[1]:2, tilenames[2]:"tile2", tilenames[3]:40, tilenames[4]:true};
//var tile3 = {tilenames[1]:3, tilenames[2]:"tile3", tilenames[3]:70, tilenames[4]:true};
//var tile4 = {tilenames[1]:4, tilenames[2]:"tile4", tilenames[3]:20, tilenames[4]:true};
//var tile5 = {tilenames[1]:5, tilenames[2]:"tile5", tilenames[3]:50, tilenames[4]:true};
//var tile6 = {tilenames[1]:6, tilenames[2]:"tile6", tilenames[3]:00, tilenames[4]:false};

var tiles = [tile1, tile2, tile3, tile4, tile5, tile6];

var arr = ["hier1", "hier2"];

console.log(tiles);

console.log(tiles[1]);

console.log(tiles[2]["naam"]);

console.log(tiles["waarde"]);

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

function writeTiles(){
  var string = "";
  for (var i1 = 0; i1 < tiles.length; i1++) {
    for (var i2 = 0; i2 < (tilenames.length - 1); i2++) {
      string +=  tiles[i1][tilenames[i2]];
    }
  }
  return string;
}
