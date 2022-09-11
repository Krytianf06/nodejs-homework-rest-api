const Joi = require("joi");

const userValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().optional(),
  token: Joi.string().optional(),
});

const subscriptionUser = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});


module.exports = {
  userValid,
  subscriptionUser,
};