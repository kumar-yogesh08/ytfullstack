import express  from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.controller.js"
import { verifyJwt } from "../verifyJwt.js";
const router=express.Router();
router.post('/',verifyJwt,addComment)
router.delete('/:id',verifyJwt,deleteComment)
router.get('/:videoId',getComment)
export default router;