// src/components/LeadCard.jsx

import React from 'react';

const LeadCard = ({ lead, onProcessed, canProcess = false }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="card-body">
        <h5 className="card-title">{lead.name}</h5>
        <p className="card-text">Email: {lead.email}</p>
        <p className="card-text">Phone: {lead.phoneNumber}</p>
        <p className="card-text">Interested In: {lead.interestedIn}</p>
        {lead.message && <p className="card-text">Message: {lead.message}</p>}

        {canProcess && (
          <button onClick={() => onProcessed(lead._id)} className="btn btn-success">Processed</button>
        )}
      </div>
    </div>
  );
};

export default LeadCard;


// // Example Parent Component for Leads

// import React, { useContext } from 'react';
// import LeadCard from './LeadCard';
// import { AuthContext } from '../context/AuthContext'; // Assuming an auth context that contains user info

// const LeadsList = ({ leads }) => {
//   const { user } = useContext(AuthContext);

//   const handleProcessedLead = (leadId) => {
//     // Logic to mark the lead as processed
//     // This could involve an API call to update the lead's status in the backend
//   };

//   return (
//     <div>
//       {leads.map(lead => (
//         <LeadCard
//           key={lead._id}
//           lead={lead}
//           onProcessed={handleProcessedLead}
//           canProcess={user && user.privilege === 'dealership-owner'}
//         />
//       ))}
//     </div>
//   );
// };

// export default LeadsList;
