import express  from "express";
import { addVideo, addView, deleteVideo, getByTags, getVideo, randomVideo, search, subVideo, trendVideo, updateVideo } from "../controllers/video.controller.js"
import { verifyJwt } from "../verifyJwt.js";
const router=express.Router();
router.post('/',verifyJwt,addVideo)
router.put('/:id',verifyJwt,updateVideo)
router.delete('/:id',verifyJwt,deleteVideo)
router.get('/find/:id',getVideo)
router.put('/view/:id',addView)
router.get('/random',randomVideo)
router.get('/trend',trendVideo)
router.get('/sub',verifyJwt,subVideo)
router.get('/tags',getByTags)
router.get('/search',search)


export default router;