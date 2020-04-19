import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointmentByDate = await this.findOne({
      where: { date },
    });

    return findAppointmentByDate || null;
  }
}

export default AppointmentsRepository;
