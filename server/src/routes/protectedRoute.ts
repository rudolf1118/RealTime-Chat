import Router from 'express';
import verifyToken from '../auth/middlewares/authMiddleware';

const protectedRouter = Router();
protectedRouter.get('/', verifyToken, (req: any, res: any) => {
    res.status(200).json({ message: 'Protected route accessed' });
    });

export default protectedRouter;