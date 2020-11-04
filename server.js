
const express = require("express")
const app = express()
require('dotenv').config();
const mongoose = require("mongoose")


require('./models/user')
require('./models/post')



app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/menu'))



const MONGOURI = process.env.MONGOURI;
const PORT = 5000||process.env.PORT;


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected" ,()=>{
    console.log("connected to MONGODB")
})
mongoose.connection.on("error" ,(err)=>{
    console.log("error detcted" , err)
})


app.get('/',(req,res)=>{
   res.send("HOMEPAGE")
})

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})