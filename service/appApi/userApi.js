const Router = require('koa-router')
let router = new Router()
//相当于引入了schema文件夹下的所有js文件
const { initSchemas } = require('../mginit.js')
initSchemas()
const mongoose = require('mongoose')

router.get('/', async (ctx) => {
  ctx.body = require('../../static/data.json')
})
router.get('/register', async (ctx) => {
  ctx.body = '用户注册接口'
})
router.post('/register', async (ctx) => {
  const User = mongoose.model('UserSchema')
  let newUser = new User(ctx.request.body)
  console.log('post:' + newUser)
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

/*登录 */
router.post('/login', async (ctx) => {
  //得到前端传递过来的数据
  let loginUser = ctx.request.body
  // console.log(loginUser)
  let userName = loginUser.username
  let password = loginUser.password
  //引入User的model
  const User = mongoose.model('UserSchema')
  //查找用户名是否存在，如果存在开始比对密码
  await User.findOne({ username: userName })
    .exec()
    .then(async (result) => {
      // console.log(result)
      if (result) {
        //console.log(User)
        //当用户名存在时，开始比对密码
        let newUser = new User() //因为是实例方法，所以要new出对象，才能调用
        await newUser
          .comparePassword(password, result.password)
          .then((isMatch) => {
            //返回比对结果
            ctx.body = { code: 200, message: isMatch }
          })
          .catch((error) => {
            //出现异常，返回异常
            console.log(error)
            ctx.body = { code: 500, message: error }
          })
      } else {
        ctx.body = { code: 200, message: '用户名不存在' }
      }
    })
    .catch((error) => {
      console.log(error)
      ctx.body = { code: 500, message: error }
    })
})
module.exports = router
