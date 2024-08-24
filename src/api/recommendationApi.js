import axios from 'axios';

const recommendationApi = axios.create({
    baseURL: 'http://localhost:8000'
});

export default recommendationApi;