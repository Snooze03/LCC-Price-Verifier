import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export const localAPI = axios.create({
    timeout: 5000,
});

export function setBaseUrl(url) {
    // Ensure the URL starts with http:// or https://
    const formattedUrl = url.startsWith('http') ? url : `http://${url}`;

    // Set base url
    localAPI.defaults.baseURL = formattedUrl;

    return formattedUrl;
}
