import { useEffect, useState } from "react"

export default function UE(){
    const [count,setCount] = useState(0);

    // useEffect(()=>{
    //     document.title = count;
    //     console.log("Inside useEffect callback")
    // },[]) // the callback we passed here will only be called once on mounting phase

    // useEffect(()=>{
    //     document.title = count;
    //     console.log("Inside useEffect callback")
    // },[count]) // the callback we passed here will be called on monuting + every update of count state;

    useEffect(()=>{console.log("it will execute on all updates")})

    // 1. empty -> only mounting
    // 2. with dependency -> whenevev dependency changes cb execute
    // 3. with no array passed -> execute on every update
    console.log("UI render")
    return(
        <div>
            <h1>useEffect : Count :  {count}</h1>
            <button onClick={()=>setCount(count+1)}>Increment</button>
        </div>
    )
}