var express = require("express")
var db = require("../config/db")

const { Op, Model, Sequelize } = require("sequelize");
exports.dashboard = async(req,res)=>{
var iConnectedTo = await db.friends.findAll({
    where:{
        userId:req.user.id
    }
    // ,
    // include:[{
    //     model:db.users,
    //     attributes:['id','username']
    // }]
})
var connectedTo = []
iConnectedTo.forEach(async connection=>{
    var use = await db.users.findOne({where:{id:connection.friendId}})
connectedTo.push(use)
})
var connectedToMe = await db.friends.findAll({
  
    where:{
            friendId:req.user.id},
    include:[{
        model:db.users,
        attributes:['id','username']
    }]
})
console.log("iconnectedto:",connectedTo)
console.log("connectedToMe:",connectedToMe)
return res.render("chat.ejs",{user:req.user,iConnected:connectedTo,connectedToMe:connectedToMe})

}

exports.connectToFriend = async(req,res)=>{
    console.log("here")
  console.log(req.body)
  var found = await db.users.findOne({
      where:{username:req.body.username}
  })
  if(!found){
   return res.redirect('/user/dashboard')
  }
  if(req.user.username == found.username){
      console.log("its you")
    return res.redirect('/user/dashboard')
  }
  var alreadyConnected = await db.friends.findOne({
      where:{
          [Op.or]:[
              {
[Op.and]:[
    {userId:req.user.id},
    {friendId:found.id}
]},{
    [Op.and]:[
        {userId:found.id},
        {friendId:req.user.id}
    ]
}]
      }
  })
  if(alreadyConnected){
      console.log("already connected")
      return res.redirect("/user/dashboard")
  }
  var connection =  {
      userId :req.user.id,
      friendId:found.id
  }
  await db.friends.create(connection)
// var connections = await db.friends.findAll({
//     where:{
//         [Op.or]:[{
//             [Op.and]:[
//                 {}
//             ]
//         }]
//     }
// })
return res.redirect("/user/dashboard")
}
exports.openChat = async(req,res)=>{
console.log(req.params.friendId)
var friend = await db.users.findOne({
    where:{
        id:req.params.friendId
    }
})
var messages = await db.messages.findAll({
    where:{
        [Op.or]:[{
            [Op.and]:[
                {to:friend.id},
                {userId:req.user.id}
            ]},{
            [Op.and]:[
                {to:req.user.id},
                {userId:friend.id}
            ]}
        ]
        
    },
    order:[
        ['createdAt','DESC']
    ],
     limit:10,
     
})
console.log("messages",messages)
 return res.render("chatbox.ejs",{
     user:req.user,
     iConnected:req.iConnectedTo,
     connectedToMe:req.connectedToMe,
     friend:friend,
    messages:messages.reverse()})
}

