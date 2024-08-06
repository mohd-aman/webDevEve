import {createSlice} from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name:"paginationSlice",
    initialState:{
        pageNo:1
    },
    reducers:{
        handleNext:(state)=>{
            state.pageNo += 1;
        },
        handlePrev:(state)=>{
            if (state.pageNo > 1)
                state.pageNo -= 1;
        }
    }
})

export default paginationSlice;