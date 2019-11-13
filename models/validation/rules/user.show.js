const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object().keys({

    // id is required
    // id should be a valid ObjectId
    id: Joi.objectId(),

});

exports.UserShowSchema = schema; 