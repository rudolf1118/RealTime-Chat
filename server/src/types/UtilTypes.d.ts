// export type NewMessage = {
//     senderId: string;
//     receiverId: string;
//     text: string;
//     timestamp: string;
//     _id?: string;
//     __v?: number;
// }

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
export type ModuleRes = {
    status: string;
    message: string;
    errors?: any;
    data?: any;
    token?: string;
    friendRequests?: any;
}