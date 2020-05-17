import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServices from '@modules/users/services/CreateUserServices';

import AppError from '@shared/errors/AppError';

describe('CreateAppointmentService', () => {
  it('Should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserServices = new CreateUserServices(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserServices.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
  });

  it('Should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

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
      createUserServices.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
