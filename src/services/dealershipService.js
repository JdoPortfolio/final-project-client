// src/services/dealershipService.js

import axios from 'axios';
import { SERVER_URL } from './SERVER_URL';

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const fetchDealerships = () => {
    return axios.get(`${SERVER_URL}/dealerships`, getConfig());
};

export const fetchDealershipById = (dealershipId) => {
    return axios.get(`${SERVER_URL}/dealerships/details/${dealershipId}`, getConfig());
};

export const createDealership = (dealershipData) => {
    return axios.post(`${SERVER_URL}/dealerships`, dealershipData, getConfig());
};

export const updateDealership = (dealershipId, dealershipData) => {
    return axios.put(`${SERVER_URL}/dealerships/update/${dealershipId}`, dealershipData, getConfig());
};

export const deleteDealership = (dealershipId) => {
    return axios.delete(`${SERVER_URL}/dealerships/delete/${dealershipId}`, getConfig());
};




