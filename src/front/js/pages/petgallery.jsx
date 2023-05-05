import React, { useState, useEffect } from "react";
import { getAllPets } from "../service/petgallery.js"; // import the function to fetch the pets

export const PetGallery = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const petData = await getAllPets(); // fetch the pets
      setPets(petData); // set the pets in state
    };

    fetchPets(); // call the fetchPets function when the component mounts
  }, []);

  return (
    <div>
      {pets.map((pet) => (
        <div key={pet.id} className="card" style={{ width: "300px" }}>
          <h5 className="card-title">{pet.name}</h5>
          <div className="card-body">
            <img src=".." className="card-img-top" />
            <p className="card-text">
              {`Name: ${pet.name}, Age: ${pet.age}, Breed: ${pet.breed}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
