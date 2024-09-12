import { axiosInstance } from "./index";

const BASE_URL = "http://localhost:8080/api/movie";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/get-all`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addMovie = async (values) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/add`, values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateMovie =async (values) => {
  try {
    const response =await axiosInstance.put(`${BASE_URL}/update`, values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteMovie =async (values) => {
  try {
    console.log(values);
    const response =await axiosInstance.put(`${BASE_URL}/delete`, values );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
