/* game of life maar nu echt */

const grid = 7; // de groote van de grid waarop het spel gespeeld wordt

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
        tileTemp[3] = false;
      } else {
        tileTemp[3] = true;
      }
      tile[aantalTiles-1] = tileTemp;
    }
  }
  return tile;
}

var tiles = fillTiles(grid);
//console.log(tiles);

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
//console.log(print);

function printFriendly(print, grid) {
  var gridTemp = grid;
  var printTemp = print;
  for (var i = 0; i < grid; i++) {
    console.log(printTemp[i]);
  }
}

printFriendly(print, grid);

function ageCycle(tiles, grid) {
  var gridTemp = grid;
  var tilesTemp = tiles;
  for (var i1 = 1; i1 < gridTemp-1; i1++) {
    for (var i2 = 1; i2 < gridTemp-1; i2++) {
      var tempTile = [];
      tempTile[0] = ((((i1)*gridTemp)+i2)+1);
      tempTile[1] = tilesTemp[tempTile[0]-1][3];
      tempTile[2] = tilesTemp[tempTile[0]-gridTemp-2][3];
      tempTile[2] += tilesTemp[tempTile[0]-gridTemp-1][3];
      tempTile[2] += tilesTemp[tempTile[0]-gridTemp][3];
      tempTile[2] += tilesTemp[tempTile[0]-1][3];
      tempTile[2] += tilesTemp[tempTile[0]+1][3];
      tempTile[2] += tilesTemp[tempTile[0]+gridTemp-2][3];
      tempTile[2] += tilesTemp[tempTile[0]+gridTemp-1][3];
      tempTile[2] += tilesTemp[tempTile[0]+gridTemp][3];
      console.log(tempTile);
      var tempTile2 = tempTile;
      if (tempTile[1] == true) {
        if (tempTile[2] < 2) {
          tempTile2[1] = false;
        }
        else if (tempTile[2] < 4) {
          tempTile2[1] = true;
        }
        else if (tempTile[2] < 9) {
          tempTile2[1] = false;
        }
        else {
          console.log("err ageCycle fout aantal omgevings blokjes");
        }
      }
      else if (tempTile[1] == false) {
        if (tempTile[2] == 3) {
          tempTile2[1] = true;
        }
      }
      console.log(tempTile2)
    }
  }
}

ageCycle(tiles, grid);
