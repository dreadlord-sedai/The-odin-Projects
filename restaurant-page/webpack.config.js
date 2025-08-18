const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // or 'production'
};
