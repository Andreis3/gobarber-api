import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IAppointment {
  id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class GetAllAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IAppointment[]> {
    const allAppointments = await this.appointmentsRepository.findAllAppointments();

    const appointments = allAppointments.reduce<IAppointment[]>(
      (prev, curr) => [
        ...prev,
        {
          id: curr.id,
          provider_id: curr.provider_id,
          date: curr.date,
        },
      ],
      [],
    );

    return appointments;
  }
}

export default GetAllAppointmentsService;
