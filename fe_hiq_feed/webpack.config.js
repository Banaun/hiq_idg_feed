const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {    
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "file-loader"
      }
    ]
  },
};