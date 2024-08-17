import { Connection, connect } from 'mongoose';
import { logger } from './winston-logger';
import { errorLogging } from './logger';

let db: Connection['db'];

connect(process.env.DATABASE_URL!, {
  dbName: process.env.DATABASE_NAME!,
})
  .then(result => {
    logger.info(`Connected : ${result.connection.db.namespace}`);
    db = result.connection.db;
  })
  .catch(error => {
    logger.error('Database connection issue, ', error);
    errorLogging(error);
  });

export { db };
