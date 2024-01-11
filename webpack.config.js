const path = require('path');

module.exports = {
  entry: './src/codecup.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'editorjs-codeCup.bundle.js',
    library: 'editorJsCodeCup',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use : [{
            loader  : 'svg-inline-loader',
            options : {
                removeSVGTagAttrs : false
            }
        }]
      }
    ]
  }
};