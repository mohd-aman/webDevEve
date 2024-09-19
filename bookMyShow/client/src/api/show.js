import { axiosInstance } from "./index";

const BASE_URL = "http://localhost:8080/api/show";


export const addShow = async (values)=>{
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/add`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const getShowsByTheatre = async (values)=>{
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/get-all-shows-by-theatre`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const getTheatreByMovie = async (values)=>{
    try{
        const resp = await axiosInstance.post(`${BASE_URL}/get-all-theatres-by-movie`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const updateShow = async (values)=>{
    try{
        const resp = await axiosInstance.put(`${BASE_URL}/update`,values);
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteShow = async (values)=>{
    try{
     const resp = await axiosInstance.put(`${BASE_URL}/delete`,values);
     return resp.data;
    }catch(err){
        console.log(err);
    }
}