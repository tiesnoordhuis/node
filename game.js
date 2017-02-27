/* game of life maar nu echt */

function fillTiles(grid) {
  var tile = [];
  for (var i1 = 1; i1 <= grid; i1++) {
    for (var i2 = 1; i2 <= grid; i2++) {
      var aantalTiles = (((i1 - 1) * grid) + i2);
      var tileTemp = [];
      tileTemp[0] = aantalTiles;
      tileTemp[1] = i1;
      tileTemp[2] = i2;
        if (Math.random() < 0.6) {
        tileTemp[3] = true;
      } else {
        tileTemp[3] = false;
      }
      tile[aantalTiles-1] = tileTemp;
    }
  }
  return tile;
}


function printTiles(tiles, grid) {
  var tilesTemp = tiles;
  var gridTemp = grid;
  var print = [];
  var aantalTiles = tiles[tiles.length-1][0];
  for (var i2 = 0; i2 < grid; i2++) {
    var printTemp =[];
    for (var i3 = 0; i3 < grid; i3++) {
      var i4 = ((i2*gridTemp)+i3+1)
      if (tilesTemp[i4-1][3] == true) {
        printTemp.push(1);
      }
      else if (tilesTemp[i4-1][3] == false) {
        printTemp.push(0);
      }
      else {
        console.log("err");
      }
    }
    print[i2] = printTemp;
  }
  return print;
}


function printFriendly(print, grid) {
  var gridTemp = grid;
  var printTemp = print;
  for (var i = 0; i < grid; i++) {
    console.log(printTemp[i]);
  }
}

function ageCycle(tiles, grid) {
  var tilesPre = tiles;
  console.log(tilesPre);
  var tilesPost = tiles;
  var tilePre = [];
  var tilePost = [];
  for (var i1 = 2; i1 < grid; i1++) {
    for (var i2 = 2; i2 < grid; i2++) {
      tilePre = [];
      tilePost = [];
      tilePre[0] = ((((i1-1)*grid)+i2));
      tilePre[1] = tilesPre[(tilePre[0]-1)][3];
      tilePre[2] = 0;
      tilePre[2] += tilesPre[(tilePre[0]-1-grid-1)][3] + tilesPre[(tilePre[0]-1-grid)][3] + tilesPre[(tilePre[0]-1-grid+1)][3] + tilesPre[(tilePre[0]-2)][3] + tilesPre[(tilePre[0])][3] + tilesPre[(tilePre[0]-1+grid-1)][3] + tilesPre[(tilePre[0]-1+grid)][3] + tilesPre[(tilePre[0]-1+grid+1)][3];
      console.log(tilePre[2]);
      tilePost[0] = tilePre[0];
      tilePost[1] = tilePre[1];
      tilePost[2] = tilePre[2];
      if (tilePost[1] == true) {
        if (tilePost[2] == 2 || tilePost[2] == 3) {
          tilePost[3] = true;
        }
        else {
          tilePost[3] = false;
        }
      }
      else if (tilePost[1] == false) {
        if (tilePost[2] == 3) {
          tilePost[3] = true;
        }
        else {
          tilePost[3] = false;
        }
      }
      else {
        console.log("err");
      }
      tilesPost[(tilePost[0]-1)][3] = tilePost[3];
    }
  }
  //console.log(tilesPost);
  console.log(tilesPre);
  return tilesPost;
}

function printAge(n, print, tiles) {
  var tiles2 = [];
  var print2 = [print];
  for (var i = 0; i < n; i++) {
  tiles2[i] = ageCycle(tiles, grid);
  print2[i+1] = printTiles(tiles2[i], grid);
  printFriendly(print2[i], grid);
  console.log("-----------------------------")
  printFriendly(print2[i+1], grid);
  console.log(" ");
  //console.log(tiles2[tiles2.length-1]);
  tiles =  tiles2[tiles2.length-1];
  }
}

const grid = 7; // de grootte van de grid waarop het spel gespeeld wordt

function doAll() {



var tiles = fillTiles(grid);
//console.log(tiles);

var print = printTiles(tiles, grid);
//console.log(print);


printAge(5, print, tiles);
//printFriendly(printTiles(tiles, grid),grid);
//console.log(tiles);
}


doAll();
