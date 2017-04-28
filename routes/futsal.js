var express = require('express');
var router = express.Router();
const util = require('../helpers/util');
const futsalController = require('../controllers/futsalControllers');

router.post('/', util.isValidUserOrAdmin, futsalController.place);

module.exports = router;
