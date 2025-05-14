import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or your preferred storage)
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your token's key

    // Ensure headers object exists
    if (!config.headers) {
      config.headers = {};
    }

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // You can also add other default headers here
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['X-Custom-Header'] = 'your-custom-value';

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;