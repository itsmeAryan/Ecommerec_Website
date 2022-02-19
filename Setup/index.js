const express=require("express");
const app=express();
app.use(express.json());
const StartServer=(Portx)=>{
    if(Portx===undefined|| Portx===''){
        app.listen(process.env.PORT || 3001,()=>{
    console.log(`server started at http://localhost:3001`);

        });
    }else{
        app.listen(Portx,()=>{
    console.log(`server started at http://localhost:${Portx}`);

        })
    }
}
const ConnectDb=()=>{
    require("./AllFiles/Database/connector");
}
const Encryption=(password)=>{
   return require("./AllFiles/Encrypt/Password").Encrypt(password)
}
const Decryption=(encodedPass,password)=>{
    return require("./AllFiles/Encrypt/Password").Decrypt(encodedPass,password);
}
// useing jwt
const CreatToken=(obj)=>{
    return require("./AllFiles/Jwt/Token").CreatToken(obj);
}
const VerifyToken=(token)=>{
    return require("./AllFiles/Jwt/Token").verifyToken(token)
}
module.exports={
    app,StartServer,ConnectDb,Encryption,Decryption,
    CreatToken,VerifyToken
}