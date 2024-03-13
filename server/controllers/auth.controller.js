import mongoose from "mongoose"
import User from '../models/users.model.js'
import { errorApi } from "../errorApi.js";
import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

export const signup=async(req,res,next)=>{
// console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser=new User({...req.body,password:hash})
    // console.log(newUser)
    await newUser.save();
    res.status(200).send("The user was created succefully");

} catch (err) {
 next(err) 
}
}
export const signin=async(req,res,next)=>{
    // console.log(req.body);
    console.log(req.body);

        // try {
        //     const payload = { 
        //         userId: 2345, 
        //         username: 'kumar yogesh'
        //     };
            
        //     const secretKey = 'your_secret_key_here';
            
        //     const token = Jwt.sign(payload, secretKey, { expiresIn: '1h' });
        //     console.log(token);
        //     Jwt.verify(token, secretKey, (err, decodedPayload) => {
        //         if (err) {
        //             // Handle invalid token or other errors
        //             console.error('Invalid token:', err);
        //         } else {
        //             // Successfully decoded payload
        //             console.log('Decoded payload:', decodedPayload);
        //         }
        //     });
        try{
           const user=await User.findOne({name:req.body.name});
           if(!user){
            return next(new errorApi(401,"User deosnt exist"))
           }
           const match=await bcrypt.compare(req.body.password,user.password);
           if(!match){
            return next(new errorApi(401,"Invalid credientials")) 
           }
           const token=  Jwt.sign({id:user._id},process.env.JWTSECRETKEY);
           const {password,...data}=user._doc;
           res.cookie("access_Token",token,{
            httpOnly:true
           }).status(200).json(data)

        } catch (err) {
     next(err)
    }
    }
