import axios from 'axios';


export const apiClient = axios.create({
timeout: 10000,
});


// attach token dynamically when available
apiClient.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) {
// ReqRes doesn't require Authorization but if you want to send it:
config.headers = config.headers ?? {};
config.headers['Authorization'] = `Bearer ${token}`;
}
return config;
});