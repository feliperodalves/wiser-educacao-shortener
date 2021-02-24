import 'reflect-metadata';
import '@utils/dotenv';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '@utils/errors/AppError';
import routes from '@infra/http/routes';

import '@infra/typeorm';
import '@infra/container';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}!`);
});
