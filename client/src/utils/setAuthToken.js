import axios from 'axios';

export const setAuthToken = (token) => {
    if(localStorage.token) {
        axios.defaults.headers.common['x-auth-header'] = token; 
    } else {
        delete axios.defaults.headers.common['x-auth-header']
    }
}