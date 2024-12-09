import axios from "axios";
export const axiosInstant = axios.create({
  // baseURL:"http://localhost:4444"
  baseURL: "https://amazon-api-deploy-group-4.onrender.com",
});