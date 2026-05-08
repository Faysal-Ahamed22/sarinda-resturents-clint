import axios from 'axios';

const accessTokenKey = 'access-token';

export const axiosSecure = axios.create({
    baseURL:'https://sarinda-server.vercel.app'
})

axiosSecure.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem(accessTokenKey) : '';

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const useAxios = () => {
    return axiosSecure; 
};

export default useAxios;