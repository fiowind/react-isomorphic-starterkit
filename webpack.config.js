
var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var webpackConfig = {
  console: false,
  entry : [
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/'
  },
  exclude: /(node_modules|bower_components)/,
  plugins: [
  "add-module-exports",
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
};
if (process.env.NODE_ENV === 'production') {

  webpackConfig = merge(webpackConfig,{
    devtool: "source-map",
    console: false,
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
    ]},
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin("app.css"),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]  
  });

}else{

  webpackConfig = merge(webpackConfig,{
    devtool: 'cheap-module-eval-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
              presets: ["react-hmre","es2015", "stage-0", "react"],
              plugins: ["transform-decorators-legacy"],
          }
        },
        { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
        { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]},
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.development || 'development')
        }
      })
    ]  
  });
  
}

module.exports = webpackConfig;