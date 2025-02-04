import { redisClient } from "../server";
import { logger } from "../utils/logger";
import User from "../models/userModel";
import {CachingEnum, ICache } from "../types/UtilTypes";

class Cache {
    async setCache (candidate:any, value: any, type: CachingEnum): Promise<ICache> {
        if (!candidate || Object.keys(candidate).length <= 0) {
            logger.error("Something went wrong in caching, candidate object is empty...");
            throw new Error;
        }
        if (await redisClient.get(`user:${candidate?.user_id}`)) {
            logger.info(`user:${candidate?.user_id}, already cached`);
            return {
                done: false,
                status: "Already cached",
                message: `${type} already cached, id: ${candidate?.user_id}`
            }
        }
        await redisClient.hSet(`user:${candidate?.user_id}`, {
            ...value
        }).catch((error)=>{
            logger.error("Something went wrong in caching...");
            throw new Error(error);
        });

        logger.info(`user:${candidate?.user_id}, already cached`);

        return {
            done: true,
            status: "Successfully cached",
            message: `${type} successfully cached, id: ${candidate?.user_id}`
        }
    }

    async updateCache (candidate:any, key:string, value: any, type: "user" | "message" | "friends"): Promise<any> {
        if (type === "friends") {
            const userCandidate = candidate?.user_id && await User.findById(candidate?.user_id);
            if (!userCandidate) logger.error(`User not found ${candidate.user_id && `with id:${candidate.user_id}`}.`);
            const friendList = await User.find({ _id: { $in: userCandidate.friends } });
            await redisClient.hDel(`user:${candidate?.user_id}`, "friends").catch((error:any) =>{
                logger.error('Error setting Redis cache:', error);
                return ;
            });
            await redisClient.hSet(`user:${candidate?.user_id}`, parseInt(process.env.REDIS_EXPIRE_TIME), JSON.stringify(friendList)).catch((error:any) =>{
                logger.error('Error setting Redis cache:', error);
                return ;
            });
            logger.error("Caching updated successfully!");
        }
        else if (type === "message") {

        }
    }
}

export default new Cache();
