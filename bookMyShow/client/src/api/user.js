import { axiosInstance } from "./index";

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:8080/api/user/register",
      values
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:8080/api/user/login",
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
