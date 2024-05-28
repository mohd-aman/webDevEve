 //Question: Create a JavaScript function that uses closures
 // to implement caching (memoization). The function should cache 
 //the results of complex calculations and return the cached result 
 //when the same inputs occur again.
 
 pureFxn(5);
 pureFxn(5);
 
function cachingFunction(complexCalculation) { 
    window.cache = {};

    return function (arg) {
        if(window.cache.arg){
            return window.cache.arg;
        }
        let ans = complexCalculation(arg);
        window.cache.arg = ans;
        return ans;
    };
}

{
    caceh:{
        5:120,
        9:1243,
        30:53902539
    }
}