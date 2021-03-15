'use strict'


module.exports = (sequelize,DataTypes)=>{
const Friend = sequelize.define('friends',{
    friendId:{
type:DataTypes.STRING,
foreignKey:true,
allowNull:false,
    }
    // userId:{
    //     type:DataTypes.STRING,
    //     allowNull:false,
    // }
})
// Friend.associate = (models)=>{
//  Friend.belongsTo(models.User,{
//      as:'friend',
//      foreignKey:'userId'
//  })
// }
return Friend
}