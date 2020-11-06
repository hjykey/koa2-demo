const Router = require('koa-router')
let router = new Router()
//相当于引入了schema文件夹下的所有js文件
const { initSchemas } = require('../init.js')

const mongoose = require('mongoose')

router.get('/', async (ctx) => {
  ctx.body = require('../../static/data.json')
})
router.get('/register', async (ctx) => {
  ctx.body = '用户注册接口'
})
router.post('/register', async (ctx) => {
  initSchemas()
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  console.log(newUser)
  await newUser
    .save()
    .then(() => {
      //成功返回code=200，并返回成功信息
      ctx.body = {
        code: 200,
        message: '注册成功',
      }
    })
    .catch((error) => {
      //失败返回code=500，并返回错误信息
      ctx.body = {
        code: 500,
        message: error,
      }
    })
})
module.exports = router
