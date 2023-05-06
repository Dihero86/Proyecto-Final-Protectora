import React, { useState, useEffect } from "react";
import { getAllPets } from "../service/petgallery.js"; // import the function to fetch the pets
import "../../styles/petgallery.css";

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
              <a className="dropdown-item" href="#">
                Option 3
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
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
              <a className="dropdown-item" href="#">
                Option 3
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
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
            Estado de Salud
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
              <a className="dropdown-item" href="#">
                Option 3
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </ul>
        </div>
        <div className="Buscar">
          <div className="btn-group">
            <button
              type="button"
              className="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Buscar
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
                <a className="dropdown-item" href="#">
                  Option 3
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-fluid px-5" id="mascotas">
        <div className="row mb-3">
          <div className="col"></div>
        </div>

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
    </div>
  );
};
