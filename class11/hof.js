let radiusArr = [1,3,4,5,7,5,9];

function calculate(A,cb){
    let newArr = [];
    for(let i=0;i<A.length;i++){
        newArr[i] = cb(A[i]);
    }
    return newArr;
}

function diameterOfCircle(r){
    return 2*r;
}

function circumferenceOfCircle(r){
    return 2*Math.PI*r;
}

function areaOfCircle(r){
    return Math.PI*r*r;
}

let diameterArr = calculate(radiusArr,diameterOfCircle)
console.log(diameterArr);

let circumferenceArr = calculate(radiusArr,circumferenceOfCircle)
console.log(circumferenceArr);

let areaArr = calculate(radiusArr,areaOfCircle);
console.log(areaArr);