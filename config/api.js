
import axios from 'axios';
import getEnvVars from '../environment';
import asyncStorage from '@react-native-async-storage/async-storage';

const { SERVER_URL } = getEnvVars();
console.log("SERVER URL", SERVER_URL);
const options = {
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(async config => {
  const token = await asyncStorage.getItem('token');
  console.log("TOKEN??", token)
  config.headers.Authorization = token;

  return config;
}, (error) => {
  // Do something with request error
  console.log('error',error)}
);

export default axiosInstance;
