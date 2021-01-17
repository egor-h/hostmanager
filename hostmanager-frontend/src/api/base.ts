import axios from 'axios';

const getBaseUrl = (): string => {
    let server = process.env['HOSTMANAGER_SERVER'];
    if (server) {
        return server;
    }
    return 'http://localhost:8080';
}

const api = axios.create({
    baseURL: getBaseUrl(),
    timeout: 30000,
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
}, (error) => Promise.reject(error));

api.interceptors.response.use(response => {

    return response;
}, (error) => Promise.reject(error));

export default api;