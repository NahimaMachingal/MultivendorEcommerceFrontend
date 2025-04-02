//src/app/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register/`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Registration failed" };
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, userData);
        const { access, refresh, user } = response.data;
        
        // Store tokens in cookies
        Cookies.set('accessToken', access, { expires: 1 });
        Cookies.set('refreshToken', refresh, { expires: 7 });
        
        return user;
    } catch (error) {
        throw error.response?.data || { error: "Login failed" };
    }
};

export const logoutUser = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};
