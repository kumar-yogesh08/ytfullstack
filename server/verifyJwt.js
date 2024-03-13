import Jwt  from "jsonwebtoken";
import { errorApi } from "./errorApi.js";
export const verifyJwt=(req,res,next)=>{
    const token=req.cookies.access_Token;
    if(!token) return next(errorApi(401,"Not Authenticated"))
    Jwt.verify(token,process.env.JWTSECRETKEY,function(err,user){
     if(err)
     {
        return next(errorApi(403,"Token not valid"))
     }
     req.user=user;
     next()
    })
    
}