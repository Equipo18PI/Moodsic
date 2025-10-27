import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = (data) => {
    return axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    localStorage.setItem('token', response.data.token);
    return response;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

export const getRecommendations = (moodData) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/music/recommend`, moodData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};