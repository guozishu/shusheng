module.exports = [
  {
    method:'post',
    match: '/query',
    controller: 'home.query'
  },
  {
    method:'post',
    match: '/insert',
    controller: 'home.insert'
  }
]