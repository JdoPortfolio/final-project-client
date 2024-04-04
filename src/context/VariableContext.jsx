// // src/context/VariablesContext.jsx

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { getVariables } from '../services/variableService';

// const VariablesContext = createContext();

// export function VariablesProvider({ children }) {
//     const [variables, setVariables] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         getVariables()
//             .then((response) => {
//                 setVariables(response.data);
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching variables:", error);
//                 setIsLoading(false);
//             });
//     }, []);

//     return (
//         <VariablesContext.Provider value={{ isLoading, variables }}>
//             {children}
//         </VariablesContext.Provider>
//     );
// }

// export function useVariables() {
//     return useContext(VariablesContext);
// }
