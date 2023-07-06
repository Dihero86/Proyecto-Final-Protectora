import React, { useState, useEffect } from "react";
import { getAllPets } from "../service/petgallery.js";
import "../../styles/allpets.css";
import { Petcard } from "../component/petcard.jsx";

export const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [petFilter, setPetFilter] = useState([]);
  const [spin, setSpin] = useState(false);
  const [select, setSelect] = useState({
    city: "",
    type: "",
    size: "",
  });

  const getPets = async () => {
    const data = await getAllPets();
    setPets(data);
    setPetFilter(data);
    setSpin(true);
  };

  useEffect(() => {
    getPets();
  }, []);

  const filterProccess = (pet, selector) => {
    let city = true;
    let type = true;
    let size = true;
    if (selector.city != "") {
      city = selector.city === pet.company.city;
    }
    if (selector.type != "") {
      type = selector.type === pet.type;
    }
    if (selector.size != "") {
      size = selector.size === pet.size;
    }
    return city && type && size;
  };

  const filterPets = (event) => {
    const newSelection = { ...select, [event.target.name]: event.target.value };
    const result = pets.filter((pet) => filterProccess(pet, newSelection));
    if (result == []) {
      setSelect({
        city: "",
        type: "",
        size: "",
      });
    }
    setSelect({ ...select, [event.target.name]: event.target.value });
    setPetFilter([...result]);
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
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="titlesesion my-5">Galería de Mascotas</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <button
              className="all-pets"
              type="button"
              onClick={() => {
                setSelect({
                  city: "",
                  type: "",
                  size: "",
                });
                setPetFilter([...pets]);
              }}
            >
              Ver todas
            </button>
          </div>
          <div className="col-md-6 ">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle menu mx-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Ciudad
              </button>
              <ul className="dropdown-menu">
                {petCities().map((city) => {
                  return (
                    <li key={city} onClick={filterPets}>
                      <button
                        className={
                          select.city == city
                            ? "dropdown-item selected"
                            : "dropdown-item"
                        }
                        name="city"
                        value={city}
                      >
                        {city}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle menu mx-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Animal
              </button>
              <ul className="dropdown-menu">
                {petTypes().map((type) => {
                  return (
                    <li key={type} onClick={filterPets}>
                      <button
                        className={
                          select.type == type
                            ? "dropdown-item selected"
                            : "dropdown-item"
                        }
                        name="type"
                        value={type}
                      >
                        {type}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle menu mx-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tamaño
              </button>
              <ul className="dropdown-menu">
                {petSizes().map((size) => {
                  return (
                    <li key={size} onClick={filterPets}>
                      <button
                        className={
                          select.size == size
                            ? "dropdown-item selected"
                            : "dropdown-item"
                        }
                        name="size"
                        value={size}
                      >
                        {size}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row b-background">
          {spin ? (
            petFilter.map((pet, index) => <Petcard key={index} pet={pet} />)
          ) : (
            <div
              className="spinner-border"
              style={{ color: "#275F70", width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
