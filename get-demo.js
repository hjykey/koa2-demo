// 自定义解析get
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  let url = ctx.url;

  //从request中获取GET请求
  let request = ctx.request; //node原生的为ctx.req，koa里为ctx.request
  let req_query = request.query; //query返回的是格式化好的参数对象
  let req_querystring = request.querystring; //querystring返回的是请求字符串

  //从上下文context中直接获取GET请求
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  };
});
// 用http://127.0.0.1:3000/?user=jspang&age=18访问时可以看到query和querystring的区别
app.listen(3000, () => {
  console.log("[demo] server is starting at port 3000");
});
