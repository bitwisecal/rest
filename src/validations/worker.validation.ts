import Joi from 'joi';

const getShifts = {
  params: Joi.object().keys({
    workerId: Joi.number().integer()
  }),
  query: Joi.object({
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive()
  })
};

const getWorker = {
  params: Joi.object().keys({
    workerId: Joi.number().integer()
  })
};

export default {
  getShifts,
  getWorker
};
