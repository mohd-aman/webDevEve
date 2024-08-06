// async function fetchUser(){
        //     try{
        //         setLoading(true);
        //         const resp = await  fetch('https://jsonplaceholder.typicode.com/users/1');
        //         const data = await resp.json();
        //         console.log(data);
        //         setUser(data);
        //     }catch(e){
        //         setError(true);
        //     }finally{
        //         setLoading(false);
        //     }
        // }
        // fetchUser();

        
import userSlice from "./userSlice";

const actions = userSlice.actions;

export default function userMiddleware(){
    return async function(dispatch){
        try{
            dispatch(actions.setLoading());
            const resp = await  fetch('https://jsonplaceholder.typicoe.com/users/1');
            const data = await resp.json();
            dispatch(actions.setUser(data));
        }catch(e){
            dispatch(actions.setError());
        }
    }
}