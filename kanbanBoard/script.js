const addBtn = document.querySelector('.add-btn');
const modalCont = document.querySelector('.modal-cont');
const textArea = document.querySelector('textarea');
const mainCont = document.querySelector('.main-cont');

let isModalOpen = false;
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
        createTicket(task);
    }
})

function createTicket(task){
    // <div class="ticket-cont">
        // <div class="ticket-color green"></div>
        // <div class="ticket-id">#4qoiep3</div>
        // <div class="task-area">Learn HTML</div>
    // </div>
    const id = uid.rnd();
    const div = document.createElement('div');
    div.className = 'ticket-cont';
    div.innerHTML = `<div class="ticket-color green"></div> 
                     <div class="ticket-id">#${id}</div>
                     <div class="task-area">${task}</div>`;
    mainCont.appendChild(div);
}