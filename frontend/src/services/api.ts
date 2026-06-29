import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Robust check: If they provided a URL but forgot the /api at the end, add it automatically
if (API_URL && !API_URL.endsWith('/api')) {
  // Remove trailing slash if exists before adding /api
  API_URL = API_URL.replace(/\/+$/, '') + '/api';
}

console.log('🚀 [API INIT] VITE_API_URL is:', import.meta.env.VITE_API_URL);
console.log('🚀 [API INIT] Base URL set to:', API_URL);

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  console.log(`🚀 [API REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API SUCCESS] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ [API ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.baseURL}${error.config?.url} failed with status:`, error.response?.status);
    console.error('Error Details:', error);
    return Promise.reject(error);
  }
);
