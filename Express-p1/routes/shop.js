const path = require('path');
const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log(adminData.products);     -->  [ { title: 'Web Developer' }, { title: 'book' } ]
  res.render('shop', {products: adminData.products, title: 'My Shop'});
});

module.exports = router;