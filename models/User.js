const {Sequelize, sequelize} = require('./../services/sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING(100)

}, {
  tableName: 'user',
  timestamp: false
});

module.exports = User;
