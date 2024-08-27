/**
 * TODO: Add the API services here
 * TODO: Add the API base url here
 * TODO: Add the token to API headers here
*/

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080/en/';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && !config.url.includes('auth/register')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${BASE_URL}auth/jwt/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('accessToken', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token has expired, logout the user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const register = async (name, username, email, password, password2, department, team, role) => {
  return axios.post(`${BASE_URL}auth/register/`, { name, username, email, password, password2, department, team, role });
};

export const sendActivationCode = async (email) => {
  return api.post('user/email/code/send', null, {
    headers: { Authorization: `Bearer ${email}` }
  });
};

export const verifyActivationCode = async (code) => {
  return api.post('user/email/code/', { code });
};

export const login = async (email, password) => {
  const response = await api.post('auth/jwt/token/', { email, password });
  localStorage.setItem('accessToken', response.data.access);
  localStorage.setItem('refreshToken', response.data.refresh);
  return response.data;
};

export const createLoginSession = async (email, password) => {
  const response = await api.post('auth/session/', { email, password });
  localStorage.setItem('isSuperuser', response.data.is_superuser);
  return response.data;
};

export const logout = async () => {
  await api.delete('auth/session/');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('isSuperuser');
};

export const verifyToken = async (token) => {
  return api.post('auth/jwt/token/verify/', { token });
};

export const getUserProfile = async () => {
  return api.get('user/me/');
};

export const updateUserProfile = async (profileData) => {
  return api.put('user/update/', profileData);
};

export const sendResetPasswordCode = async (email) => {
  return api.post('user/reset_password/code/send/', { email });
};

export const verifyResetPasswordCode = async (email, code) => {
  return api.post('user/reset_password/code/', { email, code });
};

export const resetPassword = async (key, email, password, password2) => {
  return api.post('user/reset_password/', { key, email, password, password2 });
};



export const addDevice = async (deviceData) => {
  return api.post('devices', deviceData);
};

export const getAllDevices = async () => {
  return api.get('devices');
};

export const getDeviceById = async (id) => {
  return api.get(`devices/${id}`);
};

export const updateDevice = async (id, deviceData) => {
  return api.put(`devices/${id}`, deviceData);
};

export const deleteDevice = async (id) => {
  return api.delete(`devices/${id}`);
};


export default api;