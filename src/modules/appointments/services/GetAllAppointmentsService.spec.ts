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

  it('Should return a list of appointments', async () => {
    const setMonthMay = 5 - 1;

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, setMonthMay, 10, 7).getTime();
    });

    await createAppointmentService.execute({
      date: new Date(2020, setMonthMay, 10, 12),
      user_id: 'user-id',
      provider_id: 'provider-id-1',
    });

    await createAppointmentService.execute({
      date: new Date(2020, setMonthMay, 10, 13),
      user_id: 'user-id',
      provider_id: 'provider-id-2',
    });

    const appointments = await getAllAppointmentsService.execute();

    expect(appointments.length).toBe(2);

    expect(appointments[0]).toHaveProperty('id');
    expect(appointments[1]).toHaveProperty('id');

    expect(appointments[0].provider_id).toEqual('provider-id-1');
    expect(appointments[1].provider_id).toEqual('provider-id-2');

    expect(appointments[0].date).toEqual(new Date(2020, setMonthMay, 10, 12));
    expect(appointments[1].date).toEqual(new Date(2020, setMonthMay, 10, 13));
  });
});
