import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        user:null,
        loading:true,
        error:false,
    },
    reducers:{
        setError:(state)=>{
            state.loading = false;
            state.error = true;
            state.user = null;
        },
        setLoading:(state)=>{
            state.loading = true;
            state.error = false;
            state.user = null;
        },
        setUser:(state,descObj)=>{
            state.loading = false;
            state.error = false;
            state.user = descObj.payload;
        }
    }
});

export default userSlice;