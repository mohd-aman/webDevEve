//In JavaScript functions are also known as First class citizen because
// fxn can be stored in a variable, it can be returned from a function
// also we can pass functions as an argument (functions can accept function in the parameter)

function parent(){
    function child(){
        console.log(a);
    }
    return child;
}

var childFxn = parent();
childFxn();


// var a = parent();
// console.log(a);
// var b = a();
// console.log(b);