const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  if (ctx.url === "/index") {
    ctx.cookies.set("myname", "jason", {
      domain: "127.0.0.1", // 写cookie所在的域名
      path: "/index", // 写cookie所在的路径
      maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
      expires: new Date("2020-12-31"), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false, // 是否允许重写
    });
    ctx.body = "cookie设置完成!";
  } else {
    if (ctx.cookies.get("myname")) {
      ctx.body = ctx.cookies.get("myname");
    } else {
      ctx.body = "Cookie读取失败！";
    }
  }
});

app.listen(3000, () => {
  console.log("服务器已启动，监控端口号：3000");
});
app.off();
