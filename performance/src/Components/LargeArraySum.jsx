import { useEffect, useMemo, useState } from "react";


const generateLargeArray = ()=>{
    const largeArray = [];
    console.log("Genrating Array");
    for(let i=0;i<1000000;i++){
        largeArray.push(i);
    }
    return largeArray;
}

const sumArray = (arr)=>{
    console.log("Calculating sum...")
    return arr.reduce((acc,curr)=>acc+curr,0);
}

export default function LargeArraySum(){
    const [count,setCount] = useState(0);
    const [darkTheme,setDarkTheme] = useState("false");

    const largeArray = useMemo(()=> generateLargeArray(),[]); //invoke cb only on mounting
    const sum = useMemo(()=>sumArray(largeArray),[]); //invoke cb only on mounting
    
    return (
        <div>
            <h1>Sum : {sum}</h1>
            <button onClick={()=>setCount(count+1)}>Increment</button>
            <p>{count}</p>
            <button onClick={()=>setDarkTheme("true")}>Light Mode, Dark Mode : {darkTheme}</button>
        </div>
        
    )
}