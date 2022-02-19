const mongoose=require("mongoose");
mongoose.connect("your mongodb url",
{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log(`database connected`);
})
.catch((e)=>{
    console.log("database disconnected ",e.message);
})
