'use strict'


module.exports = (sequelize,DataTypes)=>{
const Friend = sequelize.define('friends',{
    friendId:{
type:DataTypes.STRING,
allowNull:false,
unique:true
    }
})
return Friend
}