const http = require('http');
const fs = require('fs');
// const path = require('path');
const documentRoot = process.cwd()+'/reactDemo';
console.log('documentRoot',documentRoot)
const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === '/') {
    url = '/index.html';
  }
  const file = documentRoot + url;
  console.log(url);
  fs.readFile(file, (err, data) => {
    if(err){
      res.writeHeader(404, {'content-type': 'text/html;charset="utf-8"'});
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      res.end();
    } else {
      res.writeHeader(200, {'content-type': 'text/html;charset="utf-8"'});
      res.write(data);
      res.end();
    }
  });
}).listen(7001)
console.log(123);