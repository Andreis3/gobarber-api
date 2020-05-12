import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserServices';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();
const upload = multer(uploadConfig);

appointmentsRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  const { id } = user;

  return response.status(201).json({ id, name, email });
});

appointmentsRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  },
);

export default appointmentsRoutes;
