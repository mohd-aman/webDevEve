const eventEmitter = require('events');

// console.log(eventEmitter);
const myEmitter = new eventEmitter();


//Listener
myEmitter.on('ourEvent',(...args)=>{
    console.log("There is new event");
})

myEmitter.on('ourEvent',cb)


//Emit event
myEmitter.emit('ourEvent');
myEmitter.emit('ourEvent',2,4,6);
myEmitter.emit('ourEvent',[23,5,24,7]);


//Remove listeners
myEmitter.off('ourEvent',cb);

function cb(){
    console.log("new event");
}

