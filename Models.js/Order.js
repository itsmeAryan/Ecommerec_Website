const mongoose=require("mongoose");
const Sceham=mongoose.Schema({
    userid:{type:String,required:true,alias:"name"},
     products:[
         {
             productid:{type:String},
             qty:{type:Number,default:1},
             
        
        }
     ],
     amount:{type:Number,required:true},
     address:{type:Object,required:true},
     Status:{type:String,default:"pending"},

},{timestamps:true});

module.exports=mongoose.model("order",Sceham);