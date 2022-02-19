const jwt=require("jsonwebtoken");

module.exports.CreatToken=(obj)=>{
    return jwt.sign(obj,"creator",{expiresIn:"1d"});
}
module.exports.verifyToken=(Token)=>{
    try {
      const check=  jwt.verify(Token,"creator",{expiresIn:"1d"});
      return check?check:null;
    } catch (error) {
        return null;
    }
}