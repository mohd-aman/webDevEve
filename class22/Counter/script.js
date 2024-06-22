const IncrementBtn = document.querySelector('#plus');
const DecrementBtn = document.querySelector('#minus');
const CountElement = document.querySelector('#count span');
const InputElement = document.querySelector('input');

let count = 0;
let incrementDecrementBy = 1;

InputElement.addEventListener('change',function(){
    const value = parseInt(InputElement.value);
    if(value){
        incrementDecrementBy = value;
    }else{
        incrementDecrementBy = 1;
    }
})

IncrementBtn.addEventListener('click',function(e){
    count+=incrementDecrementBy;
    CountElement.innerText = count;
})


DecrementBtn.addEventListener('click',function(e){
    if(count-incrementDecrementBy < 0){
        return;
    }
    count-=incrementDecrementBy;
    CountElement.innerText = count;
})