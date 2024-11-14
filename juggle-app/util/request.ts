import axios from "axios";
import config from "./config";
import { toCamelCase } from "./common-functions";


const request = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});


request.interceptors.response.use(
    (response) => {
        if (response.data) {
            response.data = toCamelCase(response.data)
        }
        return response;
    },
    (error) => Promise.reject(error)
)


export default request;