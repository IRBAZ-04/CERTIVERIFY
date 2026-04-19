import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
    console.warn('[Config Warning] VITE_API_URL is missing in production environment. Falling back to localhost.');
}

const API = axios.create({
    baseURL
});

// Interceptor to add JWT Auth token to every request
// Token is stored directly at localStorage key 'token' by AuthContext
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
