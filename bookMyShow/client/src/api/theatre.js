import { axiosInstance } from "./index";

const BASE_URL = "http://localhost:8080/api/theatre";


export const getAllTheatresForOwner = async (values) => {
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/get-all-theatre-by-owner`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const getAlTheatreForAdmin = async ()=>{
    try{
        const resp = await axiosInstance.get(`${BASE_URL}//get-all`);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const addTheatre = async (values)=>{
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/add`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const updateTheatre = async (values)=>{
    try{
        const resp = await axiosInstance.put(`${BASE_URL}/update`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteTheatre = async (values)=>{
    try{
        const resp = await axiosInstance.put(`${BASE_URL}/delete`,values)
        return resp.data;
    }catch(err){
        console.log(err);
    }
}