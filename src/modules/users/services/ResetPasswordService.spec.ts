import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  update_at: Date;
}

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '12345678',
      token,
    });

    const updateUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('12345678');
    expect(updateUser?.password).toBe('12345678');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custonDate = new Date();

      return custonDate.setHours(custonDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '12345678',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
