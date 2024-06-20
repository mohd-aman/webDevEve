const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.remove-btn');
const modalCont = document.querySelector('.modal-cont');
const textArea = document.querySelector('textarea');
const mainCont = document.querySelector('.main-cont');
const allPriorityColors = document.querySelectorAll('.priority-color');
const allFiltercolor = document.querySelectorAll('.color');


const colors = ['red','blue','green','black'];
let isModalOpen = false;
let deleteFlag = false; // true means it is red;
let ticketPriorityColor = 'red';
let ticketsArr = []; // maintaining array of tickets to store it in local storage
var uid = new ShortUniqueId();


if(localStorage.getItem('ticketsDetail')){
    let stringifiedArr = localStorage.getItem('ticketsDetail');
    let arr = JSON.parse(stringifiedArr);
    for(let i=0;i<arr.length;i++){
        let ticketObj = arr[i];
        createTicket(ticketObj.id,ticketObj.task,ticketObj.color);
    }
}


for(let i=0;i<allFiltercolor.length;i++){
    allFiltercolor[i].addEventListener('click',function(e){
        // console.log(e.target.classList[1]);
        const selectedColor = e.target.classList[1];
        // console.log(selectedColor);
        const allTicketsPriority = document.querySelectorAll('.ticket-color');
        
        for(let j=0;j<allTicketsPriority.length;j++){
            // console.log(allTicketsPriority[j].classList[1])
            const ticketPriorityColor = allTicketsPriority[j].classList[1];
            if(selectedColor == ticketPriorityColor){
                allTicketsPriority[j].parentElement.style.display = 'block';
            }else{
                allTicketsPriority[j].parentElement.style.display = 'none';
            }
        }
    })

    allFiltercolor[i].addEventListener('dblclick',function(){
        const allTickets = document.querySelectorAll('.ticket-cont');
        // console.log(allTickets);
        for(let j=0;j<allTickets.length;j++){
            // console.log(allTickets[j]);
            allTickets[j].style.display = 'block'; // show the tickets
        }
    })
}

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

deleteBtn.addEventListener('click',function(){
    console.log("deleteBtn clicked");
    if(deleteFlag){
        deleteFlag = false;
        deleteBtn.style.color = 'black';
    }else{
        deleteFlag = true;
        deleteBtn.style.color = 'red';
    }
});

textArea.addEventListener('keydown',function(e){
    // console.log(e);
    if(e.key == 'Enter'){
        // console.log("Enter pressed now move to second objective which hide the modal")
        modalCont.style.display = 'none'; // change in UI only.
        isModalOpen = false;
        const task = textArea.value;
        textArea.value = ''; // reset the value;
        createTicket(undefined,task,ticketPriorityColor);
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

function createTicket(ticketId,task,priorityColor){
    if(task == ""){
       alert("Please add a task")
        return;
    }
    let id;
    if(ticketId){
        id = ticketId; // it means generating ticket from localStorage data
    }else{
        id = uid.rnd(); // it means generating ticket from UI
    }
    // <div class="ticket-cont">
        // <div class="ticket-color green"></div>
        // <div class="ticket-id">#4qoiep3</div>
        // <div class="task-area">Learn HTML</div>
    // </div>
    const ticket = document.createElement('div');
    ticket.className = 'ticket-cont';
    ticket.innerHTML = `<div class="ticket-color ${priorityColor}"></div> 
                     <div class="ticket-id">#${id}</div>
                     <div class="task-area">${task}</div>
                     <div class="lock-unlock"><i class="fa-solid fa-lock"></i></div>`;
    mainCont.appendChild(ticket); // generated ticket on the UI.
    let ticketObj = {id:id,task:task,color:priorityColor};
    ticketsArr.push(ticketObj); // adding the ticket information to the ticket array.
    console.log(ticketsArr);
    updateLocalStorage();
    // console.log(ticket);
    //remove ticket
    ticket.addEventListener('click',function(){
        if(deleteFlag){
            ticket.remove(); //removing ticket from the UI.
            //suppose id = mgDS5r
            // [{"id":"3LmYNT","task":"Ticket 1","color":"red"},{…"id":"mgDS5r","task":"ticket 4","color":"black"}]
            let index = ticketsArr.findIndex(function(ticketObj){
                return ticketObj.id == id;
            }) 
            ticketsArr.splice(index,1);
            console.log(ticketsArr);
            updateLocalStorage();
        }
    })


    //lock and unlock
    const lockUnlockIcon = ticket.querySelector('.fa-solid');
    const taskArea = ticket.querySelector('.task-area');
    lockUnlockIcon.addEventListener('click',function(e){
        
        if(e.target.classList.contains('fa-lock')){
            e.target.classList.remove('fa-lock');
            e.target.classList.add('fa-lock-open');
            taskArea.setAttribute('contenteditable',true);
        }else{
            e.target.classList.remove('fa-lock-open');
            e.target.classList.add('fa-lock');
            taskArea.setAttribute('contenteditable',false);
            let index = ticketsArr.findIndex(function(ticketObj){
                return ticketObj.id == id;
            })
            ticketsArr[index].task = taskArea.innerText;
            console.log(ticketsArr);
            updateLocalStorage();
        }
    })


    //change priority of ticket
    const ticketColorBand = ticket.querySelector('.ticket-color');
    ticketColorBand.addEventListener('click',function(e){
        console.log(e.target.classList[1])
        // ['red','blue','green','black']
        const currentColorClass = e.target.classList[1];
        e.target.classList.remove(currentColorClass);
        let currentColorIndex = colors.indexOf(currentColorClass);
        // for(let j=0;j<colors.length;j++){
        //     if(colors[j] == currentColorClass){
        //         currentColorIndex = j;
        //         break;
        //     }
        // }
        // a/b -> the remainder will alwasy be less than b
        // 0/4 -> 0,0-r
        // 1/4 -> 0,1-r
        // 2/4 -> 0,2-r
        // 3/4 -> 0,3-r
        // 4/4 -> 1,0-r
        const nextColorIndex = (currentColorIndex+1)%colors.length;
        const nextColorClass = colors[nextColorIndex];
        console.log(nextColorClass);
        e.target.classList.add(nextColorClass);
        let index = ticketsArr.findIndex(function(ticketObj){
            return ticketObj.id == id;
        })
        ticketsArr[index].color = nextColorClass;
        console.log(ticketsArr);
        updateLocalStorage();
    })
}

function updateLocalStorage(){
    let stringifiedTicketArr = JSON.stringify(ticketsArr);
    localStorage.setItem('ticketsDetail',stringifiedTicketArr);
}