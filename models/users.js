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
    })
    return User
}