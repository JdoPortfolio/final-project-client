import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import DealershipCard from "../components/DealershipCard";
import UserCard from "../components/UserCard";
import CarCard from "../components/CarCard";
import UpdateCarModal from "../components/UpdateCarModal"; // Import UpdateCarModal
import AddNewCarModal from "../components/AddNewCarModal";
import { fetchDealershipById } from "../services/dealershipService";
import {
  fetchCarsByDealershipId,
  deleteCar,
  updateCar,
} from "../services/carService";

const DealershipOwnerViewPage = () => {
  const { user } = useContext(AuthContext);
  const [dealership, setDealership] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showUpdateCarModal, setShowUpdateCarModal] = useState(false); // For update modal visibility
  const [currentCar, setCurrentCar] = useState(null); // For storing the car to be updated

  useEffect(() => {
    if (user?.dealership) {
      fetchDealershipById(user.dealership)
        .then((response) => {
          setDealership(response.data);
          fetchCarsByDealershipId(user.dealership)
            .then((response) => setInventory(response.data))
            .catch((error) => console.error("Error fetching cars:", error));
        })
        .catch((error) => console.error("Error fetching dealership:", error));
    }
  }, [user]);

  const handleCarUpdate = (carId) => {
    const carToUpdate = inventory.find((car) => car._id === carId);
    if (carToUpdate) {
      setCurrentCar(carToUpdate);
      setShowUpdateCarModal(true);
    }
  };
  
  const handleCarDelete = (carId) => {
    deleteCar(carId)
      .then(() => refreshCars())
      .catch((error) => console.error("Error deleting car:", error));
  };

  const refreshCars = () => {
    fetchCarsByDealershipId(user.dealership)
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error refreshing cars:", error));
  };

  

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column align-items-center">
        <h2>Your Account's Profiles</h2>
        {user && <UserCard user={user} canUpdate={false} />}
        {dealership && (
          <DealershipCard dealership={dealership} canUpdate={false} />
        )}
      </div>

      <div className="d-flex flex-column align-items-center mt-5">
        <h2>Your Car Inventory</h2>
        {inventory.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            canModify={true}
            onUpdate={() => handleCarUpdate(car._id)}
            onDelete={() => handleCarDelete(car._id)}
          />
        ))}
        <button
          className="btn btn-primary mt-4"
          onClick={() => setShowAddCarModal(true)}
        >
          Add New Car
        </button>
      </div>

      <AddNewCarModal
        show={showAddCarModal}
        handleClose={() => setShowAddCarModal(false)}
        refreshCars={refreshCars}
        dealershipId={user?.dealership}
      />
      <UpdateCarModal
        show={showUpdateCarModal && currentCar != null} // Ensure currentCar is not null before rendering
        handleClose={() => setShowUpdateCarModal(false)}
        carData={currentCar}
        refreshCars={refreshCars}
      />
    </div>
  );
};

export default DealershipOwnerViewPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard';
// import AddNewCarModal from '../components/AddNewCarModal'; // Import the AddNewCarModal component
// import { fetchDealershipById } from '../services/dealershipService';
// import { fetchCarsByDealershipId, deleteCar, updateCar } from '../services/carService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);
//   const [showAddCarModal, setShowAddCarModal] = useState(false); // State to manage AddNewCarModal visibility

//   useEffect(() => {
//     if (user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//           fetchCarsByDealershipId(user.dealership)
//             .then(response => setInventory(response.data))
//             .catch(error => console.error("Error fetching cars:", error));
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     }
//   }, [user]);

//   const handleCarUpdate = async (carId, carData) => {
//     try {
//       await updateCar(carId, carData);
//       // Optionally refresh the inventory list here
//     } catch (error) {
//       console.error("Error updating car:", error);
//     }
//   };

//   const handleCarDelete = (carId) => {
//     deleteCar(carId)
//       .then(() => {
//         // After successfully deleting the car, refresh the car list
//         fetchCarsByDealershipId(user.dealership)
//           .then(response => setInventory(response.data))
//           .catch(error => console.error("Error refreshing cars after delete:", error));
//       })
//       .catch(error => console.error("Error deleting car:", error));
//   };

//   const refreshCars = () => {
//     // Refresh the cars list
//     fetchCarsByDealershipId(user.dealership)
//       .then(response => setInventory(response.data))
//       .catch(error => console.error("Error refreshing cars:", error));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center">
//         <h2>Your Account's Profiles</h2>
//         {user && <UserCard user={user} canUpdate={true} />}
//         {dealership && <DealershipCard dealership={dealership} canUpdate={true} />}
//       </div>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <h2>Your Car Inventory</h2>
//         {inventory.map(car => (
//           <CarCard
//             key={car._id}
//             car={car}
//             canModify={true}
//             onUpdate={() => handleCarUpdate(car._id, car)}
//             onDelete={() => handleCarDelete(car._id)}
//           />
//         ))}
//         <button className="btn btn-primary mt-4" onClick={() => setShowAddCarModal(true)}>Add New Car</button>
//       </div>
//       <AddNewCarModal show={showAddCarModal} handleClose={() => setShowAddCarModal(false)} refreshCars={refreshCars} dealershipId={user?.dealership} />
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard';
// import { fetchDealershipById } from '../services/dealershipService';
// import { fetchCarsByDealershipId, deleteCar, updateCar } from '../services/carService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     if (user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//           fetchCarsByDealershipId(user.dealership)
//             .then(response => setInventory(response.data))
//             .catch(error => console.error("Error fetching cars:", error));
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     }
//   }, [user]);

//   const handleCarUpdate = (carId, carData) => {
//     // Implementation to update car information
//     console.log("Updating car:", carId, carData);
//     // Optionally call updateCarById service and refresh inventory
//   };

//   const handleCarDelete = (carId) => {
//     deleteCar(carId)
//       .then(() => {
//         // After successfully deleting the car, refresh the car list
//         fetchCarsByDealershipId(user.dealership)
//           .then(response => setInventory(response.data))
//           .catch(error => console.error("Error refreshing cars after delete:", error));
//       })
//       .catch(error => console.error("Error deleting car:", error));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center">
//         <h2>Your Account's Profiles</h2>
//         {/* Removed onDelete prop from UserCard and DealershipCard to hide delete button */}
//         {user && <UserCard user={user} canUpdate={true} />}
//         {dealership && <DealershipCard dealership={dealership} canUpdate={true} />}
//       </div>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <h2>Your Car Inventory</h2>
//         {inventory.map(car => (
//           <CarCard
//             key={car._id}
//             car={car}
//             canModify={true}
//             onUpdate={() => handleCarUpdate(car._id, car)}
//             onDelete={() => handleCarDelete(car._id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard';
// import { fetchDealershipById } from '../services/dealershipService';
// import { fetchCarsByDealershipId, deleteCarById, updateCarById } from '../services/carService';
// // Assuming update services are correctly implemented and imported
// import { updateDealershipById } from '../services/dealershipService';
// import { updateUserById } from '../services/userService';

// const DealershipOwnerViewPage = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     if (user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//           fetchCarsByDealershipId(user.dealership)
//             .then(response => setInventory(response.data))
//             .catch(error => console.error("Error fetching cars:", error));
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     }
//   }, [user]);

//   // Handlers for user and dealership updates
//   const handleUserUpdate = (userData) => {
//     updateUserById(user._id, userData)
//       .then((updatedUser) => {
//         setUser(updatedUser.data); // Assuming setUser updates the user context or state
//       })
//       .catch((error) => console.error("Failed to update user:", error));
//   };

//   const handleDealershipUpdate = (dealershipData) => {
//     updateDealershipById(dealership._id, dealershipData)
//       .then((updatedDealership) => {
//         setDealership(updatedDealership.data);
//       })
//       .catch((error) => console.error("Failed to update dealership:", error));
//   };

//   // Handlers for car updates and deletions
//   const handleCarUpdate = (carId, carData) => {
//     updateCarById(carId, carData)
//       .then(() => {
//         // Re-fetch or update the car inventory to reflect changes
//         fetchCarsByDealershipId(dealership._id)
//           .then((response) => setInventory(response.data));
//       })
//       .catch((error) => console.error("Failed to update car:", error));
//   };

//   const handleCarDelete = (carId) => {
//     deleteCarById(carId)
//       .then(() => {
//         // Filter out the deleted car from inventory
//         setInventory(inventory.filter(car => car._id !== carId));
//       })
//       .catch((error) => console.error("Failed to delete car:", error));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center">
//         <h2>Your Account's Profiles</h2>
//         {user && <UserCard user={user} canUpdate={true} onUpdate={handleUserUpdate} />}
//         {dealership && <DealershipCard dealership={dealership} canUpdate={true} onUpdate={handleDealershipUpdate} />}
//       </div>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <h2>Your Car Inventory</h2>
//         <div className="d-flex flex-column align-items-center">
//           {inventory.map(car => (
//             <CarCard key={car._id} car={car} canModify={true} onUpdate={() => handleCarUpdate(car._id, car)} onDelete={() => handleCarDelete(car._id)} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard';
// import { fetchDealershipById } from '../services/dealershipService';
// import { fetchCarsByDealershipId } from '../services/carService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     // Fetch dealership data if user has an associated dealership ID
//     if (user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//           // Fetch cars associated with the dealership using the new function
//           fetchCarsByDealershipId(user.dealership)
//             .then(response => setInventory(response.data))
//             .catch(error => console.error("Error fetching cars:", error));
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     }
//   }, [user]);

//   // Dummy functions for demonstration
//   const handleUpdate = (id) => console.log("Update", id);
//   const handleDelete = (id) => console.log("Delete", id);

//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center">
//         <h2>Your Account's Profiles</h2>
//         {/* Assuming the UserCard and DealershipCard components accept canUpdate and canDelete props */}
//         {user && <UserCard user={user} canDelete={true} onDelete={() => handleDelete(user._id)} canUpdate={true} onUpdate={() => handleUpdate(user._id)} />}
//         {dealership && <DealershipCard dealership={dealership} canDelete={true} onDelete={() => handleDelete(dealership._id)} canUpdate={true} onUpdate={() => handleUpdate(dealership._id)} />}
//       </div>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <h2>Your Car Inventory</h2>
//         <div className="d-flex flex-column align-items-center">
//           {inventory.map(car => (
//             <CarCard key={car._id} car={car} canModify={true} onDelete={() => handleDelete(car._id)} onUpdate={() => handleUpdate(car._id)} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard';
// import { fetchDealershipById } from '../services/dealershipService';
// import { fetchCarsByDealershipId } from '../services/carService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     // Fetch dealership data if user has an associated dealership ID
//     if (user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//           // Fetch cars associated with the dealership using the new function
//           fetchCarsByDealershipId(user.dealership)
//             .then(response => setInventory(response.data))
//             .catch(error => console.error("Error fetching cars:", error));
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     }
//   }, [user]);

//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center">
//         <h2>Your Account's Profiles</h2>
//         {user && <UserCard user={user} canDelete={false} />}
//         {dealership && <DealershipCard dealership={dealership} canDelete={false} />}
//       </div>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <h2>Your Car Inventory</h2>
//         {/* This div now ensures cards are stacked vertically and centered */}
//         <div className="d-flex flex-column align-items-center">
//           {inventory.map(car => (
//             <CarCard key={car._id} car={car} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard';
// import { fetchDealershipById } from '../services/dealershipService';
// import { fetchCarsByDealershipId } from '../services/carService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     // Fetch dealership data if user has an associated dealership ID
//     if (user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//           // Fetch cars associated with the dealership using the new function
//           fetchCarsByDealershipId(user.dealership)
//             .then(response => setInventory(response.data))
//             .catch(error => console.error("Error fetching cars:", error));
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     }
//   }, [user]);

//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center">
//         <h2>Your Account's Profiles</h2>
//         {user && <UserCard user={user} canDelete={false} />}
//         {dealership && <DealershipCard dealership={dealership} canDelete={false} />}
//       </div>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <h2>Your Car Inventory</h2>
//         <div className="d-flex flex-wrap justify-content-center">
//           {inventory.map(car => (
//             <CarCard key={car._id} car={car} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/auth.context';
// import UserCard from '../components/UserCard';
// import DealershipCard from '../components/DealershipCard';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);

//   console.log(user);
//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-5">Your Account's Profiles</h1>
//       <div className="d-flex justify-content-center">
//         {/* Display UserCard for dealership owner */}
//         <UserCard user={user} canDelete={false} />
//         <DealershipCard dealership={dealership} canDelete={false} />
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import { fetchDealershipById } from '../services/dealershipService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [dealership, setDealership] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDealershipData = async () => {
//       if (user?.dealership) {
//         try {
//           const response = await fetchDealershipById(user.dealership);
//           setDealership(response.data);
//         } catch (error) {
//           console.error("Error fetching dealership:", error);
//         }
//       } else {
//         console.log("User does not have an associated dealership ID.");
//       }
//       setIsLoading(false);
//     };

//     if (user) {
//       console.log(`Attempting to fetch dealership for user: ${user._id}`);
//       fetchDealershipData();
//     } else {
//       console.log("User data not yet loaded.");
//       setIsLoading(false);
//     }
//   }, [user]);

//   if (isLoading) {
//     return <div>Loading your information...</div>;
//   }

//   if (!user) {
//     return <div>User data not available.</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-5">Your Account's Profiles</h1>
//       <div className="d-flex flex-column align-items-center">
//         {/* Display UserCard for dealership owner */}
//         <UserCard user={user} canDelete={false} />

//         {/* Display DealershipCard if dealership data is available */}
//         {dealership && <DealershipCard dealership={dealership} canDelete={false} />}
//       </div>
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;

// // src/pages/DealershipOwnerViewPage.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import DealershipCard from '../components/DealershipCard';
// import UserCard from '../components/UserCard';
// import CarCard from '../components/CarCard'; // Assuming this component exists
// import LeadCard from '../components/LeadCard'; // Assuming this component exists
// import { fetchDealershipById } from '../services/dealershipService'; // Adjust based on your implementation
// import { fetchCars, deleteCar } from '../services/carService';// Placeholder, adjust based on your implementation
// import { fetchLeads, deleteLead } from '../services/leadService';

// const DealershipOwnerViewPage = () => {
//   const { user } = useContext(AuthContext);
//   const [section, setSection] = useState('profiles');
//   const [dealership, setDealership] = useState(null);
//   const [inventory, setInventory] = useState([]);
//   const [leads, setLeads] = useState([]);

//   useEffect(() => {
//     if (section === 'profiles' && user?.dealership) {
//       fetchDealershipById(user.dealership)
//         .then(response => {
//           setDealership(response.data);
//         })
//         .catch(error => console.error("Error fetching dealership:", error));
//     } else if (section === 'inventory') {
//       // Fetch inventory
//       fetchCars(user.dealership) // Assuming fetchInventory is implemented to take dealership ID
//         .then(response => setInventory(response.data))
//         .catch(error => console.error("Error fetching inventory:", error));
//     } else if (section === 'leads') {
//       // Fetch leads
//       fetchLeads(user.dealership) // Assuming fetchLeads is implemented to take dealership ID
//         .then(response => setLeads(response.data))
//         .catch(error => console.error("Error fetching leads:", error));
//     }
//   }, [section, user]);

//   return (
//     <div>
//       {/* Toggle between different sections */}
//       <div className="buttons">
//         <button onClick={() => setSection('profiles')}>Profiles</button>
//         <button onClick={() => setSection('inventory')}>Inventory</button>
//         <button onClick={() => setSection('leads')}>Leads</button>
//       </div>

//       {section === 'profiles' && (
//         <div>
//           {dealership && <DealershipCard dealership={dealership} />}
//           <UserCard user={user} />
//         </div>
//       )}

//       {section === 'inventory' && (
//         <div>
//           {inventory.map(car => (
//             <CarCard key={car._id} car={car} />
//           ))}
//         </div>
//       )}

//       {section === 'leads' && (
//         <div>
//           {leads.map(lead => (
//             <LeadCard key={lead._id} lead={lead} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DealershipOwnerViewPage;
