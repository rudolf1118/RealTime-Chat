import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../token/config";
import { Request, Response } from "express";

const { secret } = config;
export default function (roles: string[] | any) {
    return (function (req: Request | any, res: Response | any, next: NextFunction | any) {
        if (req.method === "OPTIONS") {
            next();
        }
        try{
            const token = (req?.headers?.Authorization || req?.headers?.authorization || req?.headers?.au).split(" ")[1];
            if (!token) {
                return (res.status(403).json({message:"credential are invalid or forbidden"}));
            }
            const {roles:arrayOfRoles} = jwt.verify(token, secret) as {roles: string[]};
            console.log(arrayOfRoles);
            let hasRole = false;
            arrayOfRoles.forEach((role)=>{
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return (res.status(403).json({message:"forbidden"}));
            }
            next();
        } catch(e){
            console.error(e);
            return (res.status(403).json({message:"Authorization was not found/forbidden or expired"}));
        }
    })
}