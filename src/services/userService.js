import axios from 'axios';
import { SERVER_URL } from './SERVER_URL';

// Existing functions

export const fetchUsersWithPrivilege = (privilege) => {
  let token = localStorage.getItem('authToken');
  return axios.get(`${SERVER_URL}/users/privilege/${privilege}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = (userData) => {
  let token = localStorage.getItem('authToken');
  return axios.post(`${SERVER_URL}/users`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// New functions

export const deleteUserById = (userId) => {
    let token = localStorage.getItem('authToken');
    return axios.delete(`${SERVER_URL}/users/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};


export const updateUserById = (userId, userData) => {
  let token = localStorage.getItem('authToken');
  return axios.put(`${SERVER_URL}/users/update/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

