const Sequelize = require('sequelize');

const sequelize = require('../database/database');

teacher = sequelize.define('Teachers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    imageURL: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = teacher;