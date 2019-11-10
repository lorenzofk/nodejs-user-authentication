var express = require('express');
var router = express.Router();
var userResource = require('../resources/user.resources');

// Routes used like as RESTful API
router.get('/', userResource.list);
router.get('/:id', userResource.show);
router.delete('/:id', userResource.delete);
router.post('/', userResource.create);

module.exports = router;