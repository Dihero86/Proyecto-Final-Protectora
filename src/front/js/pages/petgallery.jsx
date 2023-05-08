import React, { useState, useEffect } from "react";
import { getAllPets } from "../service/petgallery.js";
import "../../styles/petgallery.css";

export const PetGallery = () => {
  const [pets, setPets] = useState([]);
  const [breedTypes, setBreedTypes] = useState([]);
  const [statusTypes, setStatusTypes] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const petData = await getAllPets();
      setPets(petData);

      const uniqueBreeds = Array.from(new Set(petData.map((pet) => pet.breed)));
      setBreedTypes(uniqueBreeds);

      const uniqueStatusTypes = Array.from(
        new Set(petData.map((pet) => pet.status.type))
      );
      setStatusTypes(uniqueStatusTypes);
    };

    fetchPets();
  }, []);

  const handleBreedSelection = (event) => {
    const selectedBreed = event.target.value;
    if (event.target.checked) {
      setSelectedBreeds((prevSelectedBreeds) => [
        ...prevSelectedBreeds,
        selectedBreed,
      ]);
    } else {
      setSelectedBreeds((prevSelectedBreeds) =>
        prevSelectedBreeds.filter((breed) => breed !== selectedBreed)
      );
    }
  };

  const handleStatusSelection = (event) => {
    const selectedStatus = event.target.value;
    setSelectedStatus((prevSelectedStatus) =>
      prevSelectedStatus.includes(selectedStatus)
        ? prevSelectedStatus.filter((status) => status !== selectedStatus)
        : [...prevSelectedStatus, selectedStatus]
    );
  };

  const filteredPets = pets.filter((pet) => selectedBreeds.includes(pet.breed));

  return (
    <div className="main">
      <h1 className="titulo">Galería de Mascotas</h1>
      <div className="boton">
        <div className="btn-group">
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Ciudad
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Option 1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Option 2
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" type="checkbox">
                Option 3
              </a>
            </li>
          </ul>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Raza
          </button>
          <ul className="dropdown-menu">
            {breedTypes.map((breed, index) => (
              <li key={index}>
                <label className="dropdown-item">
                  <input
                    type="checkbox"
                    name={breed}
                    value={breed}
                    onChange={handleBreedSelection}
                  />
                  {breed}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Estado de Salud
          </button>
          <ul className="dropdown-menu">
            {statusTypes.map((status, index) => (
              <li key={index}>
                <label className="dropdown-item">
                  <input
                    type="checkbox"
                    name={status}
                    value={status}
                    onChange={handleStatusSelection}
                  />
                  {status}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="Buscar">
          <div className="btn-group">
            <button className="btn btn-primary" type="submit">
              Button
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid px-5" id="mascotas">
        <div className="row mb-3">
          <div className="col"></div>
        </div>

        {pets.length === 0 && <p>Loading...</p>}

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {" "}
          {/*Si pongo filtered.map me muestra los que selecciono, pero con pets.map me muestra solamente las mascotas que tengo creadas pero no se me actualiza cuando pulso , linea 157: hay que modifcarlo y debe de atacar la tabla pet gallery donde solo hay un id y una imagen.*/}
          {filteredPets.map((pet, index) => (
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
    </div>
  );
};
