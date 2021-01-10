import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authNull } from '../state/actions/auth';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
    // validateStatus: (status) => status > 200 && status < 300,
    validateStatus: (status) => true
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

api.interceptors.response.use(response => {
        
        return response;
    },
    (error) => Promise.reject(error));

export default api;