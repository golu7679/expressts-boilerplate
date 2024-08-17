import dayjs from 'dayjs';
import { createWriteStream } from 'node:fs';
import { format } from 'node:util';

const logFileCreator = (filename: string, ...data) => {
  const currentDate = dayjs().format('DD_MM_YYYY');

  const file = createWriteStream(`${__dirname}/../logs/${filename}_${currentDate}.log`, {
    flags: 'a+',
  });

  file.write(`${dayjs().format('HH:mm:ss')} ${format(...data)}\n`);
};

export const errorLogging = (...data) => {
  console.log('Error Data: ', ...data);
  logFileCreator('error', ...data);
};
