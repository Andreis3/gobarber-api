import { Router } from 'express';

import CreateUserService from '../services/CreateUserServices';

const appointmentsRoutes = Router();

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRoutes;
