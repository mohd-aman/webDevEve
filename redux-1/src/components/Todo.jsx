import { useDispatch, useSelector } from "react-redux";
import todoSlice from "../redux/todoSlice";

const action = todoSlice.actions;

export default function Todo() {
    const {currentTask,todoList} = useSelector((store)=>store.todoState);
    const dispatch = useDispatch();
        
    const handleChange = (e)=>{
        dispatch(action.setValue(e.target.value));
    }

    const handleClick = ()=>{
        dispatch(action.addTodo());
    }
    return (
    <div>
        <div>
            <input value={currentTask} onChange={handleChange} type='text' />
            <button onClick={handleClick}>Add Task</button>
        </div>
        <div>
            <ul>
            {todoList.map((task)=>{
                return (
                    <li key={task}>{task}</li>
                )
            })} 
            </ul>
        </div>
    </div>
  )
}
