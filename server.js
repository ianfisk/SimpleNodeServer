#!/usr/bin/env node

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

app.get('/charts/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify([
      {
        regionName: 'Albuquerque',
        regionId: 'ALB',
        publicationDate: new Date('2016-01-29'),
        expirationDate: new Date('2016-12-05'),
        revisionNumber: 0,
      },
      {
        regionName: 'Seattle',
        regionId: 'SEA',
        publicationDate: new Date('2016-01-29'),
        expirationDate: new Date('2016-12-05'),
        revisionNumber: 0,
      }
    ]));
});

app.get('/charts/:regionId', (req, res) => {
  let regionId = req.params.regionId.toLowerCase();
  console.log('Received request for region id: ' + regionId);

  let vfrChartModel;
  if (regionId === 'sea') {
    vfrChartModel = JSON.stringify({
      regionName: 'Seattle',
      regionId: 'SEA',
      publicationDate: new Date('2016-01-29'),
      expirationDate: new Date('2016-12-05'),
      revisionNumber: 0,
    });
  } else {
    vfrChartModel = JSON.stringify({
      regionName: 'Albuquerque',
      regionId: 'ALB',
      publicationDate: new Date('2016-01-29'),
      expirationDate: new Date('2016-12-05'),
      revisionNumber: 0,
    });
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(vfrChartModel);
});

app.get('/charts/:regionId/zip', (req, res) => {
  let regionId = req.params.regionId.toLowerCase();
  console.log('Received request for tiles of region id: ' + regionId);

  let absolutePath = path.join(process.cwd(), `zip/${regionId}.zip`);
  console.log('Received request for absolutePath: ', absolutePath);

  fs.readFile(absolutePath, (err, data) => {
    console.log('Reading file');
    if (err) {
      console.log('Error reading the file: ', err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error\n');
      return;
    }

    const contentLength = fs.statSync(absolutePath).size;

    console.log('Serving file');
    res.writeHead(200,
    {
      'Content-Type': 'application/zip',
      'Content-Length': contentLength,
    });
    res.end(data);
    console.log('Done');
  });
});

app.listen(8888, () => {
  console.log('Server listening on port 8888');
});
