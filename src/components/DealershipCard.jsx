// src/components/DealershipCard.jsx
import React from 'react';

const DealershipCard = ({ dealership, onUpdate, onDelete, canUpdate = false, canDelete = false }) => {
  const phoneNumber = dealership?.contact?.phone;
  const email = dealership?.contact?.email;

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={dealership.image} className="img-fluid rounded-start" alt="dealership" />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{dealership.name}</h5>
            <p className="card-text">{dealership.location}</p>
            {phoneNumber && <p className="card-text">Phone: {phoneNumber}</p>}
            {email && <p className="card-text">Email: {email}</p>}
            {/* Use mt-auto to push controls to the bottom */}
            <div className="mt-auto ms-auto">
              {canUpdate && (
                <button onClick={() => onUpdate(dealership._id)} className="btn btn-primary me-2">Update</button>
              )}
              {canDelete && (
                <button onClick={() => onDelete(dealership._id)} className="btn btn-danger">Delete</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealershipCard;


// import React from 'react';

// const DealershipCard = ({ dealership, onUpdate, onDelete, canUpdate = false, canDelete = false }) => {
//   return (
//     <div className="card mb-3 d-flex flex-row" style={{ maxWidth: "540px" }}>
//       <div className="col-md-4">
//         <img src={dealership.image} className="img-fluid rounded-start" alt="dealership" />
//       </div>
//       <div className="col-md-8">
//         <div className="card-body">
//           <h5 className="card-title">{dealership.name}</h5>
//           <p className="card-text">{dealership.location}</p>
//           <p className="card-text">Phone: {dealership.contact.phone}</p>
//           {dealership.contact.email && <p className="card-text">Email: {dealership.contact.email}</p>}

//           {canUpdate && (
//             <button onClick={() => onUpdate(dealership._id)} className="btn btn-primary me-2">Update</button>
//           )}
          
//           {canDelete && (
//             <button onClick={() => onDelete(dealership._id)} className="btn btn-danger">Delete</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealershipCard;


// // Example Parent Component

// import React, { useEffect, useState, useContext } from 'react';
// import DealershipCard from './DealershipCard';
// import { DealershipContext } from '../context/DealershipContext'; // Assume you have this context

// const DealershipsList = () => {
//   const { dealerships, deleteDealership, updateDealership } = useContext(DealershipContext);
//   const [loggedInUser, setLoggedInUser] = useState(null); // Assume you fetch this from your auth context
  
//   useEffect(() => {
//     // Fetch logged in user details and set it
//     // This could be done via an AuthContext or similar
//   }, []);

//   const handleDeleteDealership = (dealershipId) => {
//     deleteDealership(dealershipId)
//       .then(() => {
//         // Handle successful deletion, e.g., refresh the list or show a success message
//       })
//       .catch(error => {
//         // Handle error
//       });
//   };

//   const handleUpdateDealership = (dealershipId) => {
//     // Navigate to an update form or open a modal for updating dealership details
//   };

//   return (
//     <div>
//       {dealerships.map((dealership) => (
//         <DealershipCard
//           key={dealership._id}
//           dealership={dealership}
//           onUpdate={handleUpdateDealership}
//           onDelete={handleDeleteDealership}
//           canUpdate={loggedInUser && loggedInUser.privilege === 'dealership-owner'}
//           canDelete={loggedInUser && loggedInUser.privilege === 'admin'}
//         />
//       ))}
//     </div>
//   );
// };

// export default DealershipsList;
