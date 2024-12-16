const Joi = require("joi");

const LoginRequestDto = Joi.object({
  username: Joi.string()
    .pattern(new RegExp(/^[6-9]\d{9}$/))
    .required(),
  password: Joi.string().min(6).required(),
});

module.exports = LoginRequestDto;
