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
    <div className="container-fluid px-5">
      <h1 className="titulo">Galería de Mascotas</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {pets.map((pet, index) => (
          <div key={index} className="col">
            <div className="card">
              <img
                src={pet.photo}
                className="card-img-top"
                alt={`Photo of ${pet.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{`Age: ${pet.age}, Breed: ${pet.breed}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
