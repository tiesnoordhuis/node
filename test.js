/* een node js test file voor oefenen */

var fs = require("fs");
var http = require("http");

const file = fs.createWriteStream("file.txt");

<<<<<<< HEAD
<<<<<<< HEAD
fs.readFile("input_test.txt", (err, data) => {
  if (err){
    console.log(err.stack);
    return;
  }
  console.log(data.toString());
=======
=======
>>>>>>> 35866258c4100b177181fb4663d6fd9709224eda
http.get("http://bellwaldchalet.nl/index.html", response => {
  response.pipe(file);
  response.on("end", () => {
    fs.readFile("file.txt", (err, data) => {
      if (err){
        console.log(err.stack);
        return;
      }
      console.log(data.toString());
    });
  });
<<<<<<< HEAD
>>>>>>> 35866258c4100b177181fb4663d6fd9709224eda
=======
>>>>>>> 35866258c4100b177181fb4663d6fd9709224eda
});

var test = "kijken of dit werkt";
