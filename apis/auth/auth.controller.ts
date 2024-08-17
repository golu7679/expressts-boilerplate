import { Request, Response } from 'express';

export const loginMethod = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    return response.status(200).json({
      message: 'logged successfully',
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};
