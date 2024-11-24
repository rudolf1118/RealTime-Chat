import config from "../token/config";
import jwt from "jsonwebtoken";

const { secret } = config;
const { verify } = jwt;
import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
     if (req.method === "OPTIONS") {
         next();
     }
     try{
       const token = (req?.headers?.Authorization || req?.headers?.authorization || req?.headers?.au).split(" ")[1];
       if (!token) {
           return (res.status(403).json({message:"credential are invalid or forbidden"}));
       }
       const decodedData = verify(token, secret);
       req.user = decodedData;
       next();
     } catch(e){
         console.error(e);
         return (res.status(403).json({message:"Authorization was not found/forbidden or expired"}));
     }
}