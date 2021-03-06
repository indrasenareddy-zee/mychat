'use strict'


module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('users',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        username:{
            allowNull:false,
            type:DataTypes.STRING
        },
        password:{
            allowNull:false,
            type:DataTypes.STRING
        },
        token:{
            type:DataTypes.STRING
        }
    })
//     User.associate =(models)=>{
// User.hasMany(models.Friend,{
//     as:'friends',
//     foreignkey:'userId'
// })
// User.hasMany(models.Message,{
//     as:'messages',
//     foreignkey:"userId"
// })
//     }
    return User
}