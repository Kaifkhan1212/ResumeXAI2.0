import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.detail || error.message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export const analyzeResume = async (file, jobDescription) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    const response = await api.post('/api/v1/full-analysis', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post('/api/v1/auth/login', { email, password });
    return response.data;
};

export const registerUser = async (name, email, password) => {
    const response = await api.post('/api/v1/auth/register', { name, email, password });
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
};

export const googleLogin = async (token) => {
    const response = await api.post('/api/v1/auth/google', { token });
    return response.data;
};

export default api;
