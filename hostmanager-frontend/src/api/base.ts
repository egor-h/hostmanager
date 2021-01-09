import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
    // validateStatus: (status) => status > 200 && status < 300,
});

api.interceptors.request.use((config) => {
    console.log(`${config.method} to ${config.baseURL}${config.url}`);
    const token = localStorage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => Promise.reject(error));

export default api;