// function mapFxn(A,cb){
//     let newArr = [];
//     for(let i=0;i<A.length;i++){
//         newArr[i] = cb(A[i]);
//     }
//     return newArr;
// }

let radiusArr = [1,3,4,5,7,5,9];

function diameterOfCircle(r){
    return 2*r;
}

function circumferenceOfCircle(r){
    return 2*Math.PI*r;
}

function areaOfCircle(r){
    return Math.PI*r*r;
}

let diameterArr = radiusArr.map(diameterOfCircle);
console.log(diameterArr);

let circumferenceArr = radiusArr.map(circumferenceOfCircle);
console.log(circumferenceArr);

let areaArr = radiusArr.map(areaOfCircle);
console.log(areaArr);


//Assignment 
// Question- convert transaction arr into dollar arr

// const transactions = [1000, 3000, 4000, 2000, -898, 3800, -4500];
// const inrtToUsd = 82;
