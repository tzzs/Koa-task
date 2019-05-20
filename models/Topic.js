const { Sequelize, sequelize } = require('./../services/sequelize');
const moment = require('moment');

const Topic = sequelize.define('topic', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING(255),
  content: Sequelize.STRING(2000),
  author: Sequelize.STRING(255),
  logtime: Sequelize.STRING(255)
}, {
    timestamp: false//关闭自动添加timeStamp的功能
  });

Topic.sync({force:true}).then(() => {
  for (let i = 0; i < 50; i++) {
    console.log(i);
    Topic.create({
      title: 'title' + i,
      content: 'content' + i,
      author: 'author' + i % 5,
      // logtime: Date.now()
      logtime: moment(new Date()).utcOffset(8).format('YYYY-MM-DD HH:mm:ss').toString()
    });
  }
  return true;
}).catch(() => {
});;

module.exports = Topic;
