const { Sequelize, sequelize } = require('./../services/sequelize');
const auth = require('./../services/auth');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING(100),
  password: Sequelize.STRING
}, {
    tableName: 'user',
    timestamp: false
  });

User.sync({ force: true }).then(() => {
  for (let i = 0; i < 5; i++) {
    console.log(i);
    User.create({
      username: 'author' + i,
      password: auth.getHash('author' + i)
    });
  }
  return true;
}).catch(() => {
});;

module.exports = User;
