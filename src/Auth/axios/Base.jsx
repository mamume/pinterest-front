import axios from 'axios';

const baseUrl = 'http://3.135.88.239:8000/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosInstance