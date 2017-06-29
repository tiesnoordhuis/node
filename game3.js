// test om de problemen van de game te vinden

// om alles te laten beginnen
printVisual(runGame(30));
calcComplex(runGame(30));
function fieldSize() {
  return 10;
}


// vanaf hier de functies

function createField(fieldSize) {
  var field = new Array(fieldSize);
  for (var i = 0; i < field.length; i++) {
    field[i] = new Array(fieldSize);
  }
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
      field[i][j] = 0;
    }
  }
  return field;
}

function populateField(field) {
  if (false) {
    for (var i = 0; i < field.length; i++) {
      for (var j = 0; j < field[i].length; j++) {
        field[i][j] = 0;
      }
    }
  }
  else if (true) {
    field[1][2] = 1;
    field[2][3] = 1;
    field[3][1] = 1;
    field[3][2] = 1;
    field[3][3] = 1;
  }
  return field;
}

function cycleField(field, fieldLifes) {
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
      if (i > 0 && i < (field.length-1)) {
        if (j > 0 && j < (field[i].length-1)) {
          fieldLifes[i][j] = lifes(field, i, j);
        }
      }
    }
  }
  return fieldLifes;
}

function newField(field, fieldLifes, fieldNew) {
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
      if (field[i][j] == 1) {
        if (fieldLifes[i][j] == 2 || fieldLifes[i][j] == 3) {
          fieldNew[i][j] = 1;
        }
        else {
          fieldNew[i][j] = 0;
        }
      }
      else if (field[i][j] == 0) {
          if (fieldLifes[i][j] == 3) {
            fieldNew[i][j] = 1;
          }
          else {
            fieldNew[i][j] = 0;
          }
      }
      else {
        fieldNew[i][j] = 7;
      }
      }
    }
  return fieldNew;
}

function lifes(field, i, j) {
  var lifes = 0;
  lifes = field[i-1][j-1];
  lifes += field[i-1][j];
  lifes += field[i-1][j+1];
  lifes += field[i][j-1];
  lifes += field[i][j+1];
  lifes += field[i+1][j-1];
  lifes += field[i+1][j];
  lifes += field[i+1][j+1];
  return lifes;
}

function runGame(cycles) {
  var fields = [];
  fields[0] = populateField(createField(fieldSize()));
  for (var i = 1; i < cycles; i++) {
    fields[i] = newField(fields[i-1], cycleField(fields[i-1], createField(fieldSize())), createField(fieldSize()));
  }
  return fields;
}

function printVisual(fields) {
  for (var n = 0; n < fields.length; n++) {
    for (var i = 0; i < fields[n].length; i++) {
      for (var j = 0; j < fields[n][i].length; j++) {
        if (fields[n][i][j] == 1) {
          fields[n][i][j] = "#";
        }
        else {
          fields[n][i][j] = " ";
        }
      }
    }
  }
console.log(fields);
}

function calcComplex(fields) {
  //bereken de complexiteit van de serie
  //is een waarde tussen de 0 en 1 waarbij 0 alleen maar nullen is en 1 en constant veranderent veld
  var complexFieldPart = [0];
  var complexChangePart = [0];
  var complexPart = [0];
  for (var n = 0; n < fields.length + 2; n++) {
    if (n < fields.length) {
      complexFieldPart[n] = complexField(fields, n);
      complexChangePart[n] = complexChange(fields, n);
    }
    else if (n == fields.length) {
      for (var i = 0; i < fields.length; i++) {
        var part1 = ((complexFieldPart[i])/3);
        var part2 = ((complexChangePart[i])/1.5);
        complexPart[i] = part1 + part2;
      }
    }
    else if (n == fields.length+1) {
      var avg = complexAvg(complexPart);
      console.log(avg);
    }
  }
}

function complexField(fields, n) {
  for (var k = 0; k < 2; k++) {
    if (k == 0) {
      var complex = 0;
      var max = fields[n].length * fields[n][0].length;
    }
    else {
      complex = fieldSum(fields, n)/max;
    }
  }
  return complex;
}

function fieldSum(field, n) {
  var sum = 0;
  for (var i = 0; i < field[n].length; i++) {
    for (var j = 0; j < field[n][i].length; j++) {
      sum += field[n][i][j];
    }
  }
  return sum;
}

function complexChange(fields, n) {
  for (var k = 0; k < 2; k++){
    if (k == 0) {
      var sum = 0;
    }
    else {
      if (n == 0) {
        return 0;
      }
      else {
        for (var i = 0; i < fields[n].length; i++) {
          for (var j = 0; j < fields[n][i].length; j++) {
            if (fields[n][i][j] == 1) {
              if (fields[n-1][i][j] == 0) {
                sum += 1;
              }
            }
          }
        }
        return (sum/fieldSum(fields, n));
      }
    }
  }
}

function complexAvg(complexPart) {
  var avg = 0;
  for (var i = 0; i < complexPart.length; i++) {
    avg += (complexPart[i]/complexPart.length);
  }
  return avg;
}
