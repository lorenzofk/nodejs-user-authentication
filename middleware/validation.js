const validate = require('../models/validation/validator').validate;

const middleware = (schema) => {

    return (req, res, next) => {
        const { error } = validate(req.body, schema);

        if (error) {
            return res.status(422).send({"message": error.details[0].message});
        }

        next();
    };

};

module.exports = middleware;