import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../error/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoed = verify(token, authConfig.jwt.secret);

    const { sub } = decoed as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
