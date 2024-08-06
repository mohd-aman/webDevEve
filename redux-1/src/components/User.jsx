import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import userMiddleware from "../redux/userMiddleware"; // thunk

export default function User() {
    const {user,error,loading} = useSelector((store)=>store.userState);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(userMiddleware()); // dispatching a thunk
    },[])

    if(error){
        return <h1>Error Occured</h1>
    }
    if(loading){
        return <h1>Loading...</h1>
    }
  return (
    <h1>User:
    {user?.name}
    </h1>
  )
}
