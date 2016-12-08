const fs = require('fs');
const path = require('path');
const url = require('url');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  let relativePath = url.parse(req.url).pathname;
  let absolutePath = path.join(process.cwd(), relativePath, 'mojo.jpg');
  console.log('Received request for absolutePath: ', absolutePath);

  fs.readFile(absolutePath, (err, data) => {
    console.log('Reading file');
    if (err) {
      console.log('Error reading the file: ', err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error\n');
      return;
    }

    console.log('Serving file');
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data);
    console.log('Done');
  });
});

app.get('/charts/:regionId', (req, res) => {
  console.log('Received request for region id: ' + req.params.regionId);

  let vfrChartModel = JSON.stringify({
    regionName: 'Albuquerque',
    regionId: 'ALB',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: true,
    uniqueId: 0,
  });

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(vfrChartModel);
});

app.get('/charts/:regionId/zip', (req, res) => {
  console.log('Received request for tiles of region id: ' + req.params.regionId);

  let relativePath = url.parse(req.url).pathname;
  let absolutePath = path.join(process.cwd(), 'zip/alb.zip');
  console.log('Received request for absolutePath: ', absolutePath);

  fs.readFile(absolutePath, (err, data) => {
    console.log('Reading file');
    if (err) {
      console.log('Error reading the file: ', err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error\n');
      return;
    }

    console.log('Serving file');
    res.writeHead(200, {'Content-Type': 'application/zip'});
    res.end(data);
    console.log('Done');
  });
});

app.listen(8888, () => {
  console.log('Server listening on port 8888');
});
