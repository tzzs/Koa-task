const sequelize = require('sequelize');
const config = require('./../configs/config')

const sequelize = new sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});