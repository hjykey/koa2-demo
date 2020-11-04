//安装中间件npm install --save koa-static
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()
const staticPath = './static'

app.use(static(path.join(__dirname, staticPath)))

app.use(async (ctx) => {
  ctx.body = '输入/资源'
  // ctx.response.type = 'text'
  // ctx.response.body = fs.createReadStream('text.txt')
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})
