const { Sequelize, sequelize } = require('./../services/sequelize');

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

User.sync({ force: true }).then(() => {
  for (let i = 0; i < 5; i++) {
    console.log(i);
    User.create({
      name: 'autor' + i
    });
  }
  return true;
}).catch(() => {
});;

module.exports = User;
