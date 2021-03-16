'use strict'
const {Sequelize} = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`${process.env.DBNAME}`,`${process.env.USER}`,`${process.env.PASSWORD}`,{
    dialect:'mysql'
})

const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("../models/users")(sequelize,Sequelize)
db.messages = require("../models/messages")(sequelize,Sequelize)
db.friends = require("../models/friends")(sequelize,Sequelize)
//relations
db.users.hasMany(db.messages)
db.friends.belongsTo(db.users)
db.users.hasMany(db.friends)
// db.messages.belongsTo(db.users)
// db.users.hasMany(db.friends)
// db.messages.hasOne(db.users)
module.exports = db