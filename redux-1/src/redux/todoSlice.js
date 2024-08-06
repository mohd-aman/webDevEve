import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todoSlice',
    initialState:{
        todoList:["task1","task2","task3","task4"],
        currentTask:"",
    },
    reducers:{
        setValue:(state,descObj)=>{
            state.currentTask = descObj.payload;
        },
        addTodo:(state)=>{ //impure fxn , immer js take care of your impure fxn.
            state.todoList.push(state.currentTask);
            state.currentTask = "";
        }
    }
});

export default todoSlice;
