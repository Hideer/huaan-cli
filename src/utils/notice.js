const clc = require('chalk')

const error = clc.red
const success = clc.green
const warn = clc.yellow
const info = clc.cyan
const defaultClc = {
  error,
  success,
  warn,
  info,
}
module.exports = {
  success(msg) {
    console.log(clc.bgGreen.black(' SUCCESS ') + success(' ' + msg))
  },
  error(msg) {
    console.log(clc.bgRed(' ERROR ') + error(' ' + msg))
  },
  warn(msg) {
    console.log(clc.bgYellow.black(' WARN ') + warn(' ' + msg))
  },
  info(msg) {
    console.log(clc.bgBlue.black(' INFO ') + info(' ' + msg))
  },
  getStr(type, msg) {
    let text
    const message = '' + msg
    text = (defaultClc[type] || clc[type])(message)
    return text
  },
  getBoldStr(type, msg) {
    let text
    const message = '' + msg
    const error = clc.bold.red
    const success = clc.bold.green
    const warn = clc.bold.yellow
    const info = clc.bold.cyan
    const defaultClc = {
      error,
      success,
      warn,
      info,
    }
    text = (defaultClc[type] || clc.bold[type])(message)
    return text
  },
  getErrorMsg(error, defaultMsg) {
    let msg = defaultMsg || ''
    if (error && error.message) {
      msg = error.message
    }
    return msg
  },
}
