const { query } = require('./mysql');
const Topic = require('./../models/Topic');
const Msg = require('./../models/Msg');


const index = async (ctx) => {
  await ctx.render('index', {});
};

const addtopic = async (ctx) => {
  let msg = new Msg();
  //判断是否登录
  if (!ctx.session.user) {
    msg.code = 401;
    msg.message = '用户未登录,请登录后重试...';
    ctx.body = msg;
    return;
  }
  //信息添加
  //结果返回
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }

  try {
    var topic = await Topic.create({
      title: params.title,
      content: params.content,
      author: ctx.session.user,
      logtime: Date.now()
    });
    msg.code = 0;
    msg.message = 'success';
    msg.data = topic;
    console.log('created.' + JSON.stringify(topic));
  } catch (error) {
    msg.code = 406;
    msg.message = '数据库错误';
    console.log(error);
  }
  ctx.body = msg;
};

const addtest = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  let topic = await Topic.create({
    title: params.title,
    content: params.content,
    author: 'admin',
    logtime: Date.now()
  });
  console.log('created.' + JSON.stringify(topic));
};

module.exports = { index, addtopic, addtest };