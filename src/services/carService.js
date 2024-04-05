// src/services/carService.js

import axios from 'axios';
import { SERVER_URL } from './SERVER_URL';

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
});

export const fetchCars = () => {
    return axios.get(`${SERVER_URL}/cars`, getConfig());
};

export const fetchCarById = (carId) => {
    return axios.get(`${SERVER_URL}/cars/${carId}`, getConfig());
};

export const createCar = (carData) => {
    return axios.post(`${SERVER_URL}/cars`, carData, getConfig());
};

export const updateCar = (carId, carData) => {
    return axios.put(`${SERVER_URL}/cars/${carId}`, carData, getConfig());
};

export const fetchCarsByDealershipId = (dealershipId) => {
    return axios.get(`${SERVER_URL}/cars/${dealershipId}`, getConfig());
};

export const deleteCar = (carId) => {
    return axios.delete(`${SERVER_URL}/cars/${carId}`, getConfig());
};
