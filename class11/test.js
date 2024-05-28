let radiusArr = [1,3,4,5,7,5,9];

//Q1. calculate the fxn which return diameterArr representing
// diameter of each element in the radiusArr

function diamter(A) {
    let diameterArr = [];
    for(let i=0; i<A.length; i++){
        diameterArr[i] = 2*A[i] 
    }
    return diameterArr;
}

let diamterArr = diamter(radiusArr);
console.log(diamterArr);
console.log(radiusArr);

//Q2 calculate the fxn which return circumferenceArr representing
// circumference of each element in the radiusArr

function circumference(A){
    let circumferenceArr = [];
    for(let i=0;i<A.length;i++){
        circumferenceArr[i] = 2*Math.PI*A[i];
    }
    return circumferenceArr;
}

let circumferenceArr = circumference(radiusArr);
console.log(circumferenceArr);
console.log(radiusArr);

//Q3. calculate the fxn which return areaArr represent
// area of each element in the radiusArr

function area(A){
    let areaArr = [];
    for(let i=0;i<A.length;i++){
        areaArr[i] = Math.PI*A[i]*A[i]
    }
    return areaArr;
}

let areaArr = area(radiusArr);
console.log(areaArr);
console.log(radiusArr);

