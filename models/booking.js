const db = require('../util/database');


function mapping(roomno) {
  switch(roomno){
    case 101 : return 'A1';
    case 102 : return 'A2';
    case 103 : return 'A3';
    case 201 : return 'B1';
    case 202 : return 'B2';
    case 203 : return 'B3';
    case 301 : return 'C1';
    case 302 : return 'C2';
    case 303 : return 'C3';
  }
}

function maptoroom(key) {
  switch(key) {
    case 'A1' : return 101;
    case 'A2' : return 102;
    case 'A3' : return 103;
    case 'B1' : return 201;
    case 'B2' : return 202;
    case 'B3' : return 203;
    case 'C1' : return 301;
    case 'C2' : return 302;
    case 'C3' : return 303;
  }
  return 0;
}

exports.delhiBooking = (rooms, bdate) => {
  rooms.forEach(room => {
    room = parseInt(room);
    const roomKey = mapping(room);
    // console.log('date - ', bdate, 'rk- ', roomKey);
    db.execute(`
        UPDATE delhi_booking
        SET ${roomKey}=1
        WHERE B_date='${bdate}'
      `)
        .then(() => {
          // console.log('updated');
        })
        .catch((err) => {
          console.log(err);
        });
  });
}
exports.patnaBooking = (rooms, bdate) => {
  rooms.forEach(room => {
    room = parseInt(room);
    const roomKey = mapping(room);
    db.execute(`
        UPDATE patna_booking
        SET ${roomKey}=1
        WHERE B_date='${bdate}'
      `)
        .then(() => {
          // console.log('updated');
        })
        .catch((err) => {
          console.log(err);
        });
  });
}

// exports.delhiBookinglong = (rooms, bdate, daysCount) => {
//   const date = new Date(bdate);
//   const userDate = date.getDate();

//   rooms.forEach(room => {
//     room = parseInt(room);
//     let i;
//     for(i=0; i<daysCount; i++){
//       date.setDate(userDate + i );
      
//       let y = date.getFullYear();
//       let m = date.getMonth() +1;
//       let d = date.getDate();

//       const roomKey = mapping(room);
//       db.execute(`
//         UPDATE delhi_booking
//         SET ${roomKey}=1
//         WHERE B_date='${y}-${m}-${d}'
//       `)
//         .then(() => {
//           // console.log('updated');
//         })
//         .catch(() => {
//           console.log('not updated booking table');
//         });
//     }
//   });
// };


exports.getAvailableRoomsDelhi = async (date) => {
  const [result] = await db.execute(`SELECT * FROM delhi_booking WHERE b_date='${date}'`);
  const bookingdb = result[0];
  let bookingDetails = {};

  for(let key in bookingdb){
    let roomno = maptoroom(key);
    bookingDetails[roomno] = bookingdb[key];
  }

  // console.log(bookingDetails);
  return bookingDetails;
}


exports.getAvailableRoomsPatna = async (date) => {
  const [result] = await db.execute(`SELECT * FROM patna_booking WHERE b_date='${date}'`);
  const bookingdb = result[0];
  let bookingDetails = {};

  for(let key in bookingdb){
    let roomno = maptoroom(key);
    bookingDetails[roomno] = bookingdb[key];
  }

  // console.log(bookingDetails);
  return bookingDetails;
}

// update patna_booking
// set a1=1, b1=1
// where b_date='2020-12-25';