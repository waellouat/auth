const userSchema=require("../model/user")
const bcrypt = require('bcrypt');
var jwt =require("jsonwebtoken");
exports.register =async(req,res)=>{
    try{
 const {name,email,password} = req.body
const found = await userSchema.findOne({email})
if(found){res.status(400).send({msg:'vous avez deja un compte avec ce mail'})}
 //partie creation un compte
 const newUser=await new userSchema(req.body)
 const saltRounds = 10;
 const salt=bcrypt.genSaltSync(saltRounds);
const hash= bcrypt.hashSync(password,salt);
newUser.password=hash
// partie token
const payload={id : newUser._id}
var token=jwt.sign(payload,process.env.privteKey)




 newUser.save()
 res.status(200).send({msg:'welcme to the groupe',newUser,token})
    }catch(err){
      console.log(err)
      res.status(500).send({msg:'you cant make it'})  
    }
}
exports.signin =async(req,res)=>{
  try{
const {password,email}=req.body
const found=await userSchema.findOne({email})
if(!found){res.status(400).send({msg:'go to signup'})}
const match=await bcrypt.compare(password,found.password)
if(!match){res.status(400).send({msg:'the mdp is false'})}
const payload={ id :found._id}
var token=jwt.sign(payload,process.env.privteKey)
res.status(200).send({msg:'welcme',token,found})
  }catch(err){
    console.log(err)
res.status(500).send({msg:'you cant signin'})
  }
}