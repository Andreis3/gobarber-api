import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
    );
  });

  it('Should be able to create a new appointment', async () => {
    const setMonthMay = 5 - 1;

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, setMonthMay, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, setMonthMay, 10, 14),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('Should not be able to create two appointment on the same time', async () => {
    const setMonthMay = 5 - 1;

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, setMonthMay, 10, 12).getTime();
    });

    await createAppointmentService.execute({
      date: new Date(2020, setMonthMay, 12, 16),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, setMonthMay, 12, 16),
        user_id: 'user-id-2',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    const setMonthMay = 5 - 1;
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, setMonthMay, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, setMonthMay, 10, 11),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const setMonthMay = 5 - 1;

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, setMonthMay, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, setMonthMay, 10, 13),
        user_id: 'user-id',
        provider_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    const setMonthMay = 5 - 1;

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, setMonthMay, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, setMonthMay, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, setMonthMay, 11, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
