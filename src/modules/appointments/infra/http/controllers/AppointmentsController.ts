import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GetAllAppointmentsService from '@modules/appointments/services/GetAllAppointmentsService';

class AppointmentsController {
  public async createAppointment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createdAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createdAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    const { id } = appointment;

    return response.status(201).json({ id, provider_id, date, user_id });
  }

  public async findAllAppointments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getAllAppointments = container.resolve(GetAllAppointmentsService);
    const appointments = await getAllAppointments.execute();

    return response.status(200).json({ appointments });
  }
}

export default AppointmentsController;
