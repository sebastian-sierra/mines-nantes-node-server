'use strict';

let Joi = require('joi');

module.exports = () => {
  return Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().min(0).max(100),
    phoneNumber: Joi.string().alphanum().min(3).max(12),
    email: Joi.string().email(),
    _id: Joi.string(),
    __v: Joi.number().integer()
  });
};