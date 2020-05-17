import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllAppointments(): Promise<Appointment[]> {
    const appointments = this.appointments;
    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentByDate = this.appointments.find(
      appoitment => appoitment.date.getTime() === date.getTime(),
    );

    return findAppointmentByDate;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      date,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
