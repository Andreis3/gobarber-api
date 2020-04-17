import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateServiceAppointments from '../services/CreateServiceAppointments';

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.status(200).json({ appointments });
});

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createdAppointment = new CreateServiceAppointments(
      appointmentsRepository,
    );

    const appointment = createdAppointment.execute({
      date: parseDate,
      provider,
    });

    return response.status(201).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRoutes;
