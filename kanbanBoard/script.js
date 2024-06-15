const addBtn = document.querySelector('.add-btn');
const modalCont = document.querySelector('.modal-cont');
const textArea = document.querySelector('textarea');
const mainCont = document.querySelector('.main-cont');
const allPriorityColors = document.querySelectorAll('.priority-color');

let isModalOpen = false;
let ticketPriorityColor = 'red';
var uid = new ShortUniqueId();

addBtn.addEventListener('click',function(){
    if(isModalOpen){
        //close the modal or hide the modal
        modalCont.style.display = 'none'; // making change only in the UI;
        isModalOpen = false; // making the change in our variable about modal
    }else{
        //show the modal
        modalCont.style.display = 'flex'; // making this change in the UI
        isModalOpen = true; // making the change in our variable about modal
    }
    // isModalOpen = !isModalOpen;  
})

textArea.addEventListener('keydown',function(e){
    // console.log(e);
    if(e.key == 'Enter'){
        // console.log("Enter pressed now move to second objective which hide the modal")
        modalCont.style.display = 'none'; // change in UI only.
        isModalOpen = false;
        const task = textArea.value;
        textArea.value = ''; // reset the value;
        createTicket(task,ticketPriorityColor);
    }
})

for(let i=0;i<allPriorityColors.length;i++){
    allPriorityColors[i].addEventListener('click',function(e){
        // console.log('click')  
        // console.log(e.target) ; //gives the element where event occured, here event is click
        for(let j=0;j<allPriorityColors.length;j++){
            if(allPriorityColors[j].classList.contains('active')){
                allPriorityColors[j].classList.remove('active'); // remove border from the elemnent
            }
        }
        e.target.classList.add('active'); // add border to the elemnent
        // console.log(e.target.classList[1]);
        //here we should know the color of selected priority
        ticketPriorityColor = e.target.classList[1];
    })
}

function createTicket(task,priorityColor){
    // <div class="ticket-cont">
        // <div class="ticket-color green"></div>
        // <div class="ticket-id">#4qoiep3</div>
        // <div class="task-area">Learn HTML</div>
    // </div>
    const id = uid.rnd();
    const div = document.createElement('div');
    div.className = 'ticket-cont';
    div.innerHTML = `<div class="ticket-color ${priorityColor}"></div> 
                     <div class="ticket-id">#${id}</div>
                     <div class="task-area">${task}</div>`;
    mainCont.appendChild(div);
}