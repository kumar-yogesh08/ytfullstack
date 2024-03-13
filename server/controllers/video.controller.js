import { errorApi } from "../errorApi.js";
import Video from "../models/video.model.js"
import User from "../models/users.model.js"

export const addVideo=async(req,res,next)=>{
const newVideo=new Video({userId:req.user.id,...req.body})
try {
    const savedVideo=await newVideo.save();
res.status(200).json(savedVideo)
} catch (error) {
   next(error)
}

}
export const updateVideo=async(req,res,next)=>{
    const video=await Video.findById(req.params.id)
    if(!video) return next(404,"Video not found")
    if(req.params.id===req.user.id)
    try {
        {
            const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).send("Video has been updated successfully")
        }
    } catch (error) {
        next(errorApi(403,"You can update only your videos"))
    }
}
export const deleteVideo=async(req,res,next)=>{
    const video=await Video.findById(req.params.id)
    if(!video) return next(404,"Video not found")
    if(req.params.id===req.user.id)
    {
        try {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).send("Video has been deleted succeessully")
        } catch (error) {
         next(error)
        }
    }
    else{
        next(errorApi(403,"You can update only your Videos"))
    }
}
export const getVideo=async(req,res,next)=>{
  try {
      let video=await Video.findById({_id:req.params.id})
      if(!video)
      {
        console.log("blaja")
         video=await Video.find({userId:req.params.id})
       
      }
      res.status(200).json(video)

  } catch (error) {
    next(error)
  }
}
export const addView=async(req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("View added successfully")
    } catch (error) {
        next(error)
    }
}
export const trendVideo=async(req,res,next)=>{
    try {
        const videolist=await Video.find().sort({views:-1})
        res.status(200).json(videolist)
    } catch (error) {
        next(error)
    }
}
export const randomVideo=async(req,res,next)=>{
    try {
        const videolist=await Video.aggregate([{$sample:{size:4}}])
        res.status(200).json(videolist)
    } catch (error) {
        next(error)
    }
}
export const subVideo=async(req,res,next)=>{
   try {
     const user=await User.findById(req.user.id)
    const videolist= await Promise.all(user.subscribedTo.map((channelId)=>{
     return  Video.find({userId:channelId})
     }))
     res.status(200).json(videolist.flat.sort((a,b)=>b.createdAt-a.createdAt))
   } catch (error) {
    next(error)
   }
}
export const getByTags=async(req,res,next)=>{
try {
     const query=req.query.tags
     const tags=query.split(",")
     const videolist=await Video.find({tags:{$in:tags}}).limit(20);
     res.status(200).json(videolist)
} catch (error) {
    next(error)
}
}
export const search=async(req,res,next)=>{
    const title=req.query.title
    try {
    const videolist=await Video.find({title:{$regex:title,$options:"i"}}).limit(40)
    res.status(200).json(videolist)
 } catch (error) {
    next(error)
 }
}