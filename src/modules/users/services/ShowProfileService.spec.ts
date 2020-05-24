import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('Should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const showUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(user).toEqual(showUser);
    expect(user.name).toBe(user.name);
    expect(user.email).toBe(user.email);
  });

  it('Should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
