export interface NewMessage {
    user_1: {
        id: string,
        username: string
    },
    user_2: {
        id: string,
        username: string
    },
    messages: {
        senderId: string,
        receiver: string,
        text: string,
        status: string
        createdAt: string
    }
    createdAt?: Date;
}
export type  ModuleRes = {
    status: string;
    message: string;
    errors?: any;
    data?: any;
    token?: string;
    friendRequests?: any;
}

export interface ICache {
    done: boolean,
    status: string,
    message: string
}

export enum CachingEnum {
    friends = "friends",
    message = "message",
    user = "user"
}