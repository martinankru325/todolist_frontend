import { logout } from 'entities/user/model/slice/authSlice';
import axios from 'axios';
import { store } from 'app/providers/store/store';

export const BASE_URL = 'http://46.29.114.107:8000';
// export const BASE_URL = 'http://localhost:8000';


export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh');

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        localStorage.setItem('accessToken', data.accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
