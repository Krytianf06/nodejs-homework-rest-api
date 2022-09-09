const Joi = require("joi");

const userValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const subscriptionUser = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});


module.exports = {
  userValid,
  subscriptionUser,
};