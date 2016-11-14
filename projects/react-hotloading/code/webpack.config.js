const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/js/main.jsx'),
  ],
  output: {
    path: path.join(process.cwd(), '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ExtractTextPlugin('main.css', { allChunks: true }),
  ],
  resolve: {
      modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './node_modules'),
          'bower_components',
          path.resolve(__dirname, './bower_components')
      ],
      extensions: ['', '.jsx', '.js', '.json', '.scss', '.css'],
  },
  module: {
    loaders: [
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    }, {
      test: /\.json$/,
      loader: 'json',
    },
    {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/',
    },
    {
      test: /\.woff(2)?(\?.*$|$)/,
      loader: 'url-loader?name=[name].[ext]&limit=10000&minetype=application/font-woff',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    },
    {
      test: /\.(eot|svg|png|jpg|ico)(\?.*$|$)/,
      loader: 'file?name=[name].[ext]',
    }],
  }
};
