import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from '@modules/appointments/services/ListProviderService';

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderService: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
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
