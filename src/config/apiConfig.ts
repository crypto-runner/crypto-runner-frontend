import axios from "axios";
import { BASE_RELAYER_URL } from "./config";

const appApiUrl = process.env.REACT_APP_BASE_API_URL;
// const appApiUrl = "http://192.168.1.109:5000/api";

export const apiCall = axios.create({
  baseURL: appApiUrl,
  timeout: 100000,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});


export const relayerApi = axios.create({
  baseURL: BASE_RELAYER_URL,
  timeout: 100000,
});
