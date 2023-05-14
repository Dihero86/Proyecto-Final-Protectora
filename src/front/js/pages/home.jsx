import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import dogImage from "../../img/dog.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="image-container">
        <img src={dogImage} id="portada" />
        <div className="overlay">
          <div className="texto">
            <h2 className="card-title" id="title">Bienvenidos a PetsBook!</h2>
            <p className="card-text" id="description">
              Este es el primer sitio web donde conviven todas las protectoras de España.
              Si quieres unirte a la familia PetsBook regístrate como usuario o
              protectora/asociación y empieza a colaborar!</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center p-4">
        <div className="col-lg-4 mx-4 my-4">
          <p>
            Para unirte a PetsBook y empezar a compartir las mascotas disponibles para adopción, por favor regístrate como Protectora o Asociación
          </p>

          <Link className="link" to="/create_company">
            <button className="btn">
              Registro protectoras
            </button>
          </Link>

        </div>
        <div className="col-lg-4 mx-4 my-4">
          <p>
            Para poder solicitar un proceso de adopción de nuestras mascotas disponibles, por favor regístrate como usuario. Estamos deseando conocerte!
          </p>

          <Link className="link" to="/register_user">
            <button className="btn">
              Registro usuario
            </button>
          </Link>

        </div>
      </div>

    </>

  );
};
