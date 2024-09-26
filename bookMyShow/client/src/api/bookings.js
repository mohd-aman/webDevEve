import { axiosInstance } from ".";

const BASE_URL = "http://localhost:8080/api/booking";

export const makePayment = async(token,amount)=>{
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/make-payment`,{token,amount})
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const bookShow = async(values)=>{
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/book-show`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const getAllBookings = async ()=>{
    try{
        const resp = await axiosInstance.get(`${BASE_URL}/all-booking-by-user`);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}