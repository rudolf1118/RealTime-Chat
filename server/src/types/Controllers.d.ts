export interface Controller {
    getMessages(req: Request, res: Response): Promise<any>;
    // postMessage(req: Request, res: Response): Promise<any>;
    postMessage(messageData: any, socket: any): Promise<any>;
}
