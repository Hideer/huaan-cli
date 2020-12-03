"use strict";

var clc = require('chalk');

var error = clc.red;
var success = clc.green;
var warn = clc.yellow;
var info = clc.cyan;
var defaultClc = {
  error,
  success,
  warn,
  info
};
module.exports = {
  success(msg) {
    console.log(clc.bgGreen.black(' SUCCESS ') + success(' ' + msg));
  },

  error(msg) {
    console.log(clc.bgRed(' ERROR ') + error(' ' + msg));
  },

  warn(msg) {
    console.log(clc.bgYellow.black(' WARN ') + warn(' ' + msg));
  },

  info(msg) {
    console.log(clc.bgBlue.black(' INFO ') + info(' ' + msg));
  },

  getStr(type, msg) {
    var text;
    var message = '' + msg;
    text = (defaultClc[type] || clc[type])(message);
    return text;
  },

  getBoldStr(type, msg) {
    var text;
    var message = '' + msg;
    var error = clc.bold.red;
    var success = clc.bold.green;
    var warn = clc.bold.yellow;
    var info = clc.bold.cyan;
    var defaultClc = {
      error,
      success,
      warn,
      info
    };
    text = (defaultClc[type] || clc.bold[type])(message);
    return text;
  },

  getErrorMsg(error, defaultMsg) {
    var msg = defaultMsg || '';

    if (error && error.message) {
      msg = error.message;
    }

    return msg;
  }

};