#!/usr/bin/env node
const program = require('commander')

// // 定义当前版本
// // 定义使用方法
// // 定义四个指令
program.version(require('../package').version).usage('<command> [options]')

// program.command('list', 'list all the templates').action(() => {
//   console.log('000');
//   require('./list')()
// })

// program.command('init <template-name> [project-name]', 'generate a new project from a template').action(() => {
//   console.log(123123)
//   // program.usage('<template-name> [project-name]')
//   // program.parse(process.argv)
//   // require('./init')()
//   // ...process.argv.slice(3)
// })
// // .command('add', 'add a new template')
// // .command('delete', 'delete a template')

// 解析命令行参数

program
  .command('list')
  .description('list all the templates')
  .action(() => {
    require('./list')()
  })

program
  .command('init [template-name] [project-name]')
  .description('generate a new project from a template')
  .action(() => {
    require('./init')(process.argv.slice(3))
  })

program.parse(process.argv)
