//大型koa开发可以用egg.js框架来做,mongodb的UI推荐Robo3
// npm install mongoose --save
const Router = require('koa-router')
const { connect } = require('./mginit') //立即执行函数

let user = require('./appApi/userApi.js')

let router = new Router().use('/user', user.routes())

const bodyParser = require('koa-bodyparser')

const Koa = require('koa')
const app = new Koa()
// npm install --save koa2-cors
const cors = require('koa2-cors') //跨域请求
app.use(cors())

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('starting at port 3000')
})
;(async () => {
  await connect()
})()
