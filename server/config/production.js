const path = require('path')
const env = process && process.env
const { argv }  = require('yargs')

module.exports = {
  staticServer: path.resolve(__dirname, '../../client'),
  faviconPath: path.resolve(__dirname, '../favicons'),
  logFilePath: path.resolve(__dirname, '../log'),
  chunkMapPath: path.resolve(__dirname, '../../client/dist/assets.json'),
  DBConnection:{
    host:'127.0.0.1',
    user:'root',
    password:'Wl87108mariadb',
    dataBase:'learnDB'
  }
}
