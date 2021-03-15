const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { Op, Model, Sequelize } = require("sequelize");

exports.auth = async(req,res,next)=>{
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }  
    // if( !req.headers || !req.headers.authorization || !req.headers.refreshtoken){
    //     return res.status(401).json("token not sent")
    // }
    // const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(
          res.status(401).json({message:'You are not logged in! Please log in to get access.'})
        );
      }
    
    var decoded;
    await jwt.verify(token,"jwtsecret",(err,resp)=>{
        if (err){
            console.log("in")
            return res.status(409).json({message:"invalid token"})
        }
  decoded = resp
    })
    console.log("decoded",decoded)
 var user = await db.users.findOne({
     where:{id:decoded.id}
 })
 if(!user){

 }
 req.user = user

 //sidebar datA
 var iConnectedTo = await db.friends.findAll({
    where:{
        userId:req.user.id
    }
})
var connectedTo = []
iConnectedTo.forEach(async connection=>{
    var use = await db.users.findOne({where:{id:connection.friendId}})
connectedTo.push(use)
})
// var users =   await db.users.findAll({where:{id:'iConnectedTo.friendId'}})
var connectedToMe = await db.friends.findAll({
  
    where:{
        [Op.or]:[
            // {userId:req.user.id}
             {friendId:req.user.id}
        ]
    },
    include:[{
        model:db.users,
        attributes:['id','username']
    }]
})
req.iConnectedTo=connectedTo
req.connectedToMe = connectedToMe
 next()
}
