#!/usr/bin/env node
"use strict";

var _utils = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var chalk = require('chalk');

var ora = require('ora');

var inquirer = require('inquirer');

var download = require('download-git-repo');

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (programArgs) {
    var tplObj = require("".concat(__dirname, "/template")); // 获取当前模块配置文件
    // 自定义交互式命令行的问题及简单的校验


    var question = [{
      name: 'templateName',
      type: 'input',
      message: '需要导入的模板名称',

      validate(val) {
        if (val === '') {
          return 'The templateName is required!';
        } else {
          return true;
        }
      }

    }, {
      name: 'projectName',
      type: 'input',
      message: '将要创建的文件夹名称',
      default: 'huaan-template',

      validate(val) {
        if (val === '') return 'The projectName is required!';
        return true;
      }

    }, {
      name: 'packageOrg',
      type: 'list',
      message: 'select the packageOrg management',
      choices: ['npm', 'yarn']
    }]; // 第一个参数是模板名称, 第二个参数是新建的文件目录名，同Vue-cli
    // program.parse(process.argv)
    // 下载资源并install

    var build = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (_ref2) {
        var {
          templateName,
          projectName = 'huaan-template',
          packageOrg = 'npm'
        } = _ref2;
        var url;
        var filePath = "".concat(process.cwd(), "/").concat(projectName); // 当前路径是否以及有重名的文件夹

        var isFileOver = yield (0, _utils.fileIsOver)(filePath);

        if (isFileOver) {
          return console.log(chalk.red('   File directory already exists!'));
        } // 当前模板是否存在


        if (!tplObj[templateName]) {
          return console.log(chalk.red('   Template is not find !'));
        }

        url = "".concat(tplObj[templateName].gitpath, "#").concat(tplObj[templateName].branch || 'master'); // 拼接git仓库地址带分支，默认分支master

        console.log(chalk.green('\n Start generating... \n')); // 出现加载图标

        var loading = ora('Downloading...');
        loading.start();
        (0, _utils.downloadGitRepo)({
          url,
          projectName
        }).then(() => {
          // 结束加载图标
          loading.succeed(); // 初始化项目

          (0, _utils.install)({
            cwd: path.join(process.cwd(), projectName),
            packageOrg
          }).then(() => {
            console.log(chalk.green('\n Generation completed!'));
            console.log('\n To get started \n');
            console.log("    ".concat(chalk.blue("cd ".concat(projectName))));
            console.log("    ".concat(chalk.blue("".concat(packageOrg, " server")), " \n"));
          }).catch(err => {
            console.log(chalk.red("Install failed. ".concat(err)));
          });
        }).catch(() => {
          loading.fail();
          console.log(chalk.red("Generation failed. ".concat(err)));
        });
      });

      return function build(_x2) {
        return _ref3.apply(this, arguments);
      };
    }(); // 当没有输入参数的时候给个提示


    if (programArgs.length < 1) {
      // return program.help()
      inquirer.prompt(question).then(answers => {
        var {
          templateName,
          projectName,
          packageOrg
        } = answers;
        build({
          templateName,
          projectName,
          packageOrg
        });
      });
    } else {
      // 存在参数
      var args = programArgs || [];
      build({
        templateName: args[0],
        projectName: args[1],
        packageOrg: args[2]
      });
    }
  });

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = init;