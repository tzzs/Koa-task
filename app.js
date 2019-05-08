const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static')

const render = require('./tools/render');
const routers = require('./routers/index')

const app = module.exports = new Koa();

app.use(bodyParser());

app.use(async function (ctx, next) {
  await next();
  console.log(ctx.status);
  if (ctx.status === 404) {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await render('404.html')
    ctx.body = data;
  }
});

app.use(routers.routes()).use(routers.allowedMethods());
app.listen(8080, () => {
  console.log('Sever satrt at 127.0.0.1:8080');
});