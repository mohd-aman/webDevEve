import { useState } from "react"

export default function AdvanceForm(){
    const [formData,setFormData] = useState({
        name:'',
        email:'user@gmail.com',
        password:'',
        age:'',
    });
    //{name:"Alex",email:"saf@gmail.com",password:"fdjkas;fd"}

    const handleChange = (e)=>{
        console.log(e);
        // const value = e.target.value;
        // const name = e.target.name;
        const {name,value} = e.target;
        const copyFormData = {...formData};
        copyFormData[name] = value;
        setFormData(copyFormData);
    }
    
    return(
        <>
        <h1>Advanced Form</h1>
        <div>
            <label>
               Name: 
               <input placeholder="Enter Your Name" type="text" name="name" value={formData.name} onChange={handleChange}/>
            </label>
            <label>
                Email : 
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>
            </label>
            <label>
                Password : 
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
            </label>
            <label>
                Age : 
                <input type="number" name="age" value={formData.age} onChange={handleChange}/>
            </label>
        </div>
            <hr></hr>
        </>        
    )
}