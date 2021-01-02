const db = require('./database');

// specify starting date for database
let date = new Date('2021-03-01');

const today = date.getDate();

for(i=1 ; i<30 ; i++ ){
  date.setDate(today + i);

  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  let d = date.getDate();

  db.execute(`INSERT INTO patna_booking(B_DATE) VALUES('${y}-${m}-${d}')`);
}

console.log('DONE');












// INSERT INTO ABC(B_DATE, A_1) VALUES('2020-05-03', 1);

// UPDATE ABC
// SET A_1=1
// WHERE B_DATE='2020-05-02';