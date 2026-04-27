import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.4:3001',
    timeout: 5000,
});

export function setBaseUrl(url) {
    // Ensure the URL starts with http:// or https://
    const formattedUrl = url.startsWith('http') ? url : `http://${url}`;

    // Set base url
    api.defaults.baseURL = formattedUrl;

    return formattedUrl;
}
