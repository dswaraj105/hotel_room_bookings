const db = require('../util/database');

exports.searchByEmail = (email) => {
  return db.execute('SELECT * FROM BOOKING_DETAILS WHERE C_ID=?', [email]);
}

exports.searchByDate = (date) => {
  return db.execute('SELECT * FROM BOOKING_DETAILS WHERE CHECKIN=?', [date]);
}