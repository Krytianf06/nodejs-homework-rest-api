const Joi = require("joi");

const contactValid = Joi.object({
    name: Joi.string().alphanum().min(4).max(70).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
  });

const contactValidUpdata = Joi.object({
    name: Joi.string().alphanum().min(4).max(70).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
}).or('name', 'email', 'phone','favorite');

  module.exports = {
    contactValid,
    contactValidUpdata,
};