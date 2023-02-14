const express=require("express")
const cors=require("cors")
const conectdb = require("./config/connectdb")
const userRouter=require('./routes/user')
const app=express()
const port=5002
app.use(cors())
require('dotenv').config()
app.use(express.json())
conectdb()
app.use('/auth/user',userRouter)
app.listen(port,err=>{
    err?console.log(err):console.log(`go to ${port}`)
})