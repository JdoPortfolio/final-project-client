// src/components/UserCard.jsx

import React from 'react';

const UserCard = ({ user, onUpdate, onDelete, canUpdate = false, canDelete = false }) => {
  return (
    <div className="card mb-3 d-flex flex-row" style={{ maxWidth: "540px" }}>
      <div className="col-md-4">
        <img src={user.profilePicture || "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"} className="img-fluid rounded-start" alt={user.name} />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.email}</p>
          <p className="card-text"><small className="text-muted">Privilege: {user.privilege}</small></p>
          {user.dealership && <p className="card-text">Dealership ID: {user.dealership}</p>}
          
          {canUpdate && (
            <button onClick={() => onUpdate(user)} className="btn btn-primary me-2">Update</button>
          )}
          
          {canDelete && (
            <button onClick={() => onDelete(user._id)} className="btn btn-danger">Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;




// Important for the parent component

// // Example of using UserCard in a parent component

// import React, { useContext } from 'react';
// import UserCard from './UserCard';
// import { UsersContext } from '../context/UsersContext'; // Assume you have a context for users

// const UsersList = () => {
//   const { deleteUser, updateUser } = useContext(UsersContext);
  
//   const handleDeleteUser = (userId) => {
//     deleteUser(userId)
//       .then(() => {
//         // handle success (e.g., show a message, refresh the list)
//       })
//       .catch(error => {
//         // handle error (e.g., show error message)
//       });
//   };

//   const handleUpdateUser = (user) => {
//     // Direct the application to a form where the user can be updated
//     // Or open a modal with user info preloaded for editing
//   };

//   // Assume users is an array of user objects
//   const users = []; // This would come from your UsersContext or props

//   return (
//     <div>
//       {users.map((user) => (
//         <UserCard
//           key={user._id}
//           user={user}
//           onUpdate={handleUpdateUser}
//           onDelete={handleDeleteUser}
//           canUpdate={user.privilege === 'dealership-owner'}
//           canDelete={/* logic to determine if the delete button should show */ false}
//         />
//       ))}
//     </div>
//   );
// };