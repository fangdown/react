

/**
 * path node模块 路径
 * fs node模块 文件系统
 * process node模块 进程  process.cwd() -绝对路径
 */
const path = require('path');
const fs = require('fs');
const url = require('url');

const apppDirectory = fs.realpathSync(process.cwd()); // 获取相对路径目录
const resolveApp = relativePath => path.resolve(apppDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(paramPath, needsSlash) {
  const hasSlash = paramPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return paramPath.substr(paramPath, paramPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${paramPath}/`;
  } else {
    return paramPath;
  }
}
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  yarnLockFile: resolveApp('yarn.lock'),
  servedPath: getServedPath(resolveApp('package.json')),
};

