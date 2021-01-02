const roomdb = require('../models/roomdb');
const bookingdb = require('../models/booking');

exports.getRoomBookingsDelhi = (req, res, next) => {
  // bookingdb.getAvailableRoomsDelhi('2020-12-25');
  res.render('roombookingdelhi', {
    home: false
  });
}

exports.getRoomBookingsPatna = (req, res, next) => {
  res.render('roombookingpatna', {
    home: false
  });
}

exports.postRoomBookings = (req, res, next) => {
  const location = req.params.location;
  const date = req.body.date;
  const totalAmount = parseInt(req.body.totalamt);
  const rooms = JSON.parse(req.body.rooms);
  const userName = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const nationality = req.body.nationality;
  const phone = parseInt(req.body.phone);

  const hotel_id = location === 'delhi' ? 1:2;

  console.log(hotel_id, date, totalAmount, rooms, userName, email, nationality, address);
  roomdb.bookRoom(userName, email, address, phone, nationality, hotel_id, rooms, date, totalAmount);
  if(hotel_id === 1){
    bookingdb.delhiBooking(rooms, date);
  } else {
    bookingdb.patnaBooking(rooms, date);
  }
  res.redirect('/');
};

exports.getRoomStatusDelhi = (req, res, next) => {
  const date = req.params.date;
  bookingdb.getAvailableRoomsDelhi(date)
    .then(data => {
      // console.log('room data', data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getRoomStatusPatna = (req, res, next) => {
  const date = req.params.date;
  bookingdb.getAvailableRoomsPatna(date)
    .then(data => {
      // console.log('room data', data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    })
}