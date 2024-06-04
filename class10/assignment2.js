 //Question: Create a JavaScript function that uses closures
 // to implement caching (memoization). The function should cache 
 //the results of complex calculations and return the cached result 
 //when the same inputs occur again.
 
 pureFxn(5);
 pureFxn(5);

//  {ans-5:10;
//  ans-10: 20;
//  ans-20: 50;
//  ans-2: 50;}

 complexCalculation(5);
 complexCalculation(10);
 complexCalculation(10);

 
function cachingFunction(complexCalculation) { 
    const cache = {};
    // cache = {5: 20,10:350}

    return function (arg) {
        if(cache.arg){
            return cache[arg];
        }
        let ans = complexCalculation(arg);
        cache[arg] = ans;
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