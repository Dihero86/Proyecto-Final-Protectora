import React, { useState, useEffect } from "react";
import { getAllPets } from "../service/petgallery.js";
import "../../styles/petgallery.css";

export const PetGallery = () => {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState([]);

  console.log(pets);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await getAllPets();
        setPets(pets);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPets();
  }, []);

  const filterPets = (petType) => {
    if (filter.length == 0) {
      const result = pets.filter((pet) => pet.type == petType);
      return setFilter(result);
    } else {
      const result = filter.filter((pet) => pet.type == petType);
      return setFilter(result);
    }
  };

  const filterCities = (cityName) => {
    if (filter.length == 0) {
      const result = pets.filter((pet) => pet.company.city == cityName);
      return setFilter(result);
    } else {
      const result = filter.filter((pet) => pet.company.city == cityName);
      return setFilter(result);
    }
  };

  const filterSizes = (petSize) => {
    if (filter.length == 0) {
      const result = pets.filter((pet) => pet.size == petSize);
      return setFilter(result);
    } else {
      const result = filter.filter((pet) => pet.size == petSize);
      return setFilter(result);
    }
  };

  const petTypes = () => {
    const types = pets.map((pet) => pet.type);
    const listTypes = new Set(types);
    return [...listTypes];
  };

  const petSizes = () => {
    const sizes = pets.map((pet) => pet.size);
    const listSizes = new Set(sizes);
    return [...listSizes];
  };

  const petCities = () => {
    const cities = pets.map((pet) => pet.company.city);
    const listCities = new Set(cities);
    return [...listCities];
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">Galería de Mascotas</h1>
        </div>
        <div className="col-md-6">
          <button
            className="all-pets"
            type="button"
            onClick={() => {
              setFilter([]);
            }}
          >
            Ver todas
          </button>
        </div>
        <div className="col-md-4">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ciudad
            </button>
            <ul className="dropdown-menu">
              {petCities().map((city) => {
                return (
                  <li onClick={() => filterCities(city)}>
                    <p className="dropdown-item">{city}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-1">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Animal
            </button>
            <ul className="dropdown-menu">
              {petTypes().map((type) => {
                return (
                  <li onClick={() => filterPets(type)}>
                    <p className="dropdown-item">{type}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-1">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Tamaño
            </button>
            <ul className="dropdown-menu">
              {petSizes().map((size) => {
                return (
                  <li onClick={() => filterSizes(size)}>
                    <p className="dropdown-item">{size}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-12 blue-background">
          <ul className="list">
            {filter.length == 0
              ? pets.map((pet) => {
                  return (
                    <li key={pet.id} className="pet-card">
                      {pet.photo ? (
                        pet.photo
                      ) : (
                        <img
                          src="https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                          className="card-img-top company-logo"
                          alt="..."
                        />
                      )}
                      <div className="pet-info">
                        <p className="pet-name">{pet.name}</p>
                        <p className="pet-age">{pet.age}</p>
                        <p className="pet-breed">{pet.breed}</p>
                      </div>
                    </li>
                  );
                })
              : filter.map((pet) => {
                  return (
                    <li key={pet.id} className="pet-card">
                      {pet.photo ? (
                        pet.photo
                      ) : (
                        <img
                          src="https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                          className="card-img-top company-logo"
                          alt="..."
                        />
                      )}
                      <div className="pet-info">
                        <p className="pet-name">{pet.name}</p>
                        <p className="pet-age">{pet.age}</p>
                        <p className="pet-breed">{pet.breed}</p>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};
