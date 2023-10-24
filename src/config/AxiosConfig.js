import tokens from "./AxiosStore";
import axios from 'axios';

const BASE_URL = 'https://feqgku27k5.execute-api.us-east-1.amazonaws.com/dev';

const api = axios.create(
    {
        headers: [{key:'value'}],
        baseURL: BASE_URL,
    });

const errorHandler = (error) => {
  const statusCode = error.response ? error.response.status : null;
  
    // logging only errors that are not 401
    if (statusCode) {
        console.error("Error while posting:", error);
        return Promise.reject(error['response'])
    }
    return Promise.reject('500')
}

api.interceptors.request.use(
    async (config) => {
        const currAccessToken = tokens.getIdToken();

        if (currAccessToken) {
            
            config.headers = {
                ...config.headers,
                Authorization: `${tokens.getIdToken()}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(undefined, (error) => {

    return errorHandler(error)
  })


export default api;