export const imageFileFilter = (_req: any, file: { mimetype: string }, done: (arg0: Error, arg1: boolean) => void) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    done(null, true);
  } else {
    done(new Error('file type not supported'), false);
  }
};

export const pdfFileFilter = (_req: any, file: { mimetype: string }, done: (arg0: Error, arg1: boolean) => void) => {
  if (file.mimetype === 'application/pdf') {
    done(null, true);
  } else {
    done(new Error('file type not supported'), false);
  }
};
