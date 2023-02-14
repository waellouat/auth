var jwt =require("jsonwebtoken");
const userSchema=require('../model/user');



exports.IsAuth=async(req,res,next)=>{
try{
const token =req.header('authorized')
var decoder = jwt.verify(token,process.env.privteKey)
if(!decoder){return res.status(400).send({msg:'you are not welcome'})}
const user =await userSchema.findById(decoder.id)
req.user=user
next()


}catch(err){
res.status(500).send({msg:'you cant do it auth part'})
}
}