
import axios from 'axios';
import getEnvVars from '../environment';
import asyncStorage from '@react-native-async-storage/async-storage';

const { SERVER_URL } = getEnvVars();

const options = {
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(async config => {
  const token = await asyncStorage.getItem('token');
  config.headers.token = token;

  return config;
}, (err) => {
  console.log(err)}
);

export default axiosInstance;
