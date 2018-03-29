const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './assets/js/invoice.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'invoicing.bundle.js',
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ['env', 'stage-0']
        }
    }],
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]  
  }
}



    

