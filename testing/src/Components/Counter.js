import { useState } from "react";

export default function Counter() {
    const [count,setCount] = useState(0);
    const handleDecrement = ()=>{
        if(count === 0){
            return;
        }
        setCount(count-1);
    }
  return (
    <>
      <h2>Counter : {count}</h2>
      <button onClick={()=>setCount(count+1)}>+</button>
      <button onClick={handleDecrement}>-</button>
    </>
  );
}
