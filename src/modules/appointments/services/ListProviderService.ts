import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
}

interface IUsers {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[] | IUsers[]> {
    let users = await this.cacheProvider.recover<IUsers[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      users = users.reduce<IUsers[]>(
        (prev, curr) => [
          ...prev,
          {
            id: curr.id,
            name: curr.name,
            email: curr.email,
            avatar: curr.avatar,
            created_at: curr.created_at,
            updated_at: curr.updated_at,
          },
        ],
        [],
      );

      console.log('a query no banco foi feita');

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProviderService;
