//node host website nana

const http = require('http');
const fs = require("fs");

const hostname = '192.168.2.232';
const port = 10000;

fs.readFile("../nana/website.html", (err, html) => {
  if (err){
    throw err;
  }

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type","text/html");
    res.write(html);
    res.end();
  });

  server.listen(port, hostname, () =>{
    console.log("server started on "+hostname+":"+port );
  });

});
