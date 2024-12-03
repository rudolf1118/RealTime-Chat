import Router from 'express';
import authController from '../controllers/authController';

const router = Router();
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;