import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://airbnb-zrat.onrender.com",
  withCredentials: true,
});
