import { verify } from 'jsonwebtoken';
import { logger } from '@config/winston-logger';
import { errorLogging } from '@config/logger';
import type { NextFunction, Response } from 'express';
import type { RequestWithUser } from '@common/interface';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';

export const userAuthentication = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    logger.warn(token);
    if (token) {
      const verifyUser: any = verify(token, process.env.JWT_SECRET);
      const tokenUser: any = {};

      if (!tokenUser)
        return response.status(401).json({
          status: 401,
          message: 'Please login to access',
        });
      const user = { ...tokenUser.user, ...tokenUser.user['user'] };
      if (user?.new_user) {
        return response.status(401).json({
          statu: 401,
          message: 'Please complete your profile',
        });
      }
      if (!user || user?.disabled)
        return response.status(401).json({
          status: 401,
          message: 'Please login to access',
        });

      request.token = token;
      request.user = user;
      next();
    } else {
      response.status(401).json({
        status: 401,
        message: 'Please login to access',
      });
    }
  } catch (error) {
    console.log(error);
    response.status(401).json({
      status: 401,
      message: 'Please login again to access',
    });
    errorLogging(request.path, request.body, error);
  }
};
