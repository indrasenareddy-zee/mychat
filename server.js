var express = require("express")
var mysql = require("mysql2")
var app = express()

var http = require('http').createServer(app)
var io = require('socket.io')(http);

var ejs = require('ejs')
var db = require("./config/db")
var bodyParser = require("body-parser")
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
var PORT = process.env.PORT || 4000

var userRoute = require("./routes/userRoute")
app.use(express.static('public'))
db.sequelize.sync({
    // force:true
}).then(()=>{
    console.log("sql connection established")
}).catch((err)=>{
    console.log("here")
    
})
app.use("",userRoute)
io.on('connection',(socket)=>{
    console.log("new user connected")
})

app.get('/',(req,res)=>{
    res.render('login.ejs')
})
 http.listen(PORT,(req,res)=>{
    console.log(`runnign on ${PORT}`)
})


