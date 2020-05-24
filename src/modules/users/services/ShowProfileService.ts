import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
