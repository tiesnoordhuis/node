/* een node js test file voor oefenen */

var fs = require("fs");
var http = require("http");

const file = fs.createWriteStream("file.txt");

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
});

var test = "kijken of dit werkt";
