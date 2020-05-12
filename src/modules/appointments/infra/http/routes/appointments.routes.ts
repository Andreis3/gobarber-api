import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateServiceAppointments from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.status(200).json({ appointments });
// });

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createdAppointment = new CreateServiceAppointments(
    appointmentsRepository,
  );

  const appointment = await createdAppointment.execute({
    provider_id,
    date: parseDate,
  });
  const { id } = appointment;
  return response.status(201).json({ id, provider_id, date });
});

export default appointmentsRoutes;
