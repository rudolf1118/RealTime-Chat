import Router from 'express';
import friendController from '../controllers/friendController';
import authMiddleware from '../auth/middlewares/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.post('/addFriend', (req, res, next) => {
  friendController.addFriend(req, res, next).catch(next);
});
router.get('/getFriendsList', (req, res, next) => {
  friendController.getFriendsList(req, res, next).catch(next);
});

router.delete('/removeFriend', (req, res, next) => {
  friendController.deleteFriend(req, res, next).catch(next);
});

router.get('/getFriendById', (req, res, next) => {
  friendController.getFriendById(req, res, next).catch(next);
});

export default router;
