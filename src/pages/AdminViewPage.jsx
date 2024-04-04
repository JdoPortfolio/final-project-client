import React, { useContext, useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import DealershipCard from "../components/DealershipCard";
import { AuthContext } from "../context/auth.context";
import { fetchUsersWithPrivilege, deleteUserById } from "../services/userService"; // Make sure deleteUserById is implemented
import { fetchDealerships } from "../services/dealershipService"; // Make sure deleteDealershipById is implemented
import { deleteDealership as deleteDealershipService } from "../services/dealershipService";
import AdminNavbar from "../components/AdminNavbar";
import AddNewUserModal from "../components/AddNewUserModal";
import AddNewDealershipModal from "../components/AddNewDealershipModal";

const AdminViewPage = () => {
  const [content, setContent] = useState([]);
  const [display, setDisplay] = useState("dealershipOwner");
  const { user } = useContext(AuthContext);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddDealershipModal, setShowAddDealershipModal] = useState(false);

  useEffect(() => {
    if (display === "dealershipOwner") {
      fetchUsersWithPrivilege("dealership-owner")
        .then((response) => setContent(response.data))
        .catch((error) => console.error("Failed to fetch dealership owners:", error));
    } else if (display === "dealership") {
      fetchDealerships()
        .then((response) => setContent(response.data))
        .catch((error) => console.error("Failed to fetch dealerships:", error));
    }
  }, [display]);

  const canDelete = user && user.privilege === "admin";

  const handleAddNewAccount = () => setShowAddUserModal(true);
  const handleAddNewDealership = () => setShowAddDealershipModal(true);

  const refreshUsers = () => {
    fetchUsersWithPrivilege("dealership-owner")
      .then((response) => setContent(response.data))
      .catch((error) => console.error("Failed to refresh users:", error));
  };

  const refreshDealerships = () => {
    fetchDealerships()
      .then((response) => setContent(response.data))
      .catch((error) => console.error("Failed to refresh dealerships:", error));
  };

  const deleteUser = (userId) => {
    deleteUserById(userId)
      .then(() => refreshUsers())
      .catch((error) => console.error("Failed to delete user:", error));
  };

  const handleDeleteDealership = (dealershipId) => {
    deleteDealershipService(dealershipId)
      .then(() => refreshDealerships())
      .catch((error) => console.error("Failed to delete dealership:", error));
};

  return (
    <>
      <AdminNavbar onDisplayChange={setDisplay} />
      <div className="container mt-5">
        <h1 className="text-center mb-5">
          {display === "dealershipOwner" ? "Dealership-Owners Accounts" : "Dealerships"}
        </h1>
        <div className="d-flex flex-column align-items-center">
          {content.map((item) =>
            display === "dealershipOwner" ? (
              <UserCard key={item._id} user={item} canDelete={canDelete} onDelete={() => deleteUser(item._id)} />
            ) : (
              <DealershipCard key={item._id} dealership={item} canDelete={canDelete} onDelete={() => handleDeleteDealership(item._id)} />
            )
          )}
          {display === "dealershipOwner" && (
            <button onClick={handleAddNewAccount} className="btn btn-primary mt-4 mb-4">
              Add New Account
            </button>
          )}
          {display === "dealership" && (
            <button onClick={handleAddNewDealership} className="btn btn-primary mt-4 mb-4">
              Add New Dealership
            </button>
          )}
        </div>
        <AddNewUserModal show={showAddUserModal} handleClose={() => setShowAddUserModal(false)} refreshUsers={refreshUsers} />
        <AddNewDealershipModal show={showAddDealershipModal} handleClose={() => setShowAddDealershipModal(false)} refreshDealerships={refreshDealerships} />
      </div>
    </>
  );
};

export default AdminViewPage;


// import React, { useContext, useEffect, useState } from "react";
// import UserCard from "../components/UserCard";
// import DealershipCard from "../components/DealershipCard";
// import { AuthContext } from "../context/auth.context";
// import { fetchUsersWithPrivilege } from "../services/userService";
// import { fetchDealerships } from "../services/dealershipService";
// import AdminNavbar from "../components/AdminNavbar";
// import AddNewUserModal from "../components/AddNewUserModal";
// import AddNewDealershipModal from "../components/AddNewDealershipModal";

// const AdminViewPage = () => {
//   const [content, setContent] = useState([]);
//   const [display, setDisplay] = useState("dealershipOwner");
//   const { user } = useContext(AuthContext);

//   const [showAddDealershipModal, setShowAddDealershipModal] = useState(false);

//   const handleAddNewDealership = () => {
//     setShowAddDealershipModal(true); // Open the modal to add a new dealership
//   };

//   const refreshDealerships = () => {
//     // Fetch dealerships again to refresh the list
//     fetchDealerships()
//       .then((response) => setContent(response.data))
//       .catch((error) => console.error("Failed to refresh dealerships:", error));
//   };

