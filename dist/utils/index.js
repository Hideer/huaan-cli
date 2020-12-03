"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = exports.copyFs = exports.fileIsOver = exports.downloadGitRepo = exports.install = void 0;

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var chalk = require('chalk');

var spawn = require('cross-spawn');

var stat = fs.stat;
/**
 * 自执行 install 安装各种依赖
 * @param {*} options
 */

var install = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (options) {
    return new Promise((resolve, reject) => {
      var cwd = options.cwd;
      var command = options.packageOrg;
      var args = ['install', '--save', '--save-exact', '--loglevel', 'error'];
      console.log(chalk.gray("$ ".concat(command, " install")));
      var child = spawn(command, args, {
        cwd,
        stdio: ['pipe', process.stdout, process.stderr]
      });
      child.once('close', code => {
        if (code !== 0) {
          reject({
            command: "".concat(command, " ").concat(args.join(' '))
          });
          return;
        }

        resolve();
      });
      child.once('error', reject);
    });
  });

  return function install(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 从资源库下载资源
 * @param {*} param0
 */


exports.install = install;

var downloadGitRepo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      url,
      projectName
    } = _ref2;
    return new Promise((resolve, reject) => {
      (0, _downloadGitRepo.default)(url, projectName, err => {
        if (err) {
          reject(err);
          return;
        }

        resolve(true);
      });
    });
  });

  return function downloadGitRepo(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 判断文件是否存在
 * @param {*} file 文件路径
 */


exports.downloadGitRepo = downloadGitRepo;

var fileIsOver = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (file) {
    return new Promise((resolve, reject) => {
      fs.access(file, fs.constants.F_OK, err => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  });

  return function fileIsOver(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */


exports.fileIsOver = fileIsOver;

var copyFs = (src, dst) => {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }

    paths.forEach(function (path) {
      var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable,
          writable;

      stat(_src, function (err, st) {
        if (err) {
          throw err;
        } // 判断是否为文件


        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream(_src); // 创建写入流

          writable = fs.createWriteStream(_dst); // 通过管道来传输流

          readable.pipe(writable);
        } // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
            exists(_src, _dst, copy);
          }
      });
    });
  });
}; // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录


exports.copyFs = copyFs;

var exists = (src, dst, callback) => {
  callback = callback || copyFs;
  fs.exists(dst, function (exists) {
    // 已存在
    if (exists) {
      callback && callback(src, dst);
    } // 不存在
    else {
        fs.mkdir(dst, function () {
          callback && callback(src, dst);
        });
      }
  });
};

exports.exists = exists;