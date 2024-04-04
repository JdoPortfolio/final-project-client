// src/context/LeadsContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createLead, fetchLeads, fetchLeadById, deleteLead } from '../services/leadService';

const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
    const [leads, setLeads] = useState([]);
    const [currentLead, setCurrentLead] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     fetchLeads().then(response => {
    //         setLeads(response.data);
    //         setIsLoading(false);
    //     }).catch(error => {
    //         console.error("Failed to fetch leads:", error);
    //         setIsLoading(false);
    //     });
    // }, []);

    const handleCreateLead = (data) => {
        setIsLoading(true);
        createLead(data).then(response => {
            const newLead = response.data;
            setLeads(prev => [...prev, newLead]);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to create lead:", error);
            setIsLoading(false);
        });
    };

    const handleDeleteLead = (id) => {
        setIsLoading(true);
        deleteLead(id).then(() => {
            setLeads(prev => prev.filter(lead => lead._id !== id));
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to delete lead:", error);
            setIsLoading(false);
        });
    };

    return (
        <LeadsContext.Provider value={{
            leads,
            currentLead,
            isLoading,
            handleCreateLead,
            handleDeleteLead,
        }}>
            {children}
        </LeadsContext.Provider>
    );
};

export const useLeads = () => useContext(LeadsContext);
