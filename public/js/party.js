const addButtons = document.querySelectorAll('.add-btn');
const totalBill = document.getElementById('total-bill');
const dateInput = document.getElementById('date');
const bookBtn = document.querySelector('.book-btn');
const modelBackground = document.querySelector('.cover-screen');
const cancelBtn = document.querySelector('.fa-times');


//dinitial data
let total = 0;
let halls = [];
let date = '';


function addHall(amt, hallid) {
    total += amt;
    totalBill.innerHTML = total;
    if(amt>0){
        halls.push(hallid);
    }else{
        index = halls.findIndex(id => id==hallid);
        halls.splice(index, 1);
    }
}

function toggleClasses(element) {
    element.classList.toggle('btn-primary');
    element.classList.toggle('btn-success');
    if(element.innerText === 'ADD'){
        element.innerText = 'ADDED' ;
    }else{
        element.innerText = 'ADD';
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
    let date = dateInput.value;
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

function showBookingConfirmation(){
    const model = document.querySelector('.cover-screen');
    const hallinput = document.getElementById('hall-ids');
    const costinput = document.getElementById('total-cost');
    const dateinput = document.getElementById('book-date');

    hallinput.value = JSON.stringify(halls);
    costinput.value = total;
    dateinput.value = dateInput.value;

    model.classList.remove('hide');
    modelBackground.scrollIntoView({behavior: "smooth"});
}

function cancelConfirmation(){
    const model = document.querySelector('.cover-screen');
    model.classList.add('hide');
}

addButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const element = e.target;
        const amountToAdd = parseInt(element.getAttribute('data-price'));
        const hallid = parseInt(element.getAttribute('data-id'));
        toggleClasses(element);
        if(!element.classList.contains('btn-primary')){
            addHall(amountToAdd, hallid);
        }else{
            addHall(-amountToAdd, hallid);
        }
    });
});

// Event listner for booking button
bookBtn.addEventListener('click', ()=>{
    if (! checkDate()){
        return;
    }
    showBookingConfirmation();
});

// Adding event listeners for removing confimation
cancelBtn.addEventListener('click', cancelConfirmation);

// adding event listner to backdrop of model
modelBackground.addEventListener('click', (e) => {
    if (e.target.classList.contains('cover-screen')){
        cancelConfirmation();
    }
});


// checking date input
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
});