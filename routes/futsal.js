var express = require('express');
var router = express.Router();
const util = require('../helpers/util');
const futsalController = require('../controllers/futsalControllers');

router.post('/', futsalController.place);

module.exports = router;
