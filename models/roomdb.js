const { execute } = require('../util/database');
const db = require('../util/database');


exports.bookRoom = async (userName, email, address, phone, nationality, hotel_id, rooms, date, totalAmount) => {
  let [user, filedata] = await db.execute(`SELECT * FROM customer WHERE email=?`, [email]);
  if(user.length === 0){
    await db.execute(`INSERT INTO customer VALUES(?,?,?,?,?)`,[email, userName, address, phone, nationality]);
  }
  
  rooms.forEach(room => {
    room = parseInt(room);

    // filling data in booking_details table for each room
    db.execute(`
      INSERT INTO booking_details(c_id, HOTELID, roomno, checkin, TOTAL_AMOUNT)
      VALUES('${email}', ${hotel_id}, '${room}', '${date}', ${totalAmount})
    `);
  });
}