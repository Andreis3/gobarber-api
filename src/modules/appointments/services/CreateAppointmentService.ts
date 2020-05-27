import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const startAppointmentDate = startOfHour(date);

    if (isBefore(startAppointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment on yourself.");
    }

    if (
      getHours(startAppointmentDate) < 8 ||
      getHours(startAppointmentDate) > 17
    ) {
      throw new AppError(
        "You can't create an appointments between 8am and 5pm ",
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      startAppointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: startAppointmentDate,
    });

    const dateFormated = format(
      startAppointmentDate,
      "dd/MM/yyy 'às' HH:mm'h'",
    );

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormated}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
