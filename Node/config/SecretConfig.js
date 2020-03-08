class SecretConfig {
  // token加密字符串
  secretJwtString() {
    return 'mes_lwr_Token_authorization'
  }
}

module.exports = new SecretConfig()
