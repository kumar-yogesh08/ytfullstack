import Video from "../models/video.model.js";
import Comment from "../models/comment.model.js";
import { errorApi } from "../errorApi.js";
export const addComment=async(req,res,next)=>{
const comment=new Comment({...req.body,userId:req.user.id})
try {
    const savedComment=await comment.save();
    res.status(200).send(savedComment)
} catch (error) {
    next(error)
}
}
export const deleteComment=async(req,res,next)=>{
 try {
    const comment=await Comment.findById(req.params.id)
    // const video=await Video.findById(req.params.id)
    const video=await Video.findById(comment.videoId)
    // console.log(video)
    // if(comment.userId===req.user.id||video.userId===req.user.id)
    //comment owner or video owner can only delete the comment
    if(comment.userId===req.user.id||video.userId===req.user.id)
    {
       await Comment.findByIdAndDelete(req.params.id)
       res.status(200).send("Comment deleted")
    }
    else{
        return next(errorApi(403,"You can delete only your comment"))
    }
 } catch (error) {
    next(error)
 }
}
export const getComment=async(req,res,next)=>{
try {
    const comment=await Comment.find({videoId:req.params.videoId})
    res.status(200).json(comment)
} catch (error) {
    next(error)
}
}