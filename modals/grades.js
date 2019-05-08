const Sequelize = require('sequelize');

const sequelize = require('../database/database');

grade = sequelize.define('Grades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
       
        allowNull: false
    },
    subject: {
        type:Sequelize.STRING,
        
    },
    
    
    score: {
        type: Sequelize.STRING,
        allowNull: false,
       
    },
    notes: {
        type: Sequelize.STRING,
        unique:true
    }
})

module.exports = grade;