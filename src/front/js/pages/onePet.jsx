import React, { useState, useEffect } from "react";
import "../../styles/onePet.css";
import { getOnePet } from "../service/petgallery.js";
import { useParams } from "react-router-dom";

export const OnePet = () => {
  const [pet, setPet] = useState({});
  const [state, setState] = useState(false);
  const params = useParams();

  const getInfoPet = async (pet_id) => {
    const data = await getOnePet(pet_id);
    setPet(data);
    setState(true);
  };
  useEffect(() => {
    getInfoPet(params.pet_id);
  }, []);

  const startAdoptionProcess = () => {};
  return (
    <div className="container_fluid">
      <div className="row">
        <div className="col-md-12 m-4">
          <h1 className="title">{pet.name}</h1>
        </div>
        <div className="col-sm-5 mb-3 images-div">
          <div className="col-md-12 photo-div">
            <div className="col-8 mb-3">
              {state ? (
                <img
                  className="photo"
                  src={pet.pet_Gallery[0] ? pet.pet_Gallery[0].image_url : null}
                />
              ) : null}
            </div>
            <div className="col-5 mb-3">
              {state ? (
                <img
                  className="photo"
                  src={pet.pet_Gallery[1] ? pet.pet_Gallery[1].image_url : null}
                />
              ) : null}
            </div>
            <div className="col-5 mb-3">
              {state ? (
                <img
                  className="photo"
                  src={pet.pet_Gallery[2] ? pet.pet_Gallery[2].image_url : null}
                />
              ) : null}
            </div>
            <div className="col-5 mb-3">
              {state ? (
                <img
                  className="photo"
                  src={pet.pet_Gallery[3] ? pet.pet_Gallery[3].image_url : null}
                />
              ) : null}
            </div>
            <div className="col-5 mb-3">
              {state ? (
                <img
                  className="photo"
                  src={pet.pet_Gallery[4] ? pet.pet_Gallery[4].image_url : null}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-sm-5 mb-3 info-div">
          <div className="col-md-12 info-pet">
            <h1 className="subtitle m-4">Sus datos: </h1>
            <p className="pet-type">Especie: {pet.type}</p>
            <p className="pet-breed">Raza: {pet.breed}</p>
            <p className="pet-age">Fecha de nacimiento: {pet.birth_date}</p>
            <p className="pet-city">Localización: {pet.city}</p>
          </div>
          <div className="col-md-12 mt-4 description-pet">
            <h1 className="subtitle m-4">Su historia: </h1>
            <p className="description">{pet.description}</p>
          </div>
        </div>
        <div className="col-12 mb-3 buttons-div">
          <button type="button" className=" col-xs-12 btn adoption-process">
            <i className="fa-solid fa-heart"></i> ADOPTAR
          </button>
          <button type="button" className=" col-xs-12 btn donation-process">
            <i className="fa-solid fa-hand-holding-dollar"></i> APADRINAR
          </button>
        </div>
      </div>
    </div>
  );
};
