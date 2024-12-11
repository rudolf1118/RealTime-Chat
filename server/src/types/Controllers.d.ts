export interface Message_Controller {
    getMessages(req: Request, res: Response): Promise<any>;
    createMessage(messageData: any, socket: any): Promise<any>;
}

export interface Auth_Controller {
    register(req: Request, res: Response, next: any): Promise<any>;
    login(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}
