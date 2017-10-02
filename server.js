// server

const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/echo') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      response.write(body);
      console.log(typeof request);
      console.log(request.length);
      response.end(request.rawHeaders.toString());
    });
    console.log(request.headers['accept-language']);
    console.log(request.rawHeaders);
  } else {
    response.write("404");
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log("Server running at http: " + hostname + ":" + port);
});
