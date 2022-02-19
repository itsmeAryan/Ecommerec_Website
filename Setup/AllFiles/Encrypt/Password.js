const crypto=require("crypto-js");
module.exports.Encrypt= (password)=>{
    return crypto.AES.encrypt(password,"secretkey").toString();
}
module.exports.Decrypt=(encodedPass,password)=>{
    const hash=crypto.AES.decrypt(encodedPass,"secretkey").toString(crypto.enc.Utf8);
    return hash===password;
}