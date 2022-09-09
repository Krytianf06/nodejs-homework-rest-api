const Joi = require("joi");

const contactValid = Joi.object({
    name: Joi.string().min(4).max(70).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
  });

  module.exports = {
    contactValid,
};