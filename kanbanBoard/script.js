const addBtn = document.querySelector('.add-btn');
const modalCont = document.querySelector('.modal-cont');

let isModalOpen = false;

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