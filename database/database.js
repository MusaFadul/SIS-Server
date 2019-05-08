const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.databaseName, config.databaseUserName, config.databasePassword, {
    dialect: config.databaseDialect,
    host: config.databaseHost
})


module.exports = sequelize