import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';

// import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviderService = new ListProviderService(fakeUserRepository);
  });

  it('Should be able to list the profile', async () => {
    const loggerUser = await fakeUserRepository.create({
      name: 'John One',
      email: 'johnone@example.com',
      password: '123456',
    });

    const user_two = await fakeUserRepository.create({
      name: 'John two',
      email: 'johntwoexample.com',
      password: '123456',
    });

    const user_tree = await fakeUserRepository.create({
      name: 'John tree',
      email: 'johntree@example.com',
      password: '123456',
    });

    const listProvider = await listProviderService.execute({
      user_id: loggerUser.id,
    });

    delete user_two.password;
    delete user_tree.password;

    delete listProvider[0].created_at;
    delete listProvider[0].updated_at;
    delete listProvider[0].avatar;

    delete listProvider[1].created_at;
    delete listProvider[1].updated_at;
    delete listProvider[1].avatar;

    expect(listProvider.length).toBe(2);
    expect(listProvider).toEqual([user_two, user_tree]);
  });
});
