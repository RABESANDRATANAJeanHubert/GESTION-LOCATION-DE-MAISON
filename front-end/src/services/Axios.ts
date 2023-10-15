import axios, { AxiosInstance } from 'axios';

export const InstanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.serverUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
