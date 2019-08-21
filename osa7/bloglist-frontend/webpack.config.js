/* 7.16 Webpack */
/* Tee sovellukselle sopiva webpack-konfiguraatio */

/*
Lisäämällä seuraavat package.json tiedostoon, saa komennolla $ npm start
osoitteeseen http://localhost:3000 näkyviin build kansion sisällön

  "scripts": {
    "start": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",

  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/polyfill": "^7.4.4",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.2.0",
    "style-loader": "^1.0.0",
    "webpack": "^4.39.2",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0"
*/

/*
const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv', argv.mode)

  const backend_url = argv.mode === 'http://localhost:3003/api/blogs'

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ],
  }
}

module.exports = config
*/
