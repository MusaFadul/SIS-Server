const Sequelize = require('sequelize');

const sequelize = require('../database/database');
const singleConnection = require('../index')

const tableNames = require('../index')


console.log('öööööööööööööööööööööööööööööööööööööööööööööööööööööööööööööö')



const connection = (tableName)=>{
  return user = sequelize.define(tableName, {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        setionId: {
            type: Sequelize.STRING,
           
        },

       /* sender: {
            type: Sequelize.STRING,
            
            allowNull: false
        },*/
        receiver: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        message:{
            type : Sequelize.STRING,
            
        },

        sentAt : Sequelize.STRING
    })
}
module.exports = connection;