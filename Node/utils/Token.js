const jwt = require('jsonwebtoken')
const signkey = 'mes_lwr_Token_authorization'

class Token {
  constructor() {
    this.blackList = []
    this.isBlackToken = this.isBlackToken.bind(this)
  }
  // 设置token
  setToken(username, userid) {
    return new Promise((resolve, reject) => {
      let token =
        'Bearer ' +
        jwt.sign(
          {
            name: username,
          },
          signkey,
          { expiresIn: '24h' },
        )
      resolve(token)
    })
  }
  // 解析token 信息
  verToken(token) {
    return new Promise((resolve, reject) => {
      let info = jwt.verify(token.split(' ')[1], signkey)
      resolve(info)
    })
  }
  // 销毁token 用于注销
  revokedToken(token) {
    return new Promise((resolve, reject) => {
      this.blackList.push(token)
      if(this.blackList.length === 999){
        this.blackList = []
      }
      resolve(this.blackList[this.blackList.length - 1])
    })
  }
  // 验证是否存在Token黑名单
  isBlackToken(req, payload, done) {
    // return done(err)
    let token = req.headers['authorization']
    let hasBlack = this.blackList.includes(token)
    if (hasBlack) {
      return done('当前token已失效', true)
    } else {
      return done()
    }
  }
}
module.exports = new Token()
