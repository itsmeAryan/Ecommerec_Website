const {VerifyAdminMiddleware,AuthAndMiddleware}=require("./MiddleWare")

const Cart = require("../Models.js/Cart");
const Router=require("express").Router();
Router.post("/",AuthAndMiddleware,async(Req,res)=>{
try {
    const data=await Cart.create(Req.body);
    res.status(200).json(data)
} catch (error) {
    res.status(404).json(error.message)
}
})
Router.put("/:id",AuthAndMiddleware,async(req,res)=>{
  
    

    try {
        const id=req.params.id
        const data=await Cart.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
    
});
Router.delete("/:id",AuthAndMiddleware,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted...")
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/find/:uid",AuthAndMiddleware,async(req,res)=>{
    try {
      const data =await Cart.findOne({userId:req.params.uid});
      data.password=undefined;
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/all",VerifyAdminMiddleware,async(req,res)=>{
   

    try {
       const Cart=await Cart.find()

     res.status(200).json(Cart)

    } catch (error) {
        res.status(404).json(error.message)
    }
});

module.exports=Router;