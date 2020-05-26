import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', appointmentsController.findAllAppointments);

appointmentsRoutes.post('/', appointmentsController.createAppointment);

appointmentsRoutes.get(
  '/provider-logger',
  providerAppointmentsController.listAllAppointmentsProvider,
);

export default appointmentsRoutes;