//   const [showAddUserModal, setShowAddUserModal] = useState(false);

//   useEffect(() => {
//     if (display === "dealershipOwner") {
//       fetchUsersWithPrivilege("dealership-owner")
//         .then((response) => setContent(response.data))
//         .catch((error) =>
//           console.error("Failed to fetch dealership owners:", error)
//         );
//     } else if (display === "dealership") {
//       fetchDealerships()
//         .then((response) => setContent(response.data))
//         .catch((error) => console.error("Failed to fetch dealerships:", error));
//     }
//   }, [display]);

//   const canDelete = user && user.privilege === "admin";

//   const handleAddNewAccount = () => {
//     setShowAddUserModal(true); // Open the modal to add a new user
//   };

//   const refreshUsers = () => {
//     // Fetch users again to refresh the list
//     fetchUsersWithPrivilege("dealership-owner")
//       .then((response) => setContent(response.data))
//       .catch((error) => console.error("Failed to refresh users:", error));
//   };

//   return (
//     <>
//       <AdminNavbar onDisplayChange={setDisplay} />
//       <div className="container mt-5">
//         <h1 className="text-center mb-5">
//           {display === "dealershipOwner"
//             ? "Dealership-Owners Accounts"
//             : "Dealerships"}
//         </h1>
//         <div className="d-flex flex-column align-items-center">
//           {content.map((item) =>
//             display === "dealershipOwner" ? (
//               <UserCard key={item._id} user={item} canDelete={canDelete} />
//             ) : (
//               <DealershipCard
//                 key={item._id}
//                 dealership={item}
//                 canDelete={canDelete}
//               />
//             )
//           )}
//           {display === "dealershipOwner" && (
//             <button
//               onClick={handleAddNewAccount}
//               className="btn btn-primary mt-4 mb-4"
//             >
//               Add New Account
//             </button>
//           )}
//           {display === "dealership" && (
//             <button
//               onClick={handleAddNewDealership}
//               className="btn btn-primary mt-4 mb-4"
//             >
//               Add New Dealership
//             </button>
//           )}
//         </div>
//         <AddNewUserModal
//           show={showAddUserModal}
//           handleClose={setShowAddUserModal.bind(this, false)}
//           refreshUsers={refreshUsers}
//         />
//         <AddNewDealershipModal
//           show={showAddDealershipModal}
//           handleClose={() => setShowAddDealershipModal(false)}
//           refreshDealerships={refreshDealerships}
//         />
//       </div>
//     </>
//   );
// };

// export default AdminViewPage;

// import React, { useContext, useEffect, useState } from "react";
// import UserCard from "../components/UserCard";
// import DealershipCard from "../components/DealershipCard";
// import { AuthContext } from "../context/auth.context";
// import { fetchUsersWithPrivilege } from "../services/userService";
// import { fetchDealerships } from "../services/dealershipService";
// import AdminNavbar from "../components/AdminNavbar";
// import AddNewUserModal from "../components/AddNewUserModal";

// const AdminViewPage = () => {
//   const [content, setContent] = useState([]);
//   const [display, setDisplay] = useState("dealershipOwner");
//   const { user } = useContext(AuthContext);

//   const [showAddUserModal, setShowAddUserModal] = useState(false);

//   const openAddUserModal = () => setShowAddUserModal(true);
//   const closeAddUserModal = () => setShowAddUserModal(false);

//   useEffect(() => {
//     if (display === "dealershipOwner") {
//       fetchUsersWithPrivilege("dealership-owner")
//         .then((response) => setContent(response.data))
//         .catch((error) =>
//           console.error("Failed to fetch dealership owners:", error)
//         );
//     } else if (display === "dealership") {
//       fetchDealerships()
//         .then((response) => setContent(response.data))
//         .catch((error) => console.error("Failed to fetch dealerships:", error));
//     }
//   }, [display]);

//   const canDelete = user && user.privilege === "admin";

//   const handleAddNewAccount = () => {
//     console.log("Add new account clicked");
//     // Add your logic for adding a new dealership-owner account
//   };

//   const handleAddNewDealership = () => {
//     console.log("Add new dealership clicked");
//     // Add your logic for adding a new dealership
//   };

