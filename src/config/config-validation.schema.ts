import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().default(3306).required(),
  HTTP_PORT: Joi.number().default(3000).required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().default(7200).required(),
});
