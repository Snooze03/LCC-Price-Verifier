import axios from 'axios';

export const api = axios.create({
    timeout: 5000,
});

// Interceptor for debugging
api.interceptors.request.use((request) => {
    // console.log('--- API REQUEST ---');
    // console.log('Method:', request.method);
    // console.log('Full URL:', `${request.baseURL || ''}${request.url}`);
    return request;
});

export function setBaseUrl(url) {
    // 1. Ensure the URL starts with http:// or https://
    const formattedUrl = url.startsWith('http') ? url : `http://${url}`;

    // 2. Set the Axios default
    api.defaults.baseURL = formattedUrl;

    // console.log('Base URL set to:', formattedUrl);
    return formattedUrl; // Return the actual URL, not the empty variable
}
