export type NewMessage = {
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
    _id?: string;
    __v?: number;
}

export type ModuleRes = {
    status: string;
    message: string;
    errors?: any;
    data?: any;
    token?: string;
    friendRequests?: any;
}