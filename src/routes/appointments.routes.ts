import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateServiceAppointments from '../services/CreateServiceAppointments';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json({ appointments });
});

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createdAppointment = new CreateServiceAppointments();

    const appointment = await createdAppointment.execute({
      provider,
      date: parseDate,
    });
    const { id } = appointment;
    return response.status(201).json({ id, provider, date });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRoutes;
