const express=require("express");
const { connection } = require("./db");
const {propertyRouter}=require("./routes/property.route");
const { userRouter } = require("./routes/user.route");
const { orders } = require("./controller/paymentController");
const { verify } = require("jsonwebtoken");
// const { adminuserRouter } = require("./routes/adminuser.route");
require("dotenv").config();
const cors=require("cors")

const app=express();

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
try {
    return res.status(200).send("Sweeter-Home")
} catch (error) {
    return res.status(400).send({error:error.message})
}
})
app.use("/property",propertyRouter);
app.use("/users",userRouter)
// app.use("/admins",adminuserRouter)
app.post("/orders",orders)
app.post("/verify",verify);
app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Server is running in port 8000")
    }catch(err){
        console.log(err)
    }
})