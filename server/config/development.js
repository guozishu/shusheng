const path = require('path')
const env = process && process.env

module.exports = {
  staticServer: path.resolve(__dirname, '../client'),
  logFilePath: path.resolve(__dirname, '../log'),
  chunkMapPath: path.resolve(__dirname, '../client/dist/assets.json'),
  DBConnection:{
    host:env.DB_HOST || '127.0.0.1',
    user:env.DB_USER || 'wang',
    password:env.DB_PASSWORD || '123456',
    dataBase:env.DATABASE || 'learnDB'
  }
}
