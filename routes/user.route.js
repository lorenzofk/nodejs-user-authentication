const express = require('express');
const router = express.Router();
const userResource = require('../resources/user.resources');
const middleware = require('../middleware/validation');
const userCreateSchema = require('../models/validation/rules/user').UserRules;

// Routes used like as RESTful API
router.get('/', userResource.list);
router.get('/:id', userResource.show);
router.delete('/:id', userResource.delete);
router.post('/', middleware(userCreateSchema), userResource.create);

module.exports = router;