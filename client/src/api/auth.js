import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api"

const axiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
    headers: { "Content-Type": "application/json"},
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

const setAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }    
    console.log(token);
}

export const logoutUser = () => {
    localStorage.removeItem("authToken");
}

export const registerUser = (user) => {
    return axiosInstance.post("/register", user);
}

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    const { token } = response.data;
    localStorage.setItem("authToken", token);
    setAuthToken();
    return response;
}