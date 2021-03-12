const path = require('path')
const env = process && process.env
const { argv }  = require('yargs')

module.exports = {
  staticServer: path.resolve(__dirname, '../client'),
  faviconPath: path.resolve(__dirname, '../favicons'),
  logFilePath: path.resolve(__dirname, '../log'),
  chunkMapPath: path.resolve(__dirname, '../client/dist/assets.json'),
  mode: 'prod',
  dbInfomation:{
    host:'23.101.0.85',
    user:'root',
    password:'Wl87108mariadb',
    dataBase:'learnDB'
  }
}
