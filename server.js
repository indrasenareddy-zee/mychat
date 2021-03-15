var express = require("express")
var mysql = require("mysql2")
var app = express()
var cookieParser = require('cookie-parser')

var http = require('http').createServer(app)
var io = require('socket.io')(http);

app.set('view engine','ejs');
var db = require("./config/db")
var bodyParser = require("body-parser")
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
var PORT = process.env.PORT || 4000
app.use(cookieParser())

var userRoute = require("./routes/userRoute")
var authRoute = require("./routes/authRoutes")
var {auth} = require("./middleware/auth")
app.use(express.static('public'))
db.sequelize.sync({
    //    force:true
}).then(()=>{
    console.log("sql connection established")
}).catch((err)=>{
    console.log("here")
})
app.use('/auth',authRoute)
app.use("/user",auth,userRoute)
io.on('connection',(socket)=>{
    console.log("new user connected",socket.id)
    socket.on('chat',async(response)=>{
        console.log(response)
        var newMessage = {
            content:response.content,
            to:response.sentTo,
            userId:response.sentFrom
        }
        await db.messages.create(newMessage)
        io.sockets.emit('chat',response)
    })
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/',(req,res)=>{
    res.render('signup.ejs')
})
 http.listen(PORT,(req,res)=>{
    console.log(`runnign on ${PORT}`)
})


