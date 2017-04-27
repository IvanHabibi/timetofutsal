var express = require('express');
var router = express.Router();
const util = require('../helpers/util');
const mapController = require('../controllers/mapController');

router.get('/futsal', util.isValidUserOrAdmin, userController.getAllUser);

module.exports = router;
