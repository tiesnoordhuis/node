/* game of life maar nu echt */

const grid = 6; // de groote van de grid waarop het spel gespeeld wordt

function fillTiles(grid) {
  var tile = [];
  for (var i1 = 1; i1 <= grid; i1++) {
    for (var i2 = 1; i2 <= grid; i2++) {
      var aantalTiles = (((i1 - 1) * grid) + i2);
      var tileTemp = [];
      tileTemp[0] = aantalTiles;
      tileTemp[1] = i1;
      tileTemp[2] = i2;
        if (Math.random() < 0.7) {
        tileTemp[3] = true;
      } else {
        tileTemp[3] = true;
      }
      tile[aantalTiles-1] = tileTemp;
    }
  }
  return tile;
}

var tiles = fillTiles(grid);
console.log(tiles);

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

var print = printTiles(tiles, grid);
console.log(print);
printFriendly(print, grid);
ageCycle(tiles, grid);

function printFriendly(print, grid) {
  var gridTemp = grid;
  var printTemp = print;
  for (var i = 0; i < grid; i++) {
    console.log(printTemp[i]);
  }
}

function ageCycle(tiles, grid) {
  var tilesPre = tiles;
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
      tilePre[2] += tilesPre[(tilePre[0]-1)-][3]
    }
  }
}

function ageCycleOld(tiles, grid) {
  var gridTemp = grid;
  var tilesTemp = tiles;
  var tilesTemp2 = tiles;
  var tilesTemp3 = tiles;
  for (var i1 = 1; i1 < gridTemp-1; i1++) {
    for (var i2 = 1; i2 < gridTemp-1; i2++) {
      var tempTile = [];
      var tempTile2 = [];
      console.log(tilesTemp);
      tempTile[0] = ((((i1)*gridTemp)+i2)+1);
      tempTile[1] = tilesTemp[tempTile[0]-1][3];
      tempTile[2] = 0;
      tempTile[2] += tilesTemp[tempTile[0]-gridTemp-2][3];
      console.log(tilesTemp[tempTile[0]-gridTemp-2][3]);
      tempTile[2] += tilesTemp[tempTile[0]-gridTemp-1][3];
      console.log(tilesTemp[tempTile[0]-gridTemp-1][3]);
      tempTile[2] += tilesTemp[tempTile[0]-gridTemp][3];
      console.log(tilesTemp[tempTile[0]-gridTemp][3]);
      tempTile[2] += tilesTemp[tempTile[0]-2][3];
      console.log(tilesTemp[tempTile[0]-2][3]);
      tempTile[2] += tilesTemp[tempTile[0]][3];
      console.log(tilesTemp[tempTile[0]][3]);
      tempTile[2] += tilesTemp[tempTile[0]+gridTemp-2][3];
      console.log(tilesTemp[tempTile[0]+gridTemp-2][3]);
      tempTile[2] += tilesTemp[tempTile[0]+gridTemp-1][3];
      console.log(tilesTemp[tempTile[0]+gridTemp-1][3]);
      tempTile[2] += tilesTemp[tempTile[0]+gridTemp][3];
      console.log(tilesTemp[tempTile[0]+gridTemp][3]);
      tilesTemp3[tempTile[0]] = tempTile;
      console.log(tilesTemp3);
      tempTile2 = tempTile;
      if (tempTile[1] == true) {
        if (tempTile[2] == 2) {
          tempTile2[1] = true;
        }
        else if (tempTile[2] == 3) {
          tempTile2[1] = true;
        }
        else {
          tempTile2[1] = false;
        }
      }
      else if (tempTile[1] == false) {
        if (tempTile[2] == 3) {
          tempTile2[1] = true;
        }
      }
      tilesTemp2[tempTile2[0]-1][3] = tempTile2[1];
      //console.log(tilesTemp2[tempTile2[0]-1]);
    }
  }
  //console.log(tilesTemp2);
  return tilesTemp2;
}

function printAge(n) {
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

//printAge(1);
//printFriendly(printTiles(tiles, grid),grid);
//console.log(tiles);
