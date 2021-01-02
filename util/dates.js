console.log('dates');
const user = '2020-12-25';
let date = new Date(user);

const today = date.getDate();
console.log(today);

for(i=0 ; i<5 ; i++){
  date.setDate(today+i);
  
  console.log(date);
}
