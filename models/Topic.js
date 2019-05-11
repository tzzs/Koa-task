const {Sequelize, sequelize} = require('./../services/sequelize');

const Topic = sequelize.define('topic', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING(255),
  content: Sequelize.STRING(2000),
  author: Sequelize.STRING(255),
  logtime: Sequelize.DATE
}, {
  timestamp: false//关闭自动添加timeStamp的功能
});

module.exports = Topic;
