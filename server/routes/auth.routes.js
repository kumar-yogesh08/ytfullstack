import express  from "express";
import {logout, sigingoogle, signin, signup} from "../controllers/auth.controller.js"
const router=express.Router();
//signup
router.post('/signup',signup)

//signin
router.post('/signin',signin)
//logout
router.post('/logout',logout)
//google auth
router.post('/google',sigingoogle)

export default router;