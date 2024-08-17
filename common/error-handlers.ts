export const fileSizeLimitErrorHandler = (err, _req, res, next) => {
  if (err) {
    res.status(413).json({
      message: 'Maximum file size is 1mb',
    });
  } else {
    next();
  }
};
