'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const render = require('./tools/render');

const app = module.exports = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(async function (ctx, next) {
  await next();
  console.log(ctx.status);
  if (ctx.status === 404) {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await render('404.html')
    ctx.body = data;
  }
  // ctx.body = 'Hello World';
});

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('index.html');
  ctx.body = data;
})

router.post('/', async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  const query = ctx.request.query;
  ctx.body = query;
})

router.get('/index', async (ctx) => {
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('index.html');
  ctx.body = data;
})

router.get('/hello', async (ctx) => {
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('hello-world.html');
  ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(8080, () => {
  console.log('Sever satrt at 127.0.0.1:8080');
});