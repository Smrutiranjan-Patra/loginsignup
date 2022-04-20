const db = require('../config/db.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    db.DB,
    db.USER,
    db.PASSWORD, {
    host: db.HOST,
    dialect: db.dialect,
    operatorsAliases: false,
    pool: {
        max: db.pool.max,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle,
    }
}
);

sequelize.authenticate()
    .then(() => {
        console.log("Connection established");
    })
    .catch(err => {
        console.error("Error while connecting to database", err);
    })

const database = {}
database.sequelize = Sequelize;
database.sequelize = sequelize;

database.users = require("../model/user.model.js")(sequelize, DataTypes) // table name
database.sequelize.sync({ force: false })
    .then(() => {
        console.log("Sync successful");
    })

module.exports = database;