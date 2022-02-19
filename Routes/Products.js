const {VerifyAdminMiddleware}=require("./MiddleWare")

const Product = require("../Models.js/Products");
const Router=require("express").Router();
Router.post("/",VerifyAdminMiddleware,async(Req,res)=>{
try {
    const data=await Product.create(Req.body);
    res.status(200).json(data)
} catch (error) {
    res.status(404).json(error.message)
}
})
Router.put("/:id",VerifyAdminMiddleware,async(req,res)=>{
  
    

    try {
        const id=req.params.id
        const data=await Product.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
    
});
Router.delete("/:id",VerifyAdminMiddleware,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted...")
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/find/:id",async(req,res)=>{
    try {
      const data =await Product.findById(req.params.id);
      data.password=undefined;
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/all",async(req,res)=>{
    const query=req.query.new;
    const pcategory=req.query.category;

    try {
        let product;
     if(query){
         product=await Product.find().sort({createdAt:-1}).limit(12).sort({price:1})

     }else if(pcategory){
         product=await Product.find({categories:{$in:[pcategory]}})
     }else{
         product=await Product.find();
     }

     res.status(200).json(product)

    } catch (error) {
        res.status(404).json(error.message)
    }
});

module.exports=Router;