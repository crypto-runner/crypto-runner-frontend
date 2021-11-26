import axios from "axios";

const appApiUrl = "https://nft-comics-api.herokuapp.com/api";
// const appApiUrl = "http://192.168.1.109:5000/api";

export const apiCall = axios.create({
  baseURL: appApiUrl,
  timeout: 100000,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});
