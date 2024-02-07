import axios from "axios";

let backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 30000,
});

// backendInstance.interceptors.request.use(
//   function req() {
//     return req;
//   },
//   function (error) {
//     console.log("error", error);
//     return Promise.reject.error;
//   }
// );

// backendInstance.interceptors.response.use(
//   function res() {
//     return res;
//   },
//   function (error) {
//     console.log("error", error);
//     return Promise.reject.error;
//   }
// );

export default backendInstance;
