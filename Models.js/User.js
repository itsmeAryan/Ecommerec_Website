const mongoose=require("mongoose");
const Sceham=mongoose.Schema({
    user:{type:String,required:true,alias:"name"},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    img:{type:String}
},{timestamps:true});
module.exports=mongoose.model("user",Sceham);