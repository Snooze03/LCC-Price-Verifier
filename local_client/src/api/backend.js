import axios from 'axios';
import { Platform } from 'react-native';

const androidUrl = process.env.EXPO_PUBLIC_ANDROID_URL;
const webUrl = process.env.EXPO_PUBLIC_WEB_URL;
// const baseUrl = Platform.OS === 'android' ? androidUrl : webUrl;
let baseUrl = '';

export const api = axios.create({
    timeout: 5000,
});

export function setBaseUrl(url) {
    api.defaults.baseURL = url;
    return baseUrl;
}
