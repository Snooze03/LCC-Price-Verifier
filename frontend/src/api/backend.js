import axios from 'axios';
import { Platform } from 'react-native';

const androidUrl = process.env.EXPO_PUBLIC_ANDROID_URL;
const webUrl = process.env.EXPO_PUBLIC_WEB_URL;
const baseUrl = Platform.OS === 'android' ? androidUrl : webUrl;

export const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
});
