import { useEffect, useState } from "react"


export default function FetchData(){
    const [data,setData] = useState(null);
    // https://jsonplaceholder.typicode.com/users
    
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=> res.json())
        .then(data=>setData(data));
    },[]); // only runs once on mounting

    return (
        <div>
            {data?<ul>
                {data.map((item)=>{
                    return <li key={item.id}>{item.name}</li>
                })}
            </ul>:<h1>...Loading</h1>}
        </div>
    )
}