import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

const url = process.env.REACT_APP_API_BASE_URL_LOCAL;
console.log("Url", url);

const apiService = axios.create({
  baseURL: url, 
});

// Request interceptor
apiService.interceptors.request.use(
  (config) => {
    if (!window.navigator.onLine) {
      notification.error({
        message: 'No Internet Connection',
        description: 'You are offline. Please check your internet connection.',
      });
      return Promise.reject(new Error('No Internet Connection'));
    }

    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!window.navigator.onLine) {
      notification.error({
        message: 'No Internet Connection',
        description: 'You are offline. Please check your internet connection.',
      });
      return Promise.reject(new Error('No Internet Connection'));
    }

    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('authToken');
        notification.error({
          message: 'Session Expired',
          description: 'Your session has expired. Please log in again.',
        });
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        notification.error({
          message: 'Internal Server Error',
          description: 'Something went wrong on the server. Please try again later.',
        });
      } else {
        notification.error({
          message: 'Error',
          description: error.response.data?.message || 'An unknown error occurred.',
        });
      }
    } else {
      notification.error({
        message: 'Unexpected Error',
        description: 'An unknown error occurred. Please try again.',
      });
    }

    return Promise.reject(error);
  }
);

export default apiService;
