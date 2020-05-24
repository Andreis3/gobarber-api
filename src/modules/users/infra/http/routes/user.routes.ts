import { Router } from 'express';
import multer from 'multer';

import UserController from '@modules/users/infra/http/controllers/UserController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRoutes.post('/', userController.createUser);

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.updateUserAvatar,
);

export default userRoutes;
