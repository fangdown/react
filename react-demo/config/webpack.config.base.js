const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths');
const theme = require('./theme.js');

const dllFilePath = path.join(__dirname,
  `../build-dll/dll${process.env.NODE_ENV === 'development' ? '-dev' : '-prod'}`);
const atsPath = (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'dev') ? '/' : '/';

const getUseLessCommon = () => {
  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: theme,
      },
    },
  ];
};
const getUseLessModules = () => {
  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        outside: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'less-loader',
      options: {
        // modifyVars: theme,
      },
    },
  ];
};
module.exports = {
  getAlias() {
    return {
      'react-native': 'react-native-web',
      '@modules': path.resolve('paths.appSrc', 'modules'),
      '@common': path.resolve(paths.appSrc, 'common'),
      '@main': path.resolve(paths.appSrc, 'main'),
      '@utils': path.resolve(paths.appSrc, 'utils'),
      '@style': path.resolve(paths.appSrc, 'style'),
      '@images': path.resolve(paths.appSrc, 'images'),
    };
  },
  loaderEslint() {
    return {
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      use: [
        {
          options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),
          },
          loader: require.resolve('eslint-loader'),
        },
      ],
      include: paths.appSrc,
    };
  },
  loaderImg() {
    return {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
        publicPath: atsPath,
      },
    };
  },
  loaderJsx() {
    return {
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      loader: require.resolve('babel-loader'),
      options: {
        compact: true,
        plugins: [
          ['import', { libraryName: 'antd', style: true }], // 引入antd 样式
        ],
      },
    };
  },
  loaderFile() {
    return {
      exclude: [/\.js$/, /\.html$/, /\.less$/, /\.json$/],
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
        publicPath: atsPath,
      },
    };
  },
  lessCommon__dev() {
    return {
      test: /\.less$/,
      exclude: [
        path.resolve(paths.appSrc, 'main/'),
        path.resolve(paths.appSrc, 'modules/'),
      ],
      use: [
        require.resolve('style-loader'),
      ].concat(getUseLessCommon()),
    };
  },
  lessModules__dev() {
    return {
      test: /\.less$/,
      include: [
        path.resolve(paths.appSrc, 'main/'),
        path.resolve(paths.appSrc, 'modules/'),
      ],
      use: [
        require.resolve('style-loader'),
      ].concat(getUseLessModules()),
    };
  },
  lessCommon__prod() {
    return {
      test: /\.less$/,
      exclude: [
        path.resolve(paths.appSrc, 'main/'),
        path.resolve(paths.appSrc, 'modules/'),
      ],
      use: ExtractTextPlugin.extract({
        fallback: require.resolve('style-loader'),
        use: getUseLessCommon(),
      }),
    };
  },
  lessModules__prod() {
    return {
      test: /\.less$/,
      include: [
        path.resolve(paths.appSrc, 'main/'),
        path.resolve(paths.appSrc, 'modules/'),
      ],
      use: ExtractTextPlugin.extract({

        fallback: require.resolve('style-loader'),
        use: getUseLessModules(),
      }),
    };
  },
  cleanFile__dev() {
    return new CleanWebpackPlugin(['build'], { root: path.join(__dirname, '../') });
  },
  cleanFile__prod: () => {
    return new CleanWebpackPlugin(['build'], { root: path.join(__dirname, '../') });
  },
  // 编译引入dll, 加快编译速度
  insertDllReferencePlugin() {
    return new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: `${dllFilePath}/manifest.json`,
    });
  },

  // 将dll文件插入到首页html模板
  insertDllToHtml() {
    return new AddAssetHtmlPlugin({
      filepath: `${dllFilePath}/*.dll.js`,
      includeSourcemap: false, // 默认为true。 当设置为true时，add-asset-html-plugin 会查找js的sourceMap文件
      publicPath: 'static/js-dll',
      outputPath: 'static/js-dll',
    });
  },


};
