const express = require('express');

const partyBookController = require('../controllers/partybooking');

const router = express.Router();

router.get('/party/delhi', partyBookController.getPartyDelhi);

router.get('/party/patna', partyBookController.getPartyPatna);

router.post('/party/:location', partyBookController.postpartybooking);

module.exports = router;