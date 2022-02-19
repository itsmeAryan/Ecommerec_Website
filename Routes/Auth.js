
const Router=require("express").Router();
const User=require("../Models.js/User");
const {Encryption,Decryption,CreatToken}=require("../Setup")
Router.post("/register",async(req,res)=>{
    
    try {
        const data=await User.create({
            user:req.body.user,
            email:req.body.email,
            password:Encryption(req.body.password)
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.post("/login",async(req,res)=>{
    try {
        const Exist=await User.findOne({email:req.body.email});
          if(!Exist){res.status(404).json("wrong credentials")}
          else if(Decryption(Exist.password,req.body.password)){
            // method 1  Exist.password=undefined
           const {password,...other}=Exist._doc;
            // method 3 use jwt
            const token=CreatToken({id:Exist._id,isAdmin:Exist.isAdmin});
              res.status(200).json({...other,token})
          }else{
            res.status(404).json("wrong credentials")
          }
     
    } catch (error) {
        res.status(404).json(error.message)
        
    }
})


module.exports=Router;