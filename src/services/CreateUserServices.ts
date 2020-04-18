import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute(data: Request): Promise<User> {
    const { name, email, password } = data;

    const userRepository = getRepository(User);

    const chegckUserExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (chegckUserExists) {
      throw new Error('Email address already used');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
