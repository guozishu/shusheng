
const argv = require('minimist')(process.argv.slice(2))
const NODE_ENV = argv.NODE_ENV || process.env.NODE_ENV || 'development'
let config = require(`./${NODE_ENV}.js`)

config = {
  ...{
    PORT: process.env.PORT || 8080,
    NODE_ENV
  }, ...config
}

module.exports = config
