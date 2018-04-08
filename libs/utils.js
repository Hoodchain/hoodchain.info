const _ = require('lodash')
const {access, constants} = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const {spawn} = require('child_process')
const log = console.log
const chalk = require('chalk')

const utils = {
  async exists (file, mode, cb) {
    return new Promise((resolve, reject) => {
      access(file, constants.R_OK | constants.W_OK, (err) => {
        err ? resolve(false) : resolve(true)
      })
    })
  },
  async mkdir (dir, opts, cb) {
    return new Promise((resolve, reject) => {
      mkdirp(dir, opts, (err) => {
        if (err) reject(err)
        else resolve(`dir ${dir} created`)    
      })
    })
  },
  async run (cmds) {
    return new Promise((resolve, reject) => {
      cmds = cmds.split(' ')
      const cmd = cmds.shift(1)
      const args = cmds
      log(chalk.cyan(`${cmd}, ${args}`))
      const prog = spawn(cmd, args)
      prog.stdout.on('data', (data) => {
        log(chalk.cyan(`INFO: ${data}`))
      })
      prog.stderr.on('data', (data) => {
        log(chalk.red(`ERROR: ${data}`))
      })
      prog.on('close', (code) => {
        log(chalk.yellow(`child process exited with code ${code}`))
        resolve(`complete`)
      })
    })
  }
}

module.exports = utils
