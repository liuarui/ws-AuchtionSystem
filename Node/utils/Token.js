const jwt = require('jsonwebtoken')
const signkey = 'mes_lwr_Token_authorization'
class Token {
  // 设置token

  verToken(token) {
    return new Promise((resolve, reject) => {
      var info = jwt.verify(token.split(' ')[1], signkey)
      resolve(info)
    })
  }
  // 认证token

  setToken(username, userid) {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(
        {
          name: username,
        },
        signkey,
        { expiresIn: '0.01h' },
      )
      resolve(token)
    })
  }
}

module.exports = new Token()
