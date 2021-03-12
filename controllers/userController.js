var db = require("../config/db")

exports.newUser = async(req,res)=>{
    console.log(req.body.username)
    if(!req.body.username){
        return res.redirect('http://localhost:4000')
    }
    // var match = await db.users.findOne({
    //     where:{username:req.body.username}
    // })
    // if(match){
    //     return res.redirect('http://localhost:4000')

    // }
    // var user = await db.users.create({username:req.body.username})
    return res.render("chat.ejs")
}