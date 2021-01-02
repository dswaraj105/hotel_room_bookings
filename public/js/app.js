const cards = document.querySelectorAll('.mouse-over-shadow');
const btn = document.getElementById('toggle-nav');
const loationSelector = document.getElementById('location');

function toggleNavigationMenu() {
    document.querySelector('.navbar-links').classList.toggle('active');
}

// function addShadow (element) {
// }
// function removeShadow (element) {
// }

//Addind Event listeners
btn.addEventListener('click', toggleNavigationMenu);

loationSelector.addEventListener('change', (e) => {
    const room = document.getElementById('bookroomlink');
    const wedding = document.getElementById('bookweddinglink');
    const meeting = document.getElementById('bookmeetinglink');

    if(e.target.value == 'delhi'){
        room.href = '/bookrooms/delhi';
        meeting.href = './party/delhi';
    }else{
        room.href = '/bookrooms/patna';
        meeting.href = './party/patna';
    }

})

// cards.forEach((card) => {
//     card.addEventListener('mouseover' , (e) => {
//         if(e.target.classList.contains('card')){
//             addShadow(e.target);
//         }
//     });

//     card.addEventListener('mouseleave' ,(e) => {
//         if(e.target.classList.contains('card')){
//             removeShadow(e.target);    
//         }
//     });
// });