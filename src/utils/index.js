const fs = require('fs')
const chalk = require('chalk')
const spawn = require('cross-spawn')
import download from 'download-git-repo'

stat = fs.stat

/**
 * 自执行 install 安装各种依赖
 * @param {*} options
 */
export const install = async (options) => {
  return new Promise((resolve, reject) => {
    const cwd = options.cwd
    const command = options.packageOrg
    const args = ['install', '--save', '--save-exact', '--loglevel', 'error']

    console.log(chalk.gray(`$ ${command} install`))

    const child = spawn(command, args, {
      cwd,
      stdio: ['pipe', process.stdout, process.stderr],
    })

    child.once('close', (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
    child.once('error', reject)
  })
}

/**
 * 从资源库下载资源
 * @param {*} param0
 */
export const downloadGitRepo = async ({ url, projectName }) => {
  return new Promise((resolve, reject) => {
    download(url, projectName, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

/**
 * 判断文件是否存在
 * @param {*} file 文件路径
 */
export const fileIsOver = async (file) => {
  return new Promise((resolve, reject) => {
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
export const copyFs = (src, dst) => {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err
    }

    paths.forEach(function (path) {
      var _src = src + '/' + path,
        _dst = dst + '/' + path,
        readable,
        writable

      stat(_src, function (err, st) {
        if (err) {
          throw err
        }

        // 判断是否为文件
        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream(_src)
          // 创建写入流
          writable = fs.createWriteStream(_dst)
          // 通过管道来传输流
          readable.pipe(writable)
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(_src, _dst, copy)
        }
      })
    })
  })
}
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
export const exists = (src, dst, callback) => {
  callback = callback || copyFs

  fs.exists(dst, function (exists) {
    // 已存在
    if (exists) {
      callback && callback(src, dst)
    }
    // 不存在
    else {
      fs.mkdir(dst, function () {
        callback && callback(src, dst)
      })
    }
  })
}
