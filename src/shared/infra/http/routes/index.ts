import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/user.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRoutes);

routes.use('/appointments', appointmentsRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
