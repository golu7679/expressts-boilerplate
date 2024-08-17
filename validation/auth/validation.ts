import Joi from 'joi';

export const loginValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
