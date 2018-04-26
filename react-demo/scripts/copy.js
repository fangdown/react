const fs = require('fs-extra');

const buildDir = './build';
const pubPathDir = '../build';

fs.ensureDir(buildDir, (err) => {
  console.log(err); // => null

  fs.copy(buildDir, pubPathDir, (error) => {
    if (error) {
      return console.error(error);
    }
    console.log('copy build to pub_build dir success');
  });
});
