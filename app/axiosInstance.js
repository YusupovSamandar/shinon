import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 403) {
        // Handle 403 error (Forbidden) here
        // Redirect to the login page or any other appropriate action
        window.location.href = '/login'; // Replace '/login' with your login page URL
    } else if (error.response && error.response.status === 401) {
        window.location.href = '/restricted';
    } else {
        window.location.href = '/404';
    }
});


export default axiosInstance;