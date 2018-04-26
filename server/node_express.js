const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'reactDemo')));
app.listen(7002, function(){
  console.log('app is listen')
})