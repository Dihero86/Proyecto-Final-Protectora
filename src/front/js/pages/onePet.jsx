import React, { useState, useEffect } from "react";
import "../../styles/onePet.css";
import { getOnePet } from "../service/petgallery.js";

export const OnePet = () => {
  const [pet, setPet] = useState([]);
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const pet = await getOnePet(id);
        setPet(pet);
      } catch (err) {
        console.log(err);
      }
      console.log(pet);
    };
    fetchPet();
  }, []);
  return (
    <div className="container_fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">Nombre</h1>
        </div>
        <div className="col-md-5 img-div">
          <div className="col-md-8 pic-one">imagen 1</div>
          <div className="col-md-5 pic-two">imagen 2</div>
          <div className="col-md-5 pic-three">imagen 3</div>
          <div className="col-md-5 pic-four">imagen 4 </div>
          <div className="col-md-5 pic-five">imagen 5</div>
        </div>
        <div className="col-md-5 info-div">
          <div className="col-md-12 info-pet">
            <h1 className="subtitle">Sus datos: </h1>
            <p className="pet-type">Especie: </p>
            <p className="pet-breed">Raza:</p>
            <p className="pet-age">Fecha de nacimiento:</p>
            <p className="pet-city">Localización:</p>
            <div className="col-md-12">
              <button type="button" className="btn start-adoption-process">
                <i className="fa-solid fa-heart">
                  <span> Adoptar</span>
                </i>
              </button>
              <button type="button" className="btn start-donation-process">
                <i className="fa-solid fa-hand-holding-dollar">
                  <span> Apadrinar</span>
                </i>
              </button>
            </div>
          </div>
          <div className="col-md-12 description-pet">
            <h1 className="subtitle">Su historia: </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
