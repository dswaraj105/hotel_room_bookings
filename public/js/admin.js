const select = document.querySelector('.select-search-option');
const form = document.querySelector('form');

//toggle input elements
function toggleInputElementsHandler(){
  document.getElementById('search-email').classList.toggle('hide');
  document.getElementById('search-date').classList.toggle('hide');
}

async function submitFormHandler() {
  let email = document.querySelector('.email-input');
  let date = document.querySelector('.date');
  if(select.value === 'email'){
    email = email.value;
    if(email.trim() != ''){
      form.submit();      
    } 
  } else {
    date = date.value;
    if(date){
      form.submit();
    }
  }
}


// adding event listeners
select.addEventListener('change', toggleInputElementsHandler);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitFormHandler();
});
