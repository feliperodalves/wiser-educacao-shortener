import { Router } from 'express';
import shortenerRoutes from '@modules/shortener/infra/http/routes/shortener.routes';

const routes = Router();

routes.use('/', shortenerRoutes);

export default routes;
