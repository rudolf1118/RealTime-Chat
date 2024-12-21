export interface Message_Controller {
    getMessages(req: Request, res: Response): Promise<any>;
    createMessage(messageData: any, socket: any): Promise<any>;
}

export interface Auth_Controller {
    register(req: Request, res: Response, next: any): Promise<any>;
    login(req: Request, res: Response, next: any): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}

export interface Friend_Controller {
    addFriend(req: Request, res: Response, next: any): Promise<any>;
    getFriendById(req: Request, res: Response, next: any): Promise<any>;
    getFriendsList(req: Request, res: Response, next: any): Promise<any>;
}