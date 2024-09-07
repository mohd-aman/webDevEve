import { useEffect } from "react"
import { axiosInstance } from "../api"
import { useNavigate } from "react-router-dom";

export default function Home(){

    const navigate = useNavigate();
    useEffect(()=>{

        async function getUser(){
            const resp = await axiosInstance.get('http://localhost:8080/api/user/get-current-user');
          
            if(!resp.data.success){
                navigate('/login');
            }
        }

        getUser();
    },[]);

    return (
        <div>Home page</div>
    )
}