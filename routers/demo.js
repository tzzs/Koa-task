const router = require('koa-router')();
const render = require('../tools/render');

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('index.html');
  ctx.body = data;
});

router.post('/', async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  const query = ctx.request.query;
  ctx.body = query;
});

router.get('/index', async (ctx) => {
  console.log('index');
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('index.html');
  ctx.body = data;
});

router.post('/index', async (ctx) => {
  console.log('index');
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('index.html');
  ctx.body = data;
});

router.get('/hello', async (ctx) => {
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  const data = await render('hello-world.html');
  ctx.body = data;
});

router.get('/ejs', async (ctx) => {
  let title = 'hello koa based on ejs';
  await ctx.render('e', {
    title
  })
});

module.exports = router;