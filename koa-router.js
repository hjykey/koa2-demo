//组件koa-router
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();

let router = new Router({ prefix: "/koa" }); //设置前缀，全局设置，单页设置前缀在use中实现
//单页
// router.get("/", function (ctx, next) {
//   ctx.body = "Hello JSPang";
// });
// Router();
//多页面
router
  .get("/", function (ctx, next) {
    ctx.body = "index page!";
  })
  .get("/todo", (ctx, next) => {
    console.log(ctx.query);
    console.log(ctx.url);
    // ctx.body = `${ctx.querystring} page!`;
    ctx.body = ctx.query;
  });

// //以下程序为不同页面添加不同的前缀
// //new第二个路由
// let home = new Router();
// home
//   .get("/jspang", async (ctx) => {
//     ctx.body = "Home page";
//   })
//   .get("/todo", async (ctx) => {
//     ctx.body = "Home ToDo";
//   });
// //第三个路由
// let page = new Router();
// page
//   .get("/jspang", async (ctx) => {
//     ctx.body = "Page JSPang";
//   })
//   .get("/todo", async (ctx) => {
//     ctx.body = "Page ToDo";
//   });

// //装载所有子路由，此处的/home和page都为path
// let router = new Router();
// router.use("/home", home.routes(), home.allowedMethods());
// router.use("/page", page.routes(), page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("starting at port 3000");
});
