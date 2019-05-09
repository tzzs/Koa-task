import Sequelize from "sequelize";

const User = Sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING(100)
    
}, {
        tableName: 'user'
    });

