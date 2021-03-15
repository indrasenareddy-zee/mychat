'use strict'


module.exports = (sequelize,DataTypes)=>{
    var Message = sequelize.define('messages',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        content:{
            type:DataTypes.STRING
        },
        to:{
            type:DataTypes.STRING,
            allowNullL:false
        }
    })
    
    return Message
}