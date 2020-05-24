import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';

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
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[] | IUsers[]> {
    const usersAll = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    const users = usersAll.reduce<IUsers[]>(
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
    return users;
  }
}

export default ListProviderService;
