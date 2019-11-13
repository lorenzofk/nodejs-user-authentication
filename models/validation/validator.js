const Joi = require('joi');

const validate = (body, schema) => {
    return Joi.validate(body, schema);
};

exports.validate = validate;