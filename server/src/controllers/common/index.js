const header = require('./header')
const footer = require('./footer')

module.exports = async (scope, ctx) => {
  scope.headerDisplay = true;
  // scope.footNavFlag = true;
  // scope.commonFrameFlag = true;
  // scope.commonBusinessFlag = true;
  // scope.commonStylesFlag = true;
  scope.title = '小麦'
  scope.keywords = '小麦'
  scope.description = '小麦'

  await header(scope, ctx)
  await footer(scope, ctx)
}
