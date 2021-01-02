const addButtons = document.querySelectorAll('.add-btn');
const roomList = document.querySelector('.page-ul');
const dateInput = document.getElementById('date');
const bookBtn = document.querySelector('.book-btn');
const modelBackground = document.querySelector('.cover-screen');
const cancelBtn = document.querySelector('.fa-times');

// data about bookings
let total = 0;
let roomIds = [];
let date = '';

function showUL(){
    roomList.parentElement.classList.remove('hide');
}


function addRoominList(amt, roomid){
    total += amt;
    document.getElementById('total-bill').innerText = total;
    if(amt>0){
        roomIds.push(roomid);
    }else{
        const index = roomIds.findIndex(id => id === roomid);
        roomIds.splice(index, 1);
    }
    console.log(total, roomIds);
}

function deleteRooms(element){
    element.parentElement.parentElement.remove();
    if(roomList.children.length === 0){
        roomList.parentElement.classList.add('hide');
    }
}

// Function to tell to select correct date
function dateLimitError() {
    let errorDate = document.querySelector('.date-error');
    errorDate.classList.remove('hide');
    document.querySelector('.e-text').innerText = "Please Select Date within 2 months from now";
    setTimeout(() => {
        errorDate.classList.add('hide');
    },2000);
    document.querySelector('.booking-header').scrollIntoView({behavior: "smooth"});
}

// Function return true if date selected and also show error if not selected
function checkDate(){
    if (! date){
        let errorDate = document.querySelector('.date-error');
        document.querySelector('.e-text').innerText = "Please Select Date";
        errorDate.classList.remove('hide');
        setTimeout(() => {
            errorDate.classList.add('hide');
        },2000);
        document.querySelector('.booking-header').scrollIntoView({behavior: "smooth"});
        return false;
    }
    if(date == 'error'){
       dateLimitError();
        return false;   
    }
    return true;
}

function addRooms(name, prise){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`ROOM ${name}`));
    li.className = 'page-li';
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('price:'));
    const em = document.createElement('em');
    em.appendChild(document.createTextNode(prise));
    span.appendChild(em);
    const btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-small';
    btn.setAttribute('data-price', prise);
    btn.appendChild(document.createTextNode('DELETE'));
    div.appendChild(span);
    div.appendChild(btn);
    li.appendChild(div);
    btn.addEventListener('click', (e) => {
        document.getElementById(name).disabled = false;
        deleteRooms(e.target);
        addRoominList(-prise, name);
    });
    roomList.appendChild(li);
    li.scrollIntoView({behavior: "smooth"});
}

function showBookingConfirmation(){
    if(! checkDate()){
        return;
    }

    const model = document.querySelector('.cover-screen');
    const roomsinput = document.getElementById('room-ids');
    const bookingDateInput = document.getElementById('book-date');
    const totalamt = document.getElementById('total-cost');

    roomsinput.value = JSON.stringify(roomIds);
    bookingDateInput.value = dateInput.value;
    totalamt.value = total;

    model.classList.remove('hide');
    modelBackground.scrollIntoView({behavior: "smooth"});
}

function cancelConfirmation(){
    const model = document.querySelector('.cover-screen');
    model.classList.add('hide');
}

// function to fetch booking details on specified date
function getBookingDetails(date, location){
    fetch(`http://localhost:3000/bookrooms/details/${location}/${date}`)
        .then((res) => res.json())
        .then((data) => {
            showHiddenRooms(data);
            hideRooms(data);
        })
        .catch((err) => {
            console.log(err);   
        });
}

//showing hiden romms
function showHiddenRooms(bookingData) {
    for(let key in bookingData){
        if(key!=0){
            key = key.toString();
            let room = document.getElementById(key);
            if(room.classList.contains('hide')){
                room.classList.remove('hide');
            }
        }
    }
}

//function to hide unavailable rooms
function hideRooms(bookingData) {
    for(let key in bookingData){
        if(bookingData[key] && key!=0){
            key = key.toString();
            document.getElementById(key).classList.add('hide');
        }
    }
}

// Adding event listeners for add room buttons
addButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (! checkDate()){
            return;
        }
        showUL();
        const element = e.target;
        const prise = element.getAttribute('data-prise');
        const name = element.getAttribute('data-no');
        addRooms(name, prise);
        addRoominList(parseInt(prise), name);               // $$$$$$$$$$$$$
        element.disabled = true;
    });
});

// Adding event isteners for confirm booking button
bookBtn.addEventListener('click', showBookingConfirmation);

// Adding event listeners for removing confimation
cancelBtn.addEventListener('click', cancelConfirmation);

// adding event listner to backdrop of model
modelBackground.addEventListener('click', (e) => {
    if (e.target.classList.contains('cover-screen')){
        cancelConfirmation();
    }
});

// adding event listener to date
dateInput.addEventListener('change', (e) => {
    const today = new Date();
    const selectedDate = new Date(e.target.value);
    date = 'error';

    if(today.getFullYear() != selectedDate.getFullYear()){
        e.target.value='';
        dateLimitError();
        return;
    }

    if(Math.abs(selectedDate.getMonth() - today.getMonth()) > 2){
        e.target.value = '';
        dateLimitError();
        return;
    } 

    date = e.target.value;
    const location = e.target.getAttribute('data-location');
    // console.log(date);
    getBookingDetails(date, location);
});
