const Joi = require('joi');
const schema = require('./user.rules').UserRules;

const validate = (user) => {
    return Joi.validate(user, schema);
};

exports.validate = validate;