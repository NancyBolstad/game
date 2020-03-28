const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler(['src/index.html', 'src/game.html', 'src/winner.html']);
const app = express();

app.get('/', (req, res, next) => {
  req.url = '/index.html';
  app._router.handle(req, res, next);
});

app.use(bundler.middleware());

const port = Number(9000);
app.listen(port);
console.log(`Server is listening at http://localhost:${port}`);

/* Parcel-bundler bug: Index.html can not be omitted when serving multiple files
    code: https://github.com/parcel-bundler/parcel/issues/1315  */
