import Router from 'express';
import friendController from '../controllers/friendController';
import authMiddleware from '../auth/middlewares/authMiddleware';

const router = Router();
router.use(authMiddleware);
router.post('/addFriend', friendController.addFriend);
router.get('/getFriendsList', friendController.getFriendsList);
// TODO: remove this
router.post('/testFriendAdder', friendController.getFriendById);

export default router;