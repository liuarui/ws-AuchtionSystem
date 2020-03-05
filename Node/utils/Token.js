const jwt = require('jsonwebtoken')

const signkey = require('../config/SecretConfig').secretJwtString()

class Token {
  constructor() {
    this.blackList = []
    this.isBlackToken = this.isBlackToken.bind(this)
    this.revokedToken = this.revokedToken.bind(this)
  }
  // 设置token
  setToken(username, userid) {
    return new Promise((resolve, reject) => {
      let token =
        'Bearer ' +
        jwt.sign(
          {
            username: username,
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
      // 这里为了操作简便，将黑名单维护在内存中，而不是数据库中，可在数据库中进行维护
      this.blackList.push(token)
      if(this.blackList.length === 999){
        // 怕过多内存溢出，清理
        this.blackList = []
      }
      resolve(token)
    })
  }
  // 验证是否存在Token黑名单
  isBlackToken(req, payload, done) {
    let token = req.headers['authorization']
    // 在内存中获取
    let hasBlack = this.blackList.includes(token)
    if (hasBlack) {
      return done(401, true)
    } else {
      return done()
    }
  }
}
module.exports = new Token()
