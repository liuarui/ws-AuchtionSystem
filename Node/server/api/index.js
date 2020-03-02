/* 
  主路由文件
*/

const express = require('express')
const router = express.Router()
const db = require('../../config/db')

router.get('/1', function(req, res, next) {
  let result = db.insert({ id: '25', username: '21223', password: '2', roleId: '1' }, 'user')
  // console.log(db.insert({ id: '25', username: '21223', password: '2', roleId: '1' }, 'user'))
  console.log(result)
  res.render('123', { title: 'Express' })
})
router.get('/2', function(req, res, next) {
  console.log(db.select('*','user',{id : 25}))
  res.render('123', { title: 'Express' })
})
router.get('/3', function(req, res, next) {
  console.log(db.delete({id : 25},'user'))
  res.render('123', { title: 'Express' })
})
router.get('/4', function(req, res, next) {
  console.log(db.update({username : 888,password:888},'user',{id : 25}))
  res.render('123', { title: 'Express' })
})

module.exports = router
