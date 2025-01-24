import Router from 'express';
import friendController from '../controllers/friendController';
import authMiddleware from '../auth/middlewares/authMiddlewareREST';

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

router.post('/sendFriendRequest', (req, res, next) => {
  friendController.sendFriendRequest(req, res, next).catch(next);
});

router.post('/acceptFriendRequest', (req, res, next) => {
  friendController.acceptFriendRequest(req, res, next).catch(next);
});

router.get('/getFriendRequests', (req, res, next) => {
  friendController.getFriendRequests(req, res, next).catch(next);
});

export default router;
