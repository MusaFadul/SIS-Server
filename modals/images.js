const Sequelize = require('sequelize');

const sequelize = require('../database/database');

image = sequelize.define('Images', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    imageURL: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
})

module.exports = image;