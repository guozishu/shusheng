const {
  session
} = require('../lib/common/common');

class Pass {
  async pass(scope) {
    const ctx = this;
    let result = {
      isLogin: false
    }
    const sessionToken = session.get('token');
    const cookieToken=ctx.cookies.get('token');
    if (sessionToken && sessionToken === cookieToken) {
      result.isLogin =  true
    }

    return result
  }
}
module.exports = Pass