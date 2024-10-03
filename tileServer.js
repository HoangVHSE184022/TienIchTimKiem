const express = require('express');
const MBTiles = require('@mapbox/mbtiles');
const path = require('path');

const app = express();
const port = 3000;

const mbtilesPath = path.join('D:', 'a.mbtiles');

new MBTiles(mbtilesPath, (err, mbtiles) => {
  if (err) {
    console.error('Error opening MBTiles file:', err);
    return;
  }

  console.log('MBTiles file opened successfully');

  mbtiles.getInfo((err, info) => {
    if (err) {
      console.error('Error getting MBTiles info:', err);
    } else {
      console.log('MBTiles info:', info);
    }
  });

  app.get('/:z/:x/:y.png', (req, res) => {
    const { z, x, y } = req.params;
    console.log(`Requested tile: ${z}/${x}/${y}`);

    mbtiles.getTile(parseInt(z), parseInt(x), parseInt(y), (err, tile, headers) => {
      if (err) {
        console.error(`Error getting tile ${z}/${x}/${y}:`, err);
        res.status(404).send('Tile not found');
        return;
      }

      console.log(`Serving tile: ${z}/${x}/${y}, size: ${tile.length} bytes`);
      if (tile.length < 100) {  
        console.warn(`Warning: Small tile size for ${z}/${x}/${y}: ${tile.length} bytes`);
      }

      res.set(headers);
      res.send(tile);
    });
  });

  app.get('/check-tables', (req, res) => {
    const tables = [{ name: 'tiles' }, { name: 'metadata' }];

    const checkPromises = tables.map(table => {
      return new Promise((resolve, reject) => {
        mbtiles._db.all(`SELECT * FROM ${table.name} LIMIT 1;`, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve({ table: table.name, sample: rows });
          }
        });
      });
    });

    Promise.all(checkPromises)
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.error('Error checking table contents:', err);
        res.status(500).json({ error: 'Error checking table contents' });
      });
  });

  app.listen(port, () => {
    console.log(`Tile server running at http://localhost:${port}`);
    console.log(`Serving tiles from: ${mbtilesPath}`);
  });
});
