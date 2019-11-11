const Joi = require('joi');

const userSchema = Joi.object().keys({

    // name is required
    // name must be a string
    // name length must be at least 3 characters and must be less than or equal to 50 characters
    name: Joi.string().min(3).max(50).required(),

    // password is required
    // password must be a string
    // password length must be at least 3 characters and must be less than or equal to 255 characters
    password: Joi.string().min(3).max(255).required(),

    // email is required
    // email must be a valid email string
    email: Joi.string().min(5).max(255).required().email(),

    // birthday is not required
    // birthday must be a valid ISO-8601 date
    // dates before Jan 1, 1900 are not allowed
    birthday: Joi.date().max('1-1-1900').iso(),

});

exports.UserRules = userSchema; 