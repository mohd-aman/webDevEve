import {useRef, useState,useEffect} from 'react'
export default function Ref(){
    const [seconds,setSeconds] = useState(0);
   const inputRef = useRef(null);
   const intervalRef = useRef(null);
    // console.log(inputRef);
    const handleClick = ()=>{
    //    console.log(inputRef);
       inputRef.current.focus();
    }

    const handlePause = ()=>{
        clearInterval(intervalRef.current);
    }

    useEffect(()=>{
        intervalRef.current = setInterval(()=>{
            console.log("timer callback running");
            setSeconds((prevState)=>{
                return prevState+1;
            });
        },1000)

        return ()=>{
            clearInterval(intervalRef.current);
        }

    },[]);

    return(
        <div>
            <input ref={inputRef} type="text"/>
            <button onClick={handleClick}>Click on me to focus on input</button>
            <div>
                <h1>Timer</h1>
                <h2>{seconds}</h2>
                <button onClick={handlePause}>Pause</button>
            </div>
        </div>
    )
}