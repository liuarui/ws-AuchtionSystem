/* 
  后台管理 拍品管理 路由文件
*/

const express = require('express')
const router = express.Router()

// 可重用接口（查询所有拍品）//

// 更新拍品信息 
router.post('/updateAuctionMes', (req, res, next) => {
  // 1. 接收拍品信息，去更新相应拍品
  // 2. 
  // 3. 返回数据
  res.send('更新拍品信息')
})
module.exports = router
