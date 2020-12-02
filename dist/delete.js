#!/usr/bin/env node
"use strict";

var inquirer = require('inquirer');

var chalk = require('chalk');

var fs = require('fs');

var tplObj = require("".concat(__dirname, "/template"));

var question = [{
  name: 'name',
  message: '请输入要删除的模板名称',

  validate(val) {
    if (val === '') {
      return 'Name is required!';
    } else if (!tplObj[val]) {
      return 'Template does not exist!';
    } else {
      return true;
    }
  }

}];
inquirer.prompt(question).then(answers => {
  var {
    name
  } = answers;
  delete tplObj[name]; // 更新 template.json 文件

  fs.writeFile("".concat(__dirname, "/template.json"), JSON.stringify(tplObj), 'utf-8', err => {
    if (err) console.log(err);
    console.log('\n');
    console.log(chalk.green('Deleted successfully!\n'));
    console.log(chalk.grey('The latest template list is: \n'));
    console.log(tplObj);
    console.log('\n');
  });
});