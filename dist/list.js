#!/usr/bin/env node
"use strict";

var chalk = require('chalk');

var symbols = require('log-symbols');

var tplObj = require("".concat(__dirname, "/template"));

var list = () => {
  console.log('\n');

  for (var key in tplObj) {
    if (tplObj.hasOwnProperty(key)) {
      var ele = tplObj[key];
      console.log(" ".concat(symbols.info, " ").concat(chalk.red(key), ": ").concat(chalk(ele.describe)));
    }
  }

  console.log('\n');
};

module.exports = list;