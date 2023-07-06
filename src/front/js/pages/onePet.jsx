import React, { useState, useEffect, useContext } from "react";
import "../../styles/onePet.css";
import { getOnePet, startAdoptionProcess } from "../service/petgallery.js";
import { getOneCompany } from "../service/company.js";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const OnePet = () => {
  const { store, actions } = useContext(Context);

  const [pet, setPet] = useState({});
  const [company, setCompany] = useState({});
  const [state, setState] = useState(false);
  const [input, setInput] = useState({
    description: "",
  });
  const [msg, setMsg] = useState("");

  const params = useParams();
  const navigate = useNavigate();

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
  };

  const startAdoption = async () => {
    const resp = await startAdoptionProcess(input, pet.id);
    setMsg(resp.msg);

  };

  const handleClickApadrinar = () => {
    actions.addPet(pet)
    navigate("/colabora")
  }

  return (

    <div className="container">
      <h2 className="titlesesion my-5">{pet.name}</h2>
      <div className="row b-background">

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
            <p className="pet-age"><strong>Fecha de nacimiento: </strong>{pet.birth_date}</p>
            <p className="pet-breed"><strong>Raza: </strong>{pet.breed}</p>
            <p className="pet-company">
              <strong>{company.description}: </strong>{company.name}
            </p>
            <p className="pet-city">
              <strong>Localización: </strong>{company.adress} ,{company.city}{" "}
            </p>
          </div>
          <div className="col-md-12 mt-4 description-pet">
            <h4 className="subtitle m-4">Su historia</h4>
            <p className="description">{pet.description}</p>
          </div>
          <div className="col-md-12 p-4 buttons-div">
            {store.userRol == "client" ? (
              <button
                type="button"
                className=" col-xs-12 btn adoption-process"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fa-solid fa-heart"></i> Adoptar
              </button>
            ) : null}
            {(store.userRol == "admin" || store.userRol == "volunteer") && store.company.id == pet.company_id ? (
              <button
                type="button"
                className=" col-xs-12 btn"
                onClick={() => navigate(`/historial/${pet.id}`)}
              >
                Historial
              </button>
            ) : null}
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
                    {msg == "" ? null : <p style={{ color: "#275F70" }}>{msg}</p>}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn adoption-process"
                      data-bs-dismiss="modal"
                      onClick={() => setMsg("")}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn adoption-process"
                      onClick={startAdoption}
                    >
                      Enviar
                    </button>

                  </div>
                </div>
              </div>
            </div>
            {store.userRol == "client" ? (
              <button type="button" className=" col-xs-12 btn donation-process" onClick={handleClickApadrinar}>
                <i className="fa-solid fa-hand-holding-dollar"></i> Apadrinar
              </button>
            ) : null}
            {(store.userRol == "admin" || store.userRol == "volunteer") && store.company.id == pet.company_id ? (
              <button
                type="button"
                className=" col-xs-12 btn"
                onClick={() => navigate(`/edit_pet/${pet.id}`)}
              >
                Editar
              </button>
            ) : null}
          </div>

        </div>



      </div>
    </div>
  );
};
