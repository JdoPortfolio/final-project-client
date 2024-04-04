// src/context/CarsContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCars, fetchCarById, createCar, updateCar, deleteCar } from '../services/carService';

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [currentCar, setCurrentCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCars().then(response => {
            setCars(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to fetch cars:", error);
            setIsLoading(false);
        });
    }, []);

    const getCarById = (id) => {
        setIsLoading(true);
        fetchCarById(id).then(response => {
            setCurrentCar(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to fetch car by ID:", error);
            setIsLoading(false);
        });
    };

    const handleCreateCar = (data) => {
        setIsLoading(true);
        createCar(data).then(response => {
            const newCar = response.data;
            setCars(prev => [...prev, newCar]);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to create car:", error);
            setIsLoading(false);
        });
    };

    const handleUpdateCar = (id, data) => {
        setIsLoading(true);
        updateCar(id, data).then(response => {
            const updated = response.data;
            setCars(prev => prev.map(car => car._id === updated._id ? updated : car));
            setCurrentCar(updated);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to update car:", error);
            setIsLoading(false);
        });
    };

    const handleDeleteCar = (id) => {
        setIsLoading(true);
        deleteCar(id).then(() => {
            setCars(prev => prev.filter(car => car._id !== id));
            if (currentCar?._id === id) {
                setCurrentCar(null);
            }
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to delete car:", error);
            setIsLoading(false);
        });
    };

    return (
        <CarsContext.Provider value={{
            cars,
            currentCar,
            isLoading,
            getCarById,
            handleCreateCar,
            handleUpdateCar,
            handleDeleteCar,
        }}>
            {children}
        </CarsContext.Provider>
    );
};

export const useCars = () => useContext(CarsContext);
