import React, { useState, useEffect } from "react";
import "../../styles/onePet.css";
import { getOnePet } from "../service/petgallery.js";
import { useParams } from "react-router-dom";

export const OnePet = () => {
  const [pet, setPet] = useState({});
  const params = useParams();
  console.log(params);

  const getInfoPet = async (pet_id) => {
    const data = await getOnePet(pet_id);
    setPet(data);
  };
  useEffect(() => {
    getInfoPet(params.pet_id);
  }, []);
  return (
    <div className="container_fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">{pet.name}</h1>
        </div>
        <div className="col-md-5 img-div">
          <div className="col-5 mb-3 pic-one">imagen 1</div>
          <div className="col-5 mb-3 pic-two">imagen 2</div>
          <div className="col-5 mb-3 pic-three">imagen 3</div>
          <div className="col-5 mb-3 pic-four">imagen 4</div>
          <div className="col-5 mb-3 pic-five">imagen 5</div>
        </div>
        <div className="col-md-5 info-div">
          <div className="col-md-12 info-pet">
            <h1 className="subtitle">Sus datos: </h1>
            <p className="pet-type">Especie: {pet.type}</p>
            <p className="pet-breed">Raza: {pet.breed}</p>
            <p className="pet-age">Fecha de nacimiento: {pet.birth_date}</p>
            <p className="pet-city">Localización: {pet.city}</p>
            <div className="col-md-12">
              <button type="button" className="btn start-adoption-process">
                <i className="fa-solid fa-heart"></i> ADOPTAR
              </button>
              <button type="button" className="btn start-reception-process">
                <i class="fa-solid fa-house-medical"></i> ACOGER
              </button>
              <button type="button" className="btn start-donation-process">
                <i className="fa-solid fa-hand-holding-dollar"></i> APADRINAR
              </button>
            </div>
          </div>
          <div className="col-md-12 description-pet">
            <h1 className="subtitle">Su historia: </h1>
            <p className="description">{pet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
