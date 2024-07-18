import { useState } from "react";

export default function Counter(){
    const [count,setCount] = useState(0);

    const increment=()=>{
        setCount(count+1);
    }

    const decrement = ()=>{
        if(count === 0){
            return;
        }
       setCount(count-1);
    }
    return(
        <>
            <h2>Counter : {count}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    )
}