// src/pages/DealershipOwnerViewPage.jsx
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import DealershipCard from '../components/DealershipCard';
import UserCard from '../components/UserCard';
import CarCard from '../components/CarCard';
import LeadCard from '../components/LeadCard';
import { fetchDealershipById } from '../services/dealershipService';
import { fetchCars } from '../services/carService';
import { fetchLeads } from '../services/leadService';

const DealershipOwnerViewPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const section = query.get('section') || 'profiles';

  const [dealership, setDealership] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    switch(section) {
      case 'profiles':
        if (user?.dealership) {
          fetchDealershipById(user.dealership).then(response => {
            setDealership(response.data);
          }).catch(error => console.error("Error fetching dealership:", error));
        }
        break;
      case 'inventory':
        fetchCars(user.dealership).then(response => {
          setInventory(response.data);
        }).catch(error => console.error("Error fetching cars:", error));
        break;
      case 'leads':
        fetchLeads(user.dealership).then(response => {
          setLeads(response.data);
        }).catch(error => console.error("Error fetching leads:", error));
        break;
      default:
        break;
    }
  }, [section, user.dealership]);

  return (
    <div>
      {/* Render based on section */}
      {section === 'profiles' && (
        <>
          {dealership && <DealershipCard dealership={dealership} />}
          <UserCard user={user} />
        </>
      )}
      {section === 'inventory' && inventory.map(car => <CarCard key={car._id} car={car} />)}
      {section === 'leads' && leads.map(lead => <LeadCard key={lead._id} lead={lead} />)}
    </div>
  );
};

export default DealershipOwnerViewPage;


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
