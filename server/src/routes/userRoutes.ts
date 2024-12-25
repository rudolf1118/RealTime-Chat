import { Router } from 'express';
import authController from '../controllers/authController';
import protectedRoute from './protectedRoute';
import authMiddleware from '../auth/middlewares/authMiddleware';

const router = Router();
router.post('/signup', (req, res, next) => {
  authController.register(req, res, next).catch(next);
});
router.post('/login', (req, res, next) => {
  authController.login(req, res, next).catch(next);
});
router.use('/protected', protectedRoute);

router.get('/token', authMiddleware, (req, res, next) => {
  authController.tokenChecker(req, res, next).catch(next);
});
export default router;
