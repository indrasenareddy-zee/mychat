var db = require("../config/db")
const express = require("express");

const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken")
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
    return res.redirect('http://localhost:4000/login')
}

exports.login = async(req,res)=>{
    console.log(req.body)
    if(!req.body.username || !req.body.password){
        return res.redirect('http://localhost:4000/login')
    }
    var user =await  db.users.findOne({
        where:{username:req.body.username}})
    if(!user){
        return res.redirect('http://localhost:4000/login')

    }
    var password =await bcrypt.compare(req.body.password,user.password)
    console.log(user)
    if(!password){
        return res.redirect('http://localhost:4000/login')
    }
    var token = await jwt.sign({username:user.username,id:user.id},'jwtsecret',{expiresIn:"10h"})
user.token = token
user.save()
res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
console.log("innnn")
    return res.redirect("/user/dashboard")

}