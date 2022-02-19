const {StartServer,ConnectDb,app}=require("./Setup");
const User=require("./Routes/User")
const Auth=require("./Routes/Auth")
const Produc=require("./Routes/Products")
const Order=require("./Routes/Order")
const Cart=require("./Routes/Cart")
const cors=require("cors")

StartServer();
ConnectDb();
app.use(cors())
app.use("/api/user",User);
app.use("/api/auth",Auth);
app.use("/api/product",Produc);
app.use("/api/order",Order);
app.use("/api/cart",Cart);
// 
// if(process.env.NODE_ENV==='production'){
    const express=require("express");
    app.use(express.static('client/build'));
    const path=require("path");
    app.get("*",(req,res)=>{
        console.log(path.resolve(__dirname,"client","build","index.html"))

        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
// }
