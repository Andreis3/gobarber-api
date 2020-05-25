import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import GetAllAppointmentsService from '@modules/appointments/services/GetAllAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

let getAllAppointmentsService: GetAllAppointmentsService;

describe('GetAllAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    getAllAppointmentsService = new GetAllAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it.only('Should return a list of appointments', async () => {
    await createAppointmentService.execute({
      date: new Date('2021-05-15T02:00:00.000Z'),
      user_id: '1111',
      provider_id: '123456781',
    });

    await createAppointmentService.execute({
      date: new Date('2021-05-15T03:00:00.000Z'),
      user_id: '1111',
      provider_id: '123456789',
    });

    const appointments = await getAllAppointmentsService.execute();

    expect(appointments.length).toBe(2);

    expect(appointments[0]).toHaveProperty('id');
    expect(appointments[1]).toHaveProperty('id');

    expect(appointments[0].provider_id).toEqual('123456781');
    expect(appointments[1].provider_id).toEqual('123456789');

    expect(appointments[0].date).toEqual(new Date('2021-05-15T02:00:00.000Z'));
    expect(appointments[1].date).toEqual(new Date('2021-05-15T03:00:00.000Z'));
  });
});
