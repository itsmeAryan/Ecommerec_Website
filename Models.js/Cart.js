const mongoose=require("mongoose");
const Sceham=mongoose.Schema({
    userid:{type:String,required:true,alias:"name",unique:true},
     products:[
         {
             productid:{type:String},
             qty:{type:Number,default:1},
             
        
        }
     ]

},{timestamps:true});

module.exports=mongoose.model("cart",Sceham);