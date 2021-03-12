const path = require('path')
const env = process && process.env

module.exports = {
  staticServer: path.resolve(__dirname, '../client'),
  logFilePath: path.resolve(__dirname, '../log'),
  chunkMapPath: path.resolve(__dirname, '../client/dist/assets.json'),
  DBConnection:{
    host:env.DB_HOST || '23.101.0.85',
    user:env.DB_USER || 'root',
    password:env.DB_PASSWORD || 'Wl87108mariadb',
    dataBase:env.DATABASE || 'learnDB'
  }
}
