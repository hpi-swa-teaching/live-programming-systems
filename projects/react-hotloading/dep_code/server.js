// -----------
// EXPRESS SETUP
// -----------
var path         = require('path');
var express      = require('express');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port         = isDeveloping ? 8000 : process.env.PORT;
var app          = express();
var http         = require('http').Server(app);
var router       = require('./private/router.js')(app)

if (isDeveloping) {
  var webpack              = require('webpack');
  var webpackMiddleware    = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config               = require('./webpack.config.js');

  var compiler   = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  // app.enable('strict routing')
  // app.all('/board', function(req, res) { res.redirect('/board/') })
  app.use('/board', express.static(__dirname + '/dist'));
  app.get(/.*favicon\.png/, function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/favicon.png'));
  });
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

http.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Listening on port %s.', port);
});
