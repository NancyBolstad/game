const browserify = require('browserify');
const tsify = require('tsify');

browserify()
  .add('src/index.ts')
  .plugin(tsify, { target: 'es6' })
  .bundle()
  .on('error', function(error) {
    console.error(error.toString());
  })
  .pipe(process.stdout);
