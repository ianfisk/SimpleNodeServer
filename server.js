const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

console.log('Starting server listening on port 8888.');
http.createServer((req, res) => {
  let relativePath = url.parse(req.url).pathname;
  let absolutePath = path.join(process.cwd(), relativePath, 'mojo.jpg');
  console.log('Received request for absolutePath: ', absolutePath);

  fs.readFile(absolutePath, (err, data) => {
    console.log('Reading file');
    if (err) {
      console.log('Error reading the file: ', err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error\n');
    }

    console.log('Serving file');
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data);
    console.log('Done');
  });
}).listen(8888);
