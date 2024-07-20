import { useState } from "react";

export default function Form(){
    const [name,setName] = useState("");
    const [age,setAge] = useState(18);
    const [email,setEmail] = useState("");

    const handleChange = (e)=>{
        // console.log(e.target.value);
        setName(e.target.value);
    }
    return(
        <div>
            <label>
                Name : 
                <input type="text" onChange={handleChange} value={name} />
            </label>
            <label>
                Age : 
                <input type="number" value={age} onChange={(e)=>setAge(e.target.value)}/>
            </label>
            <label>
                Email :
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </label>
        </div>
    )
}