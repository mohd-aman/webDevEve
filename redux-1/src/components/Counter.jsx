import { useSelector,useDispatch } from "react-redux"
import counterSlice from "../redux/counterSlice";

const action = counterSlice.actions;

export default function Counter() {
   const {count} =  useSelector((store)=>store.counterState);
   const dispatch = useDispatch();

   const handleDecrement = ()=>{
    dispatch(action.decrement());
   }
   
   const handleIncrement = ()=>{
    dispatch(action.increment());
   }
  
  return (
    <div style={{display:'flex'}}>
        <button onClick={handleDecrement}>Decrement</button>
        <h1>count value is : {count}</h1>
        <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}
