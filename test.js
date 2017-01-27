/* een node js test file voor oefenen */

var fs = require("fs");
var data = fs.readFile("input_test.txt", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    console.log(data.toString());

  }
});


console.log("Program Ended");
