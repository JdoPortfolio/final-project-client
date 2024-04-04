// src/components/CarCard.jsx

import React from 'react';

const CarCard = ({ car, onUpdate, onDelete, canModify = false }) => {
  return (
    <div className="card mb-3 d-flex flex-row" style={{ maxWidth: "540px" }}>
      <div className="col-md-4">
        {/* Assuming the first image in the array is the primary image to display */}
        <img src={car.images.length > 0 ? car.images[0] : "https://cartistic.com/img/placeholder-vehicle.jpg"} className="img-fluid rounded-start" alt={`${car.make} ${car.model}`} />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{`${car.make} ${car.model}`}</h5>
          <p className="card-text">Year: {car.year}</p>
          <p className="card-text">Price: ${car.price}</p>
          <p className="card-text">Condition: {car.condition}</p>
          {/* Conditionally render mileage if the car is used */}
          {car.condition === 'used' && <p className="card-text">Mileage: {car.mileage}</p>}

          {canModify && (
            <>
              <button onClick={() => onUpdate(car._id)} className="btn btn-primary me-2">Update</button>
              <button onClick={() => onDelete(car._id)} className="btn btn-danger">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;



// // Example usage in a parent component

// import React, { useContext } from 'react';
// import CarCard from './CarCard';
// import { AuthContext } from '../context/AuthContext'; // Assuming an auth context that contains user info

// const CarsList = ({ cars }) => {
//   const { user } = useContext(AuthContext);

//   const handleUpdateCar = (carId) => {
//     // Logic for updating a car
//   };

//   const handleDeleteCar = (carId) => {
//     // Logic for deleting a car
//   };

//   return (
//     <div>
//       {cars.map(car => (
//         <CarCard
//           key={car._id}
//           car={car}
//           onUpdate={handleUpdateCar}
//           onDelete={handleDeleteCar}
//           canModify={user && user.privilege === 'dealership-owner'}
//         />
//       ))}
//     </div>
//   );
// };

// export default CarsList;

