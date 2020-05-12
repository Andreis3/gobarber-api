import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes/index';

import '@shared/infra/typeorm';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

function logRequests(request: Request, response: Response, next: NextFunction) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

app.use(logRequests);

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      massage: 'Internal server error',
    });
  },
);

const port = 3333;

app.listen(port, () => {
  console.log(`🚀 Runing service in route: http://localhost:${port}`);
});
