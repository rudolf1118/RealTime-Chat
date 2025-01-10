import Router from 'express';
import messageController from '../controllers/messageController';
import authMiddleware from "../auth/middlewares/authMiddlewareREST";

const router = Router();
router.get('/', authMiddleware, messageController.getMessages);

export default router;