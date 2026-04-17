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
                console.log(config.headers.Authorization);
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

// import axios from 'axios';

// export const api = axios.create({
//     baseURL: import.meta.env.VITE_CENTRAL_SERVER,
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' },
// });

// // Attach auth token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Global error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // redirect to login, clear token, etc.
//     }
//     return Promise.reject(error);
//   }
// );
