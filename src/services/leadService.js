// src/services/leadService.js

import axios from 'axios';
import { SERVER_URL } from './SERVER_URL';

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
});

export const createLead = (leadData) => {
    return axios.post(`${SERVER_URL}/leads`, leadData);
};

export const fetchLeads = () => {
    return axios.get(`${SERVER_URL}/leads`, getConfig());
};

export const fetchLeadById = (leadId) => {
    return axios.get(`${SERVER_URL}/leads/${leadId}`, getConfig());
};

export const deleteLead = (leadId) => {
    return axios.delete(`${SERVER_URL}/leads/${leadId}`, getConfig());
};
