import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchDealerships,
  fetchDealershipById,
  updateDealership,
  createDealership,
  deleteDealership,
} from '../services/dealershipService';
import axios from 'axios'
const DealershipContext = createContext();

export const DealershipProvider = ({ children }) => {
    const [dealerships, setDealerships] = useState(null);
    const [currentDealership, setCurrentDealership] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Standalone function to refresh/fetch dealerships data
    const refreshDealerships = () => {
        setIsLoading(true);
        // axios.get("http://localhost:4000/dealerships")
        fetchDealerships()
        .then(response => {
            console.log("response in d context fetchDealership", response)
            setDealerships(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to fetch dealerships:", error);
            setIsLoading(false);
        });
    };

    // Fetch dealerships on component mount
    useEffect(() => {
        refreshDealerships();
    }, []);

    // Function to fetch a dealership by ID
    const getDealershipById = (id) => {
        setIsLoading(true);
        fetchDealershipById(id).then(response => {
            setCurrentDealership(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to fetch dealership by ID:", error);
            setIsLoading(false);
        });
    };

    // Function to handle updating a dealership
    const handleUpdateDealership = (id, data) => {
        setIsLoading(true);
        updateDealership(id, data).then(response => {
            const updated = response.data;
            setDealerships(prev => prev.map(dealership => dealership._id === updated._id ? updated : dealership));
            setCurrentDealership(updated);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to update dealership:", error);
            setIsLoading(false);
        });
    };

    // Function to handle creating a new dealership
    const handleCreateDealership = (data) => {
        setIsLoading(true);
        createDealership(data).then(response => {
            const newDealership = response.data;
            setDealerships(prev => [...prev, newDealership]);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to create dealership:", error);
            setIsLoading(false);
        });
    };

    // Function to handle deleting a dealership
    const handleDeleteDealership = (id) => {
        setIsLoading(true);
        deleteDealership(id).then(() => {
            setDealerships(prev => prev.filter(dealership => dealership._id !== id));
            if (currentDealership?._id === id) {
                setCurrentDealership(null);
            }
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to delete dealership:", error);
            setIsLoading(false);
        });
    };

    // Providing context values
    return (
        <DealershipContext.Provider value={{
            dealerships,
            currentDealership,
            isLoading,
            getDealershipById,
            handleUpdateDealership,
            handleCreateDealership,
            handleDeleteDealership,
            refreshDealerships, // Exposed refreshDealerships for manual data refresh
        }}>
            {children}
        </DealershipContext.Provider>
    );
};

export const useDealership = () => useContext(DealershipContext);






// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {
//   fetchDealerships,
//   fetchDealershipById,
//   updateDealership,
//   createDealership,
//   deleteDealership, // Import the new functions
// } from '../services/dealershipService';

// const DealershipContext = createContext();

// export const DealershipProvider = ({ children }) => {
//     const [dealerships, setDealerships] = useState([]);
//     const [currentDealership, setCurrentDealership] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchDealerships().then(response => {
//             setDealerships(response.data);
//             setIsLoading(false);
//         }).catch(error => {
//             console.error("Failed to fetch dealerships:", error);
//             setIsLoading(false);
//         });
//     }, []);

//     const getDealershipById = (id) => {
//         setIsLoading(true);
//         fetchDealershipById(id).then(response => {
//             setCurrentDealership(response.data);
//             setIsLoading(false);
//         }).catch(error => {
//             console.error("Failed to fetch dealership by ID:", error);
//             setIsLoading(false);
//         });
//     };

//     const handleUpdateDealership = (id, data) => {
//         setIsLoading(true);
//         updateDealership(id, data).then(response => {
//             const updated = response.data;
//             setDealerships(prev => prev.map(dealership => dealership._id === updated._id ? updated : dealership));
//             setCurrentDealership(updated);
//             setIsLoading(false);
//         }).catch(error => {
//             console.error("Failed to update dealership:", error);
//             setIsLoading(false);
//         });
//     };

//     const handleCreateDealership = (data) => {
//         setIsLoading(true);
//         createDealership(data).then(response => {
//             const newDealership = response.data;
//             setDealerships(prev => [...prev, newDealership]);
//             setIsLoading(false);
//         }).catch(error => {
//             console.error("Failed to create dealership:", error);
//             setIsLoading(false);
//         });
//     };

//     const handleDeleteDealership = (id) => {
//         setIsLoading(true);
//         deleteDealership(id).then(() => {
//             setDealerships(prev => prev.filter(dealership => dealership._id !== id));
//             if (currentDealership?._id === id) {
//                 setCurrentDealership(null);
//             }
//             setIsLoading(false);
//         }).catch(error => {
//             console.error("Failed to delete dealership:", error);
//             setIsLoading(false);
//         });
//     };

//     return (
//         <DealershipContext.Provider value={{
//             dealerships,
//             currentDealership,
//             isLoading,
//             getDealershipById,
//             handleUpdateDealership,
//             handleCreateDealership, // Expose the new create method
//             handleDeleteDealership, // Expose the new delete method
//         }}>
//             {children}
//         </DealershipContext.Provider>
//     );
// };

// export const useDealership = () => useContext(DealershipContext);
