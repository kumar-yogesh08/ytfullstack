import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app=express();

const connectDb=async()=>{

    await mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("connected to Db");
    }).catch((err)=>{
        throw err
    })
}
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/comment",commentRoutes);

app.use((err,req,res,next)=>{
    const status=err.status||500;
    const message=err.message||"something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})



app.listen(8500,()=>{
    connectDb();
    console.log(`server is listening at 8500`);
})
export default app;