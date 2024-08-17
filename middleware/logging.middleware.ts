import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import { createWriteStream } from 'node:fs';

export const loggingMiddleware = (request: Request, _response: Response, next: NextFunction) => {
  const currentDate = dayjs().format('DD_MM_YYYY');

  const file = createWriteStream(`${process.cwd()}/logs/request_data_${currentDate}.log`, {
    flags: 'a+',
  });
  file.write(`
Time: ${dayjs().format('HH:mm:ss')} 
  Url: ${request.url}
  Token: ${JSON.stringify(request.headers.authorization)}
  Query: ${JSON.stringify(request.query)}
  Param: ${JSON.stringify(request.params)}
  Body: ${JSON.stringify(request.body)}
    `);

  next();
};
