#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const download = require('download-git-repo')
import { install, downloadGitRepo, fileIsOver } from './utils'

const init = async (programArgs) => {
  const tplObj = require(`${__dirname}/template`) // 获取当前模块配置文件
  // 自定义交互式命令行的问题及简单的校验
  let question = [
    {
      name: 'templateName',
      type: 'input',
      message: '需要导入的模板名称',
      validate(val) {
        if (val === '') {
          return 'The templateName is required!'
        } else {
          return true
        }
      },
    },
    {
      name: 'projectName',
      type: 'input',
      message: '将要创建的文件夹名称',
      default: 'huaan-template',
      validate(val) {
        if (val === '') return 'The projectName is required!'
        return true
      },
    },
    {
      name: 'packageOrg',
      type: 'list',
      message: 'select the packageOrg management',
      choices: ['npm', 'yarn'],
    },
  ]
  // 第一个参数是模板名称, 第二个参数是新建的文件目录名，同Vue-cli
  // program.parse(process.argv)

  // 下载资源并install
  const build = async ({ templateName, projectName = 'huaan-template', packageOrg = 'npm' }) => {
    let url
    const filePath = `${process.cwd()}/${projectName}`

    // 当前路径是否以及有重名的文件夹
    const isFileOver = await fileIsOver(filePath)
    if (isFileOver) {
      return console.log(chalk.red('   File directory already exists!'))
    }

    // 当前模板是否存在
    if (!tplObj[templateName]) {
      return console.log(chalk.red('   Template is not find !'))
    }

    url = `${tplObj[templateName].gitpath}#${tplObj[templateName].branch || 'master'}` // 拼接git仓库地址带分支，默认分支master

    console.log(chalk.green('\n Start generating... \n'))
    // 出现加载图标
    const loading = ora('Downloading...')
    loading.start()

    downloadGitRepo({ url, projectName })
      .then(() => {
        // 结束加载图标
        loading.succeed()
        // 初始化项目
        install({
          cwd: path.join(process.cwd(), projectName),
          packageOrg,
        })
          .then(() => {
            console.log(chalk.green('\n Generation completed!'))
            console.log('\n To get started \n')
            console.log(`    ${chalk.blue(`cd ${projectName}`)}`)
            console.log(`    ${chalk.blue(`${packageOrg} server`)} \n`)
          })
          .catch((err) => {
            console.log(chalk.red(`Install failed. ${err}`))
          })
      })
      .catch(() => {
        loading.fail()
        console.log(chalk.red(`Generation failed. ${err}`))
      })
  }

  // 当没有输入参数的时候给个提示
  if (programArgs.length < 1) {
    // return program.help()
    inquirer.prompt(question).then((answers) => {
      const { templateName, projectName, packageOrg } = answers
      build({ templateName, projectName, packageOrg })
    })
  } else {
    // 存在参数
    const args = programArgs || []
    build({ templateName: args[0], projectName: args[1], packageOrg: args[2] })
  }
}

module.exports = init
