import axios from "axios";
import auth from "./auth";


axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error("An unexpected error occured.");
  }

  return Promise.reject(error);
});

export function setJWT(jwt) {
  axios.defaults.headers.common["authorization"] = 'Bearer '+auth.getJWT(jwt);
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT
};