const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'src/server/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build/server'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
};