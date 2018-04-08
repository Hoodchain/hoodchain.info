const express = require('express')
const app = express()
const chalk = require('chalk')
const path = require('path')
const _ = require('lodash')
const {mkdir, exists, run} = require('../libs/utils.js')

const router = require('./router')

const log = console.log
const baseDir = path.resolve(__dirname, '../')
const port = process.env.HTTP_PORT || 3000

const bodyParser = require("body-parser")
// const jwt = require('jsonwebtoken')

// const passport = require("passport")
// const passportJWT = require("passport-jwt")

// const ExtractJwt = passportJWT.ExtractJwt
// const JwtStrategy = passportJWT.Strategy

const paths = {
  distDir: path.resolve(baseDir, 'dist'),
  dataDir: path.resolve(baseDir, 'data'),
  libs: path.resolve(baseDir, 'libs')
}

app.use(bodyParser)

_.each(paths, async p => {
  const doesExist = await exists(p)
  if (!doesExist) {
    await run(`yarn build`)
    const dir = await mkdir(p, {recursive: true})
    log(chalk.yellow(`${dir} created`))
  }
})

app.use(express.static(paths.distDir))
app.use('/api', router)
app.listen(port, () => {
  log(chalk.yellow(`HTTP Server running on port ${port}`))
})
