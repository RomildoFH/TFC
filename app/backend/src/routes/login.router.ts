import { Router } from 'express';
import UserController from '../database/controller/UserContoller';
import UserService from '../database/service/UserService';
import LoginValidate from '../middleware/loginValidation';
import TokenValidation from '../middleware/tokenValidation';

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get('/role', TokenValidation.validateToken, userController.getRole);
userRouter.post('/', LoginValidate.validateRequest, userController.login);

export default userRouter;
