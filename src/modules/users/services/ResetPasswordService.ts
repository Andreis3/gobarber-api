import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

// import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreateAt = userToken.created_at;

    if (differenceInHours(new Date(Date.now()), new Date(tokenCreateAt)) > 2) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
