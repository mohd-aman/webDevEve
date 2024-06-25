const starContainer = document.querySelector("#star");
const allStars = document.querySelectorAll('#star span');
const rating = document.querySelector('h3 span');

starContainer.addEventListener("click",function(e){
    if(e.target.classList.contains("star-container")){
        return;
    }
    // console.log(e);
    //remove color from all the stars
    removeColorFromStar();
    
    const starNum = e.target.dataset.pos;
    // console.log(starNum);
    addColorToStar(starNum);
    rating.innerText = starNum; //updating the UI
})

starContainer.addEventListener("mouseover",function(e){
    if(e.target.classList.contains("star-container")){
        return;
    }
    //removing color from all the stars
    removeColorFromStar();
    
    const starNum = e.target.dataset.pos;
    // console.log(starNum);
    addColorToStar(starNum);
})

starContainer.addEventListener('mouseout',function(e){
    removeColorFromStar();
    const currentRating = rating.innerText;
    // console.log(currentRating);
    addColorToStar(currentRating);})

function addColorToStar(n){
    for(let i=0;i<n;i++){
        allStars[i].classList.add("gold");
    }
}


function removeColorFromStar(){
    for(let i=0; i<allStars.length; i++){
        if(allStars[i].classList.contains("gold"))
            allStars[i].classList.remove("gold");
    }
}