import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_CENTRAL_SERVER,
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

export { api, addToken };
