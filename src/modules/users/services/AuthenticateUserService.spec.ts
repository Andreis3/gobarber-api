import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServices from '@modules/users/services/CreateUserServices';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUserService', () => {
  it('Should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUserServices = new CreateUserServices(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserServices.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUserServices = new CreateUserServices(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserServices.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
