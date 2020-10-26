// import Koa from 'koa'//使用ES6规范时，vscode的package.json需增加字段 "type":"module"才能调试
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  //ctx context的简写
  ctx.body = "hello koa2";
});
app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");
