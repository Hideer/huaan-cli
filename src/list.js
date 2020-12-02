#!/usr/bin/env node
const chalk = require('chalk')
const symbols = require('log-symbols')

const tplObj = require(`${__dirname}/template`)

const list = () => {
  console.log('\n')
  for (const key in tplObj) {
    if (tplObj.hasOwnProperty(key)) {
      const ele = tplObj[key]
      console.log(` ${symbols.info} ${chalk.red(key)}: ${chalk(ele.describe)}`)
    }
  }
  console.log('\n')
}

module.exports = list
