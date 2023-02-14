const express=require('express')
const userRouter =express.Router()

const {register,signin}=require('../controllers/user')
const {Validation,loginValidator,registerValidator}=require('../midlleware/expressValidetor')
const {IsAuth}=require('../midlleware/isAuth')


userRouter.post('/signup',registerValidator,Validation,register)

userRouter.post('/signin',loginValidator,signin)

userRouter.get('/getaUser',IsAuth,(req,res)=>{
    res.send(req.user)
})


module.exports = userRouter