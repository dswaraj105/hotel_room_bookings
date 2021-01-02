const express = require('express');

const roombookingController = require('../controllers/roombooking');

const router = express.Router();

router.get('/bookrooms/delhi', roombookingController.getRoomBookingsDelhi);

router.get('/bookrooms/patna', roombookingController.getRoomBookingsPatna);

router.get('/bookrooms/details/delhi/:date', roombookingController.getRoomStatusDelhi);

router.get('/bookrooms/details/patna/:date', roombookingController.getRoomStatusPatna);

router.post('/rooms/:location', roombookingController.postRoomBookings);

module.exports = router;