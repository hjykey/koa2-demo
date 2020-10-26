const Koa = require("koa");
const app = new Koa();
// koa里没有对post请求进行解析，自定义解析post
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.on("data", (data) => {
        postdata += data;
      });
      ctx.req.addListener("end", function () {
        resolve(postdata);
        // return postdata;
      });
    } catch (error) {
      reject(error);
    }
  });
}
// POST字符串解析JSON对象
function parseQueryStr(queryStr) {
  let queryData = {};
  let queryStrList = queryStr.split("&");
  console.log(queryStrList);
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split("=");
    console.log(itemList);
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
}

app.use(async (ctx) => {
  //当请求是GET请求时，显示表单让用户填写
  if (ctx.url === "/" && ctx.method === "GET") {
    let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
    ctx.body = html;
    //当请求是POST请求时
  } else if (ctx.url === "/" && ctx.method === "POST") {
    ctx.body = await parsePostData(ctx);
    //以下方法网页错误代码404
    // parsePostData(ctx)
    //   .then((res) => {
    //     console.log(res);
    //     // console.log(typeof res);
    //     setTimeout(() => {
    //       ctx.body = res;
    //     }, 300);
    //   })
    //   .catch((err) => console.log("rejected", err));
    // ctx.body = "接收到请求";
  } else {
    //其它请求显示404页面
    ctx.body = "<h1>404!</h1>";
  }
});

app.listen(3000, () => {
  console.log("[demo] server is starting at port 3000");
});
