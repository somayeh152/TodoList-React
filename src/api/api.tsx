import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        console.log('Request sent with token:', config.headers['Authorization']);
        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.data);
        return response;
    }, (error) => {
        if (error.response) {
            console.log('Error response:', error.response.status); // show error in UI
            if (error.response.status === 401) {
                console.log('Unauthorized! Redirecting to login...'); // redirect
            }
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    });

export default axiosInstance;