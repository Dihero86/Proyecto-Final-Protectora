import React, { useState, useEffect } from "react";
import "../../styles/onePet.css";
import { getOnePet, startAdoptionProcess } from "../service/petgallery.js";
import { getOneCompany } from "../service/company.js";
import { useParams } from "react-router-dom";

export const OnePet = () => {
  const [pet, setPet] = useState({});
  const [company, setCompany] = useState({});
  const [state, setState] = useState(false);
  const [input, setInput] = useState({
    description: "",
  });

  const params = useParams();

  const getInfoPet = async (pet_id) => {
    const data = await getOnePet(pet_id);
    setPet(data);
    const company_id = data.company_id;
    const companyInfo = await getOneCompany(company_id);
    setCompany(companyInfo);
    setState(true);
  };

  useEffect(() => {
    getInfoPet(params.pet_id);
  }, []);

  const getInputValue = (e) => {
    setInput({ description: e.target.value });
    console.log(input);
  };

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
            <p className="pet-age">Fecha de nacimiento: {pet.birth_date}</p>
            <p className="pet-breed">Raza: {pet.breed}</p>
            <p className="pet-company">
              {company.description}: {company.name}
            </p>
            <p className="pet-city">
              Localización: {company.adress} ,{company.city}{" "}
            </p>
          </div>
          <div className="col-md-12 mt-4 description-pet">
            <h1 className="subtitle m-4">Su historia: </h1>
            <p className="description">{pet.description}</p>
          </div>
        </div>
        <div className="col-12 mb-3 buttons-div">
          <button
            type="button"
            className=" col-xs-12 btn adoption-process"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa-solid fa-heart"></i> ADOPTAR
          </button>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Solicitud de Adopción
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Se va a proceder a enviar una solicitud de adopción a la{" "}
                  <b>
                    {company.description} {company.name}
                  </b>
                  , en <b>{company.city}</b>. ¿Está seguro de que quiere
                  continuar? Añada un comentario contándonos un poco más sobre
                  Utd y porqué le gustaría adoptar/acoger a <b>{pet.name}</b>.
                  <div className="form-floating">
                    <textarea
                      className="form-control my-3"
                      id="floatingTextarea"
                      onChange={(e) => getInputValue(e)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn adoption-process"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn adoption-process"
                    onClick={() => {
                      startAdoptionProcess(input, pet.id);
                      alert(
                        `Contactarán con Ud. en los próximos días vía email.\n (${company.email}, ${company.phone})`
                      );
                    }}
                    data-bs-dismiss="modal"
                  >
                    Enviar
                  </button>
                  {/*    ----ALERT DESPUES DE ENVIAR----
                   */}
                </div>
              </div>
            </div>
          </div>
          <button type="button" className=" col-xs-12 btn donation-process">
            <i className="fa-solid fa-hand-holding-dollar"></i> APADRINAR
          </button>
        </div>
      </div>
    </div>
  );
};
