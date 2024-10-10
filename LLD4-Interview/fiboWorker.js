

function calcaluteFib(number){
  if(number<=1){
      return number;
  }
  return calcaluteFib(number-1) + calcaluteFib(number - 2);
}


process.on('message',({number})=>{
  const answer = calcaluteFib(number);
  process.send(answer);
})