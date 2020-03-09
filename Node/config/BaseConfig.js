class BaseConfig {
  // 不需要验证 token的 路由路径配置
  noTokenRouter() {
    return (['/api/users/login', 
    '/api/users/register', 
    '/api/users/updateUserPassword',
    '/api/admin/login',
    '/api/auction/',
    '/api/auction/pageSelectAuctionList',
    'api/index/pageSearchAuction'
  ])
  }
}

module.exports = new BaseConfig()
