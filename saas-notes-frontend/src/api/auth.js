import axiosInstance from "./axiosInstance";
import axios from "axios";

export const login = async (username, password) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}token/`,
    { username, password }   
  );
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data;
};

export const fetchMe = async () => {
  const res = await axiosInstance.get("me/");
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};
