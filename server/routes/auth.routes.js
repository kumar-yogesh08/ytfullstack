import express  from "express";
import {signin, signup} from "../controllers/auth.controller.js"
const router=express.Router();
//signup
router.post('/signup',signup)

//signin
router.post('/signin',signin)
//google auth
router.post('/google',)

export default router;