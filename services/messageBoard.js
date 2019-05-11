const { query } = require('./mysql');
const Topic = require('./../models/Topic');


const index = async (ctx) => {
  await ctx.render('index', {});
};

const addtopic = async (ctx) => {
  //判断是否登录

  //信息添加

  //结果返回
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  Topic.create({
    title: params.title,
    content: params.content,
    author: params.author,
    logtime: Date.now()
  }).then(function (p) {
    console.log('created.' + JSON.stringify(params));
  }).catch(function (err) {
    console.log(object);
  })
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