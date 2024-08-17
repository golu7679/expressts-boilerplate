import 'dotenv/config';
import '@config/db';

import bodyParser from 'body-parser';
import express, { Router } from 'express';
import { Express, NextFunction, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { morganMiddleware } from '@middleware';
import { logger } from '@config/winston-logger';

const app: Express = express();
const PORT = +process.env.PORT || 3000;

import { loggingMiddleware } from '@middleware';
import routes from 'apis/routes';

// Middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(morganMiddleware);

// security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", `http://localhost:${process.env.PORT}`],
        'img-src': ["'self'", `http://localhost:${process.env.PORT}`],
      },
    },
    crossOriginResourcePolicy: false,
  }),
);

app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Permissions-Policy', '');
  next();
});
// app.set('trust proxy', 1); // for session

// to access files
app.use(express.static('public'));
app.use('/assets', express.static('assets'));
app.use('/.well-known', express.static('.well-known'));
app.use('/favicon.ico', express.static('favicon.ico'));

app.set('view engine', 'ejs');

app.disable('x-powered-by');

app.use(loggingMiddleware);

// database operation logs
// mongoose.set('debug', true);

app.use('/api/v1', routes);

// for (const item of paths) {
//   logger.warn(` Loaded => ${item.apiPath}`);
//   app.use(item.apiPath, item.method);
// }

// Server Listing At
app.listen(PORT, async () => {
  logger.info(`Server is Running at http://localhost:${PORT}`);
});
