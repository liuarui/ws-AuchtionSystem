class SecretConfig {
  // 不需要验证 token的 路由路径配置
  secretJwtString() {
    return 'mes_lwr_Token_authorization'
  }
}

module.exports = new SecretConfig()
