const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // optional: cleans dist folder before build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // your custom HTML
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000, // or any port you prefer
    open: true, // opens browser automatically
  },
  mode: 'development',
};
