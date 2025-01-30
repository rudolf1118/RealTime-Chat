import { redisClient } from "../server";
import { logger } from "../utils/logger";
import User from "../models/userModel";

class Cache {
    async createCache (data:any) {
        if (!data || !(Object.keys(data).length > 0)) {
            logger.error("Couldn't cache user in Redis");
            return ;
        }
        const user = redisClient.hSet(`user:${data?._id}`, {
            id: data?._id
        });
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

/*
*
*     async cachingMessagesToRedis(toCache:any, senderId:string, receiverId:string): Promise<any> {
        try {
            const cachedMessages = await redisClient.get(`${senderId}_${receiverId}_messages`);
            if (cachedMessages) {
                return({status: "already cached", message: `Messages already cached, id: ${senderId}_${receiverId}`});
            }

            await redisClient.setEx(`${senderId}_${receiverId}_messages`, parseInt(process.env.REDIS_EXPIRE_TIME), JSON.stringify(toCache));
            logger.log("cached messages", toCache);
            return toCache;
        } catch (error) {
            logger.log("error in caching friends to redis", error);
            throw error;
        }
    }
* */