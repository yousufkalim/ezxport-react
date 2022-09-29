// Init
import axios from "axios";
import { baseUrl } from "../config";
import toaster from "../utils/toaster";

const api = async (method = "get", uri, body) => {
  // API Call
  const url = baseUrl + uri;
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return new Promise((resolve, reject) => {
    axios[method](url, body)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err?.response?.status === 403) {
          localStorage.removeItem("userData")
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          toaster("failed", err?.response?.message, "Token error")
          window.location = "/login";
        } else {
          console.log("API Failed   Error --------> ", err?.response?.data?.message);
          reject(err);
        }
      });
  });
};

export default api;
