var db = require("../config/db")
const bcrypt = require('bcrypt');
exports.newUser = async(req,res)=>{
    console.log(req.body)
    if(!req.body.username || !req.body.password){
        return res.redirect('http://localhost:4000')
    }

    var match = await db.users.findOne({
        where:{username:req.body.username}
    })
    console.log(match)
    if(match){
        console.log("inside")
        return res.redirect('http://localhost:4000')
    }
    var password = await bcrypt.hash(req.body.password,10)
    var userr = {
        username:req.body.username,
        password:password
    }
    var user = await db.users.create(userr)
    console.log("here",user)
    return res.render("chat.ejs",{user})
}

exports.login = async(req,res)=>{
    console.log(req.body)
    if(!req.body.username || !req.body.password){
        return res.redirect('http://localhost:4000/login')
    }
    var user =await  db.users.findOne({username:req.body.username})
    if(!user){
        return res.redirect('http://localhost:4000/login')

    }
    var password =await bcrypt.compare(req.body.password,user.password)
    console.log(password)
    if(!password){
        return res.redirect('http://localhost:4000/login')
    }
    return res.render("chat.ejs",{user})

}