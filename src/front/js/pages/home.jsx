import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import dogImage from "../../img/dog.jpg";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
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

  );
};
