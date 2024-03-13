import express  from "express";
import {deleteUser, dislikeUser, getUser, likeUser, subscribeUser, unsubscribeUser, updateUser} from "../controllers/user.controller.js";
import { verifyJwt } from "../verifyJwt.js";
const router=express.Router();
//update user
router.put("/:id",verifyJwt,updateUser)

//delete user
router.delete("/:id",verifyJwt,deleteUser)
//get a user
router.get("/:id",getUser)

//subscribe a user
router.put("/sub/:id",verifyJwt,subscribeUser)

//unsubscribe a user
router.put("/unsub/:id",verifyJwt,unsubscribeUser)

//like video
router.put("/like/:videoId",verifyJwt,likeUser)
 
//dislike a video
router.put("/dislike/:videoId",verifyJwt,dislikeUser)

export default router;
