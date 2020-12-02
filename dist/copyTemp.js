"use strict";

var fs = require('fs'); // import { exists } from './utils'
// let file = createReadStream('./template.json')
// let out = createWriteStream('./dist/template.json')
// exists('./template.json', './../dist/template.json')


fs.copyFile('./template.json', './dist/template.json', function (err) {
  if (err) console.log('something wrong was happened', err);else console.log('copy file succeed');
});