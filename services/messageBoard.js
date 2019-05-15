const { query } = require('./mysql');
const Topic = require('./../models/Topic');
const Msg = require('./../models/Msg');
const moment = require('moment');

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
  console.log(params);
  try {
    var topic = await Topic.create({
      title: params.title,
      content: params.content,
      author: ctx.session.user,
      // logtime: Date.now()
      logtime: moment(new Date()).utcOffset(8).format('YYYY-MM-DD HH:mm:ss').toString()
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

const deletetopic = async (ctx) => {
  //判断是否登录
  let msg = new Msg();
  if (!ctx.session.user) {
    msg.code = 401;
    msg.message = '用户未登录,请登录后重试...';
    ctx.body = msg;
    return;
  }
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  console.log(params);
  try {
    const topic = await Topic.findOne({ where: { id: params.id } });
    if (topic.author == ctx.session.user) {
      if (topic == null) {
        msg.code = 406;
        msg.message = '数据不存在，无法删除，请刷新后重试';
      } else {
        await topic.destroy();
        msg.code = 0;
        msg.message = 'success';
      }
    } else {
      msg.code = 403;
      msg.message = '权限不足，禁止删除';
    }
  } catch (error) {
    console.log(error);
    msg.code = 406;
    msg.message = '数据库错误';
  }
  ctx.body = msg;
}

const modifytopic = async (ctx) => {
  //判断是否登录
  let msg = new Msg();
  if (!ctx.session.user) {
    msg.code = 401;
    msg.message = '用户未登录,请登录后重试...';
    ctx.body = msg;
    return;
  }
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  try {
    let topic = await Topic.findOne({ where: { id: params.id } });
    if (topic.author != ctx.session.user) {
      msg.code = 405;
      msg.message = '请求的方法被禁止，非作者本人，数据无法修改';
    } else {
      if (topic == null) {
        msg.code = 406;
        msg.message = '数据不存在，无法修改，请刷新后重试';
      } else {
        topic = await topic.update({ title: params.title, content: params.content, logtime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') });
        msg.code = 0;
        msg.message = 'success';
        msg.data = topic;
      }
    }


  } catch (error) {
    console.log(error);
    msg.code = 406;
    msg.message = '数据库错误';
  }
  ctx.body = msg;
}

const gettopic = async (ctx) => {
  let msg = new Msg();
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  try {
    let topic = await Topic.findOne({ where: { id: params.id } });
    if (topic == null) {
      msg.code = 406;
      msg.message = '数据不存在，请刷新后重试';
    } else {
      topic["logtime"] = moment(topic.logtime).format('YYYY-MM-DD HH:mm:ss');
      msg.code = 0;
      msg.message = 'success';
      msg.data = topic;
    }

  } catch (error) {
    console.log(error);
    msg.code = 406;
    msg.message = '数据库错误';
  }
  ctx.body = msg;
}

const gettopics = async (ctx) => {
  let msg = new Msg();
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  console.log(params);
  let topics, find = {}, where = {};
  try {
    //判断作者限制
    if (params.author) {
      where['author'] = params.author;
    }
    //判断页数限制
    if (params.limit) {
      find['limit'] = parseInt(params.limit);
    }
    //当前页数
    if (params.page) {
      find['offset'] = params.limit * (params.page - 1);
    }

    find['order'] = [['logtime', 'DESC']];
    find['where'] = where;

    count = await Topic.findAll(where);

    console.log(find);
    topics = await Topic.findAll(find);

    topics.forEach(topic => {
      topic["logtime"] = moment(topic.logtime).format('YYYY-MM-DD HH:mm:ss');
    });
    msg.message = 'success';
    msg.data = {
      count: count.length,
      raw: topics
    };
  } catch (error) {
    console.log(error);
    msg.code = 406;
    msg.message = '数据库错误';
  }
  ctx.body = msg;
}

module.exports = { index, addtopic, deletetopic, modifytopic, gettopic, gettopics };