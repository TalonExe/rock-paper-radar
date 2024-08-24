import axios from 'axios';
const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;

const openCageApi = (input) => {
    return axios.create({
        baseURL: `https://api.opencagedata.com/geocode/v1/json?key=${GEOCODE_API_KEY}&q=${input}&limit=5`
    });
}

export default openCageApi;