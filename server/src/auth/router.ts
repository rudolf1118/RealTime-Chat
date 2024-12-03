import Router from 'express';
import controller from './authController';
import messageController from '../messages/controller';
import { check } from "express-validator";
// import authMiddleware from "./middleware/authMiddleware";
import roleAuthMiddleware from "./utils/middleWare/roleAuthMiddleware";
const router = Router();
router.post ('/registration', [
    check('username', "username can't be an empty").notEmpty(),
    check("password", "password must be more than 5 characters").isLength({min:5})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleAuthMiddleware(["ADMIN", "USER"]), controller.getUsers); // * here you can add another roles with function roleAuthMiddleware.
router.get('/admin/create', controller.createAdmin);
router.get('/users/create', controller.createUser);
router.get('/messages', messageController.getMessages);
// router.post('/messages', messageController.postMessage);

export default router;