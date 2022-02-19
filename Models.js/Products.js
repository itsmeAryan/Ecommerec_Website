const mongoose=require("mongoose");
const Sceham=mongoose.Schema({
    title:{type:String,required:true,alias:"name",unique:true},
   desc:{type:String,required:true},
img:{type:String,required:true},
categories:{type:Array,required:true},
size:{type:Array},
color:{type:Array},
price:{type:String,required:true},
instock:{type:Boolean,default:true}

},{timestamps:true});

module.exports=mongoose.model("product",Sceham);