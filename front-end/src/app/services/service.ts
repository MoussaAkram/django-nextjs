import axios from "axios";
import Cookies from "js-cookie";

async function getCsrfToken() {
    const csrfToken = await Cookies.get('csrftoken');
    return csrfToken;
}

const api = axios.create({
    baseURL: "",
    withCredentials: true, 
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(async function(config) {
    const csrfToken = await getCsrfToken();
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

export default api;