import axios from 'axios';
const KEY = import.meta.env.VITE_UNSPLASH_CLIENT_KEY;

const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${KEY}`
    }
})

export default unsplashApi;