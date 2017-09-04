// test om de problemen van de game te vinden

// om alles te laten beginnen
//doAll(20);

selectBest(10, 15);

function fieldSize() {
  return 10;
}


// vanaf hier de functies

function doAll(n) {
  var fields = [];
  for (var k = 0; k < 3; k++) {
    if (k == 0) {
        fields = runGame(n);
    }
    else if (k == 1) {
      printVisual(fields, n);
      calcComplex(fields);
    }
    else {
      //console.log(fields);
    }
  }
}

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
  if (true) {
    for (var i = 0; i < field.length; i++) {
      for (var j = 0; j < field[i].length; j++) {
        field[i][j] = Math.floor(Math.random()+0.5);
      }
    }
  }
  else if (false) {
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

function printVisual(fields, n1) {
  var fields = fields;
  for (var k = 0; k < 3; k++) {
    if (k == 0) {
      var printFields = [];
      for (var q = 0; q < n1; q++) {
        printFields[q] = createField(fieldSize());
      }
      //console.log(printFields);
    }
    else if (k == 1) {
      for (var n = 0; n < fields.length; n++) {
        for (var i = 0; i < fields[n].length; i++) {
          for (var j = 0; j < fields[n][i].length; j++) {
            if (fields[n][i][j] == 1) {
              printFields[n][i][j] = "#";
            }
            else {
              printFields[n][i][j] = " ";
            }
            //console.log(printFields[n][i][j]);
          }
        }
      }
    }
    else {
        console.log(printFields);
        //console.log(fields);
    }
  }
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
      console.log("avg" + avg);
      return avg;
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

function fieldSum(fields, n) {
  var sum1 = fieldSumReduce(fields, n);
  var sum2 = fieldSumOld(fields, n);
  if (sum1 != sum2) {
    console.log(sum1);
    console.log(sum2);
    console.log("kaput");
  }
  else {
    return sum1;
  }
}

function fieldSumOld(fields, n) {
  var sum = 0;
  for (var k = 0; k < 3; k++) {
    if (k == 0) {
      sum = 0;
    }
    else if (k == 1) {
      for (var i = 0; i < fields[n].length; i++) {
        for (var j = 0; j < fields[n][i].length; j++) {
          sum += fields[n][i][j];
        }
      }
    }
    else {
      //console.log("sum " + sum + "n " + n);
      return sum;
    }
  }
}

function complexChange(fields, n) {
  var sum = 0;
      if (n == 0) {
        return 0;
      }
      else if (!(fieldSum(fields, n) > 0)) {
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
        //console.log("sum " + sum + "n " + n);
        return (sum/fieldSum(fields, n));
      }
    }

function complexAvg(complexPart) {
  var avg = 0;
  for (var i = 0; i < complexPart.length; i++) {
    avg += (complexPart[i]/complexPart.length);
  }
  return avg;
}

function fieldSumReduce(fields, n) {
  var x = 0;
  for (var i = 0; i < fields[n].length; i++) {
    x += fields[n][i].reduce(getSum);
  }
  //console.log(x);
  return x;
}

function getSum(total, num) {
  return total + num;
}

function selectBest(n, m) {
  var bestFields = [];
  var test = 1;
  for (var i = 0; i < m; i++) {
    for (var k = 0; k < 4; k++) {
      if (k == 0) {
        var fields = [];
        var complex = 0;
      }
      else if (k == 1) {
          fields = runGame(n);
      }
      else if (k == 2) {
        complex = calcComplex(fields);
      }
      else if (k == 3)  {
        if (bestFields.lenght < 10 || test == 1) {
          var fieldsAndComplex = [fields, complex];
          bestFields.push(fieldsAndComplex);
          test = 2;
          console.log(bestFields+"bestFields.length < 10");
        }
        else if (bestFields.lenght > 9.5) {
          for (var q = 0; q < 2; q++) {
            if (q == 0) {
            //  bestFields.sort(); // dit moet sort op complex
            }
            else if (q == 1) {
              if (bestFields[9][1] < complex) {
                var fieldsAndComplex = [fields, complex];
                bestFields[9] = fieldsAndComplex;
                console.log(fieldsAndComplex);
              }
            }
          }
        }
      }
    }
  }
  console.log(bestFields);
  //console.log(bestFields[0][0]);
  //console.log(bestFields[0][1]);
}
