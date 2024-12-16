// Joi Schema for validation
const Joi = require('joi');

const userRequestDto = Joi.object({
  fullname: Joi.string().required(),
  mobileNumber: Joi.string().pattern(new RegExp(/^[6-9]\d{9}$/)).required(),
  password: Joi.string().min(6).required(),
});

module.exports = userRequestDto;