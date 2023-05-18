import React, { useState, useEffect } from "react";
import { getAllPets } from "../service/petgallery.js";
import "../../styles/allpets.css";
import { Petcard } from "../component/petcard.jsx";

export const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [petFilter, setPetFilter] = useState([]);
  const [checked, setChecked] = useState({})

  const getPets = async () => {
    const data = await getAllPets();
    setPets(data);
  }

  useEffect(() => {
    getPets()
  }, []);

  const filterPets = (petType) => {
    if (petFilter.length == 0) {
      const result = pets.filter((pet) => pet.type == petType);
      return setPetFilter(result);
    } else {
      const result = petFilter.filter((pet) => pet.type == petType);
      return setPetFilter(result);
    }
  };

  const filterCities = (cityName) => {
    if (petFilter.length == 0) {
      const result = pets.filter((pet) => pet.company.city == cityName);
      return setPetFilter(result);
    } else {
      const result = petFilter.filter((pet) => pet.company.city == cityName);
      return setPetFilter(result);
    }
  };

  const filterSizes = (petSize) => {
    if (petFilter.length == 0) {
      const result = pets.filter((pet) => pet.size == petSize);
      return setPetFilter(result);
    } else {
      const result = petFilter.filter((pet) => pet.size == petSize);
      return setPetFilter(result);
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
              setPetFilter([]);
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

        <div className="row blue-background">
          {petFilter.length == 0 ?
            pets.map((pet, index) => <Petcard key={index} pet={pet} />) :
            petFilter.map((pet, index) => <Petcard key={index} pet={pet} />)
          }
        </div>
      </div>
    </div>
  );
};