//   return (
//     <>
//       <AdminNavbar onDisplayChange={setDisplay} />
//       <div className="container mt-5">
//         <h1 className="text-center mb-5 ">
//           {display === "dealershipOwner"
//             ? "Dealership-Owners Accounts"
//             : "Dealerships"}
//         </h1>
//         <div className="d-flex flex-column align-items-center">
//           {content.map((item) =>
//             display === "dealershipOwner" ? (
//               <UserCard key={item._id} user={item} canDelete={canDelete} />
//             ) : (
//               <DealershipCard
//                 key={item._id}
//                 dealership={item}
//                 canDelete={canDelete}
//               />
//             )
//           )}
//           {display === "dealershipOwner" && (
//             <button
//               onClick={handleAddNewAccount}
//               className="btn btn-primary mt-4 mb-4"
//             >
//               Add New Account
//             </button>
//           )}
//           {display === "dealership" && (
//             <button
//               onClick={handleAddNewDealership}
//               className="btn btn-primary mt-4 mb-4"
//             >
//               Add New Dealership
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminViewPage;

// import React, { useContext, useEffect, useState } from "react";
// import UserCard from "../components/UserCard";
// import DealershipCard from "../components/DealershipCard";
// import { AuthContext } from "../context/auth.context";
// import { fetchUsersWithPrivilege } from "../services/userService"; // Adjust based on actual implementation
// import { fetchDealerships } from "../services/dealershipService"; // Adjust based on actual implementation
// import AdminNavbar from "../components/AdminNavbar";

// const AdminViewPage = () => {
//   const [content, setContent] = useState([]);
//   const [display, setDisplay] = useState("dealershipOwner");
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (display === "dealershipOwner") {
//       fetchUsersWithPrivilege("dealership-owner")
//         .then((response) => setContent(response.data))
//         .catch((error) =>
//           console.error("Failed to fetch dealership owners:", error)
//         );
//     } else if (display === "dealership") {
//       fetchDealerships()
//         .then((response) => setContent(response.data))
//         .catch((error) => console.error("Failed to fetch dealerships:", error));
//     }
//   }, [display]);

//   const canDelete = user && user.privilege === "admin";

//     const handleAddNewAccount = () => {
//     // Placeholder function - Adjust based on your routing/navigation needs
//     console.log("Add new account clicked");

//   };
//     const handleAddNewDealership = () => {
//     // Placeholder function - Adjust based on your routing/navigation needs
//     console.log("Add new dealership clicked");

//   };

//   return (
//     <>
//       <AdminNavbar onDisplayChange={setDisplay} />
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">
//           {display === "dealershipOwner"
//             ? "Dealership-Owners Accounts"
//             : "Dealerships"}
//         </h1>
//         <div className="d-flex flex-column align-items-center">
//           {content.map((item) =>
//             display === "dealershipOwner" ? (
//               <UserCard key={item._id} user={item} canDelete={canDelete} />
//             ) : (
//               <DealershipCard
//                 key={item._id}
//                 dealership={item}
//                 canDelete={canDelete}
//               />
//             )
//           )}
//           <button
//             onClick={handleAddNewAccount}
//             className="btn btn-primary mt-4 mb-4"
//           >
//             Add New Account
//           </button>
//           <button
//             onClick={handleAddNewDealership}
//             className="btn btn-primary mt-4 mb-4"
//           >
//             Add New Dealership
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminViewPage;

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchUsersWithPrivilege } from '../services/userService';
// import UserCard from '../components/UserCard';
// import { AuthContext } from '../context/auth.context';

// const AdminViewPage = () => {
//   const [dealershipOwners, setDealershipOwners] = useState([]);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {

//     fetchUsersWithPrivilege('dealership-owner')
//       .then(response => {
//         setDealershipOwners(response.data);
//       })
//       .catch(error => {
//         console.error("Failed to fetch dealership owners:", error);
//       });
//   }, []);

//   const canDelete = user && user.privilege === 'admin';

//   const handleAddNewAccount = () => {
//     // Placeholder function - Adjust based on your routing/navigation needs
//     console.log("Add new account clicked");

//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Dealership-Owners Accounts</h1>
//       <div className="d-flex flex-column align-items-center">
//         {dealershipOwners.map(owner => (
//           <UserCard
//             key={owner._id}
//             user={owner}
//             canUpdate={false}
//             canDelete={canDelete}
//           />
//         ))}
//         <button
//           onClick={handleAddNewAccount}
//           className="btn btn-primary mt-4 mb-4"
//         >
//           Add New Account
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminViewPage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchUsersWithPrivilege } from '../services/userService'; // Adjust based on your actual service implementation
// import UserCard from '../components/UserCard';

// const AdminViewPage = () => {
//   const [dealershipOwners, setDealershipOwners] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsersWithPrivilege('dealership-owner')
//       .then(response => {
//         setDealershipOwners(response.data);
//       })
//       .catch(error => {
//         console.error("Failed to fetch dealership owners:", error);
//       });
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-8 ">Dealership-Owners Accounts</h1>
//       <div className="d-flex flex-column align-items-center">
//         {dealershipOwners.map(user => (
//           // Each UserCard is now simply placed in a flex column container
//           <div key={user._id} className="w-100 d-flex justify-content-center">
//             <UserCard user={user} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminViewPage;
