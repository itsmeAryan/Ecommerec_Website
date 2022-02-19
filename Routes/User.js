const {AuthAndMiddleware ,VerifyAdminMiddleware}=require("./MiddleWare")
const {Encryption}=require("../Setup");
const User = require("../Models.js/User");
const Router=require("express").Router();
Router.put("/:id",VerifyAdminMiddleware,async(req,res)=>{
    if(req.body.password){
          req.body.password=Encryption(req.body.password);
    }


    try {
        const id=req.params.id
        const data=await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
    
});
Router.delete("/:id",VerifyAdminMiddleware,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted...")
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/find/:id",VerifyAdminMiddleware,async(req,res)=>{
    try {
      const data =await User.findById(req.params.id);
      data.password=undefined;
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/all",VerifyAdminMiddleware,async(req,res)=>{
    const query=req.query.new
    try {
      const data =query?await User.find({}).sort({_id:-1}).limit(5):await User.find({});
      data.password=undefined;
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
});
Router.get("/stats",VerifyAdminMiddleware,async(req,res)=>{
const date=new Date();
const lastyear=new Date(date.setFullYear(date.getFullYear()-1))
try {
    const data=await User.aggregate([
        {$match:{
            createdAt:{
                $gte:lastyear
            }
        }},
        {
            $project:{
                month:{
                    $month:"$createdAt"
                }
            }
        },
        {
            $group:{
                _id:"$month",
                total:{
                    $sum:1
                }
            }
        }
    ])
    res.status(200).json(data)
    
} catch (error) {
    res.status(404).json(error.message)
}
})
module.exports=Router;