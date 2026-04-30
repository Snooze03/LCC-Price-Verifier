import axios from 'axios';

export const centralAPI = axios.create({
    baseURL: process.env.EXPO_PUBLIC_CENTRAL_SERVER,
    timeout: 5000,
});
