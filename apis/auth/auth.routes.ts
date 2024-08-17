import { validate } from '@middleware';
import { loginValidation } from '@validation/auth/validation';
import { Router } from 'express';
import { loginMethod } from './auth.controller';

const router = Router();

router.post('/login', validate(loginValidation, 'body'), loginMethod);

export default router;
