const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {    
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "file-loader",
        options: {
            name: '[path][name].[ext]'
          } 
      }
    ]
  },
};