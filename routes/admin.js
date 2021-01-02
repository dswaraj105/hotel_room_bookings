const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/login', adminController.getAdminLogin);

router.post('/admin/login', adminController.postAdminLogin);

router.get('/admin/details', adminController.getAdminPage);

router.post('/admin/search', adminController.postSearchBooking);

module.exports = router;