const atsPath = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') ?
  '"/static/fonts/iconfont-2.10/iconfont"'
  :
  '"/static/fonts/iconfont-2.10/iconfont"';

const json = {
  '@primary-color': '#FD6720',
  '@icon-url': atsPath,
};

module.exports = json;
