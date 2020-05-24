import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserServices';

class UserController {
  public async createUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const { id, created_at, updated_at } = user;

    return response
      .status(201)
      .json({ id, name, email, created_at, updated_at });
  }
}

export default UserController;
