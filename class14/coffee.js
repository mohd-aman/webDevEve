function placeOrder(drink){
    return new Promise(function(resolve,reject){
        if(drink === 'coffee'){
            resolve("Order for Coffee is Placed");
        }else{
            reject("Order can not be placed");
        }
    })
}

function processOrder(orderPlaced){
    return new Promise(function(resolve,reject){
        resolve(`${orderPlaced} and served.`)
    })
}

function generateBill(processedOrder){
    return new Promise(function(resolve,reject){
        resolve(`${processedOrder} and Bill is generated with 200 Rs.`)
    })
}
 
// placeOrder('coffee').then(function(orderPlaced){
//     console.log(orderPlaced);
//     return processOrder(orderPlaced);
// }).then(function(processedOrder){
//     console.log(processedOrder);
//     return generateBill(processedOrder);
// }).then(function(bill){
//     console.log(bill);
// }).catch(function(error){
//     console.log(error);
// })

async function serveOder(drink){
    try{
        const placedOrder = await placeOrder(drink);
        const processedOrder = await processOrder(placedOrder);
        const bill = await generateBill(processedOrder);
        console.log(bill);
    }catch(error){
        console.log(error);
    }finally{
        console.log("finally done");
    }
}

serveOder('tea');