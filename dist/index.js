#!/usr/bin/env node
"use strict";

var program = require('commander'); // 定义当前版本
// 定义使用方法
// 定义四个指令


program.version(require('../package').version).usage('<command> [options]');
program.command('list').alias('ls').description('list all the templates').action(() => {
  require('./list')();
});
program.command('init [template-name] [project-name]').description('generate a new project from a template').action(() => {
  require('./init')(process.argv.slice(3));
}); // 解析命令行参数

program.parse(process.argv);