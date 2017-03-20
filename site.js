//site
const http = require("http");
const net = require('net');
const url = require('url');
const fs = require("fs");

var port = "8000";
var hostname = "localhost"
var a = "0";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type","text/html");
  a = counter(a);
  res.write(a);
  setTimeout(() => {
    res.end(" World");},2000);
});

server.listen(port, hostname, () =>{
  console.log("server started on "+hostname+":"+port );
});

function counter(a) {
  return a+1;
};
