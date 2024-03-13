import { errorApi } from "../errorApi.js"
import User from "../models/users.model.js"
import Video from "../models/video.model.js"

export const updateUser=async(req,res,next)=>{
if(req.params.id===req.user.id)
{
try {
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json(updatedUser)
} catch (error) {
    next(error)
}
}
else{
    return next(errorApi(401,"You can update only your account"))
}
}
export const deleteUser=async(req,res,next)=>{
    if(req.params.id===req.user.id)
    {
    try {
        const delteUser=await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted successfully")
    } catch (error) {
        next(error)
    }
    }
    else{
        return next(errorApi(401,"You can update only your account"))
    }
}
export const getUser=async(req,res,next)=>{
  
    try {
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
    
       
}
export const subscribeUser=async(req,res,next)=>{
    //cannot sub to itself
    if(req.params.id===req.user.id)
    {
     next(errorApi(403,"Cannot subscribe to owm channel"))
    }
    const user=await User.findById(req.user.id);
    //cannot sub to channel if already sub
    const match=user.subscribedTo.find((element)=>element===req.params.id)
    if(!match)
    {
        try {
       
            await User.findByIdAndUpdate(req.user.id,{
                $push:{subscribedTo:req.params.id}
            })
            await User.findByIdAndUpdate(req.params.id,{
                $inc:{subscriberNo:1}
            })
            res.status(200).json("User subscribed succesfully")
        } catch (error) {
            next(error)
        }
    }
    else
    {
res.status(403).send("Cannot resubscribe to the same channel")    }
   
    }
   

export const unsubscribeUser=async(req,res,next)=>{
  
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedTo:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscriberNo:-1}
        })
        res.status(200).json("User Unsubscribed succesfully")
    } catch (error) {
        next(error)
    }
    }
   

export const likeUser=async(req,res,next)=>{
const video=await Video.findById(req.params.videoId)
// console.log(video);
const arr=video.likes;
// console.log(arr);
const match=arr.find((element)=>element===req.user.id)
if(!match){
 try {
    await Video.findByIdAndUpdate(req.params.videoId,{
        $push:{likes:req.user.id}
    })
    res.status(200).send("video liked succefully")
} catch (error) {
    next(error)
}
}
else{
    try {
        // const video=await Video.findByIdAndUpdate(req.params.videoId,{
        //     $addToSet:{likes:req.user.id}
        //     $pull:{dislikes:req.user.id} pulls dislikes when liked back
        // })
        const video=await Video.findByIdAndUpdate(req.params.videoId,{
            $pull:{likes:req.user.id}
        })
        res.status(200).send("video like removed succefully")
    } catch (error) {
        next(error)
}
}
}
export const dislikeUser=async(req,res,next)=>{
    const video=await Video.findById(req.params.videoId)
    // console.log(video);
    const match=video.dislikes.find((element)=>element===req.user.id)
    // console.log(match)
    if(!match){
    try {

        await Video.findByIdAndUpdate(req.params.videoId,{
            $push:{dislikes:req.user.id}
        })
        res.status(200).send("video disliked succefully")
    } catch (error) {
        console.log(error);
        next(error)
    }
}
else{
    try {
        const video=await Video.findByIdAndUpdate(req.params.videoId,{
            $pull:{dislikes:req.user.id}
        })
        res.status(200).send("video disliked removed succefully")
    } catch (error) {
        next(error)
    }
}
}
