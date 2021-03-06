
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.on('unhandledRejection', (err) => {
  throw err;
});
require('../config/env');

const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const openBrowser = require('react-dev-utils/openBrowser');
const fs = require('fs');
const chalk = require('chalk'); // 颜色插件
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const useYarn = fs.existsSync(paths.yarnLockFile); // 路径是否存在
const isInteractive = process.stdout.isTTY; // 查看流是否是tty
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 7000;
const HOST = process.env.HOST || '0.0.0.0';
choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

    const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan('Staring the development server... \n'));
      openBrowser(urls.localUrlForBrowser);
    });
    // 信号终止
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

