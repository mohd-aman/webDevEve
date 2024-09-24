import { axiosInstance } from "./index";

const BASE_URL = "http://localhost:8080/api/user";

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/register`, values);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/login`, values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/get-current-user`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ForgotPassword = async (values) => {
  try {
    const response = await axiosInstance.patch(
      `${BASE_URL}/forgot-password`,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ResetPassword = async (values) => {
  try {
    const response = await axiosInstance.patch(
      `${BASE_URL}/reset-password`,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
