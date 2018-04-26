/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');

let env = 'dev';
for(let i = 0; i < process.argv.length; i++ ) {
  if(process.argv[i] === '--env') {
    env = process.argv[i+1];
    break;
  }
}

const vendors = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-dom',
  'redux',
  'react-router-redux',
  'lodash',
  'moment',
  'antd',
  'styled-components',
  'react-addons-css-transition-group',
  'react-draft-wysiwyg',
  'draftjs-to-html',
  'html-to-draftjs',
  'draft-js',
  'jquery',
  'prop-types',
];

const fileOutput = path.join(__dirname, `../build-dll/dll${env === 'dev' ? '-dev' : '-prod'}`);

const config = {
  entry: {
    vendor: vendors
  },
  output: {
    path: fileOutput,
    filename: "[name].[chunkhash:8].dll.js",
    library: "[name]_[chunkhash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: `${fileOutput}/manifest.json`,
      name: "[name]_[chunkhash]",
      context: __dirname,
    }),
  ]
}

// 压缩打包的文件
if(env === 'prod') {
  config.plugins.unshift(new CleanWebpackPlugin([fileOutput, 'build'], { root: path.join(__dirname, '../') }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));
} else if(env === 'dev') {
  config.plugins.unshift(new CleanWebpackPlugin([fileOutput], { root: path.join(__dirname, '../') }));
}

module.exports = config;
