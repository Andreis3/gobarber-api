import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

describe('CreateAppointmentService', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('Should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const date = new Date('2021-05-15T02:00:00.000Z');

    await createAppointmentService.execute({
      date,
      provider_id: '123456789',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
