const {VerifyToken}=require("../Setup");
const MiddleWare=(req,res,next)=>{
    
    const header=req.headers.token;

    if(!header){
        res.status(404).json("wrong credentials")
    }else{
        const check=VerifyToken(header.split(" ")[1]);
        if(check!==null){
            req.user=check;
    

            next()
        }else{
        res.status(404).json("wrong credentials")

        }
    }
}
module.exports.AuthAndMiddleware=(req,res,next)=>{
    
    MiddleWare(req,res,()=>{
        if(req.user.id===req.params.id){
            next()
        }else{
            res.status(404).json("seems you are not a user please sign up")

        }
    })
}
module.exports.VerifyAdminMiddleware=(req,res,next)=>{
    MiddleWare(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(404).json("seems you are not a user please sign up")

        }
    })
}