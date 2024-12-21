import Router from 'express';
import authController from '../controllers/authController';
import protectedRoute from './protectedRoute';
import authMiddleware from '../auth/middlewares/authMiddleware';

const router = Router();
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.use('/protected', protectedRoute);
export default router;