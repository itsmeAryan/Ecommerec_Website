// const Router=require("express").Router();
// const stripe=require('stripe')("sk_test_51KSNAVSHXH8pLHpJGIUVvTmhYseNtI3HH7bxnwAesF1umhE9qVmFXS2Q9SHPX47NviuIRPbsBEqykKUDnSiD15p8001gxiSHdg");
// Router.post("/",(req,res)=>{
//     console.log("hello",req.body);
//     stripe.charges.create({
//         source:req.body.tokenId,
//         amount:req.body.amount,
//         currency:"usd"
//     },(err,data)=>{
//         if(err){
//             res.status(404).json(err)
//         }else{
//             console.log(data,'access');
//             res.status(200).json(data)
//         }
//     })
// })



// module.exports=Router;