class MyEventEmitter{
    constructor(){
        this.events = {};
    }

    on(event,listener){
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event,...args){
        if(this.events[event]){
            this.events[event].forEach(listener => listener(...args));
        }
    }
    
}

const myEmitter = new MyEventEmitter();

myEmitter.on('myEvent',(data) => {
    console.log('Received event: ', data);
});

myEmitter.on('myEvent',(data) => {
    console.log('Received second listener for myEvent: ', data);
});

myEmitter.emit('myEvent',250);