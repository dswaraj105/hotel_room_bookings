const admindb = require('../models/admin');

const adminDetails = {
  name : 'marriot@gmail.com',
  password : 123456,
  loggedin : false
}

exports.getAdminLogin = (req, res, next) => {
  res.render('adminlogin', {
    loginFailed : false,
    login: false
  });
};

exports.postAdminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if(email == adminDetails.name && password == adminDetails.password){
    adminDetails.loggedin = true;
    res.render('admin', {
      home : false,
      bookingDetails : [],
      noresult : 'SEARCH TO GET DATA'
    });
  } else {
    res.render('adminlogin', {
      loginFailed : true,
      login : false
    });
  }
}

exports.getAdminPage = (req, res, next) => {
  if(adminDetails.loggedin){
    adminDetails.loggedin = false;
    res.render('admin', {
      home : false,
      bookingDetails : [],
      noresult : 'SEARCH TO GET DATA'
    });
  } else {
    res.render('adminlogin', {
      loginFailed: false,
      login : true
    });
  }
}

exports.postSearchBooking = async (req, res, next) => {
  const email = req.body.email;
  const date = req.body.date;
  let data;

  console.log('search request');
  if(email){
    console.log(email);
    data = await admindb.searchByEmail(email);
  } else {
    console.log(date);
    data = await admindb.searchByDate(date);
  }

  console.log(data[0]);
  res.render('admin', {
    home : false,
    bookingDetails : data[0],
    noresult : 'NO DATA'
  });
}