import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
    baseURL: process.env.CENTRAL_SERVER,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

function addToken(access_token) {
    api.interceptors.request.use(
        (config) => {
            if (access_token) {
                config.headers.Authorization = `Bearer ${access_token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
}

// add a response interceptor, to check if token is expired
// if it is, refresh it

export { api, addToken };
