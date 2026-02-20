
// Config file se API base URL import kar rahe hain
import config from "@config/config";

// Axios library import kar rahe hain (API calls ke liye)
import axios from "axios";

// Loader start aur stop karne ke liye function references
// Initially null hain kyunki abhi tak assign nahi hue
let startLoading: (() => void) | null = null;
let stopLoading: (() => void) | null = null;

// Yeh function bahar se loader ke start/stop functions inject karega
export const injectLoadingHandlers = (
  start: () => void,
  stop: () => void
) => {
  // startLoading me start function save kar rahe hain
  startLoading = start;

  // stopLoading me stop function save kar rahe hain
  stopLoading = stop;
};

// Custom axios instance create kar rahe hain
const axiosInstance = axios.create({
  // Base URL config file se aa raha hai
  baseURL: config.apiUrl,

  // Default headers set kar rahe hain (JSON format me data bhejne ke liye)
  headers: {
    "Content-Type": "application/json",
  },
});

// Jab bhi koi request bheji jayegi,
// request bhejne se pehle yeh code chalega
axiosInstance.interceptors.request.use(
  (config) => {
    // Agar startLoading function available hai
    // to loader start kar do
    startLoading?.();

    // Request ko aage bhej do
    return config;
  },
  (error) => {
    // Agar request me error aaya
    // to loader band kar do
    stopLoading?.();

    // Error ko reject karke aage pass kar do
    return Promise.reject(error);
  }
);

// Jab response wapas aayega (success ya error)
axiosInstance.interceptors.response.use(
  (response) => {
    // Success case me loader band kar do
    stopLoading?.();

    // Response ko aage return kar do
    return response;
  },
  (error) => {
    // Error case me bhi loader band kar do
    stopLoading?.();

    // Error ko reject karke aage pass kar do
    return Promise.reject(error);
  }
);

// Is custom axios instance ko export kar rahe hain
// Taaki project me kahi bhi use kar sakein
export default axiosInstance;