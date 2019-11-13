const express = require('express');
const router = express.Router();

const userResource = require('../resources/user.resources');
const middleware = require('../middleware/validation');
const userShowSchema = require('../models/validation/rules/user.show').UserShowSchema;
const userCreateSchema = require('../models/validation/rules/user.create').UserCreateSchema;

// Routes used like as RESTful API
router.get('/', userResource.list);
router.delete('/:id', userResource.delete);

router.post('/', middleware(userCreateSchema, 'body'), userResource.create);
router.get('/:id', middleware(userShowSchema, 'params'), userResource.show);

module.exports = router;