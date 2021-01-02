const express = require('express');

const bookingController = require('../controllers/index');

const router = express.Router();

router.get('/', bookingController.getIndex);

module.exports = router;