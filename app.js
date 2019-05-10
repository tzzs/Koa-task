const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
const views = require('koa-views')
const path = require('path')

const renders = require('./tools/render');
const routers = require('./routers/index');
const auth = require('./services/auth')

const app = module.exports = new Koa();


// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
});
app.use(auth.filter);
app.use(logger());
app.use(bodyParser());

//静态资源配置
app.use(static(path.join(__dirname, './static')));

app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(async function (ctx, next) {
  await next();
  console.log(ctx.status);
  if (ctx.status === 404) {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await renders('404.html');
    ctx.body = data;
  }
});

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.satus === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "false",
        data: {}
      }
    } else {
      throw err;
    }
  });
});

let port = 8080
app.use(routers.routes()).use(routers.allowedMethods());
app.listen(port, () => {
  console.log(`Sever satrt at 127.0.0.1:${port}`);
});