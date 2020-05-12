import { Router } from 'express';

import sessionsRoutes from './sessions.routes';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './user.routes';

const routes = Router();

routes.use('/users', usersRoutes);

routes.use('/appointments', appointmentsRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
