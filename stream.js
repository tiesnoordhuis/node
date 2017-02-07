var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('input_test.txt');

// Set the encoding to be utf8.
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', (chunk) => {
   data += chunk;
});

readerStream.on('end',() =>{
   console.log(data);
});

readerStream.on('error', (err) => {
   console.log(err.stack);
});

console.log("Program Ended");
