import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ShortenerController from '@modules/shortener/infra/http/controllers/ShortenerController';

const appointmentsRouter = Router();
const appointmentsController = new ShortenerController();

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      url: Joi.string().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/:shortener_hash', appointmentsController.index);

export default appointmentsRouter;
