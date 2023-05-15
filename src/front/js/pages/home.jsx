import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import dogImage from "../../img/dog.jpg";
import { Link } from "react-router-dom";
import { Petcard } from "../component/petcard.jsx";
import { getAllPets } from "../service/petgallery";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [pet, setPet] = useState([])
  const [spin, setSpin] = useState(false)

  const getPetInfo = async () => {
    const data = await getAllPets();
    setPet(data.slice(-3))
    setSpin(true)
  }

  useEffect(() => {
    getPetInfo();
  }, [])

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

      <div className="container-fluid justify-content-center">

        <div className="row justify-content-center mx-2">
          <div className="col-lg-4 mx-4 my-4 boxini">
            <p>
              Para unirte a PetsBook y empezar a compartir las mascotas disponibles para adopción, por favor regístrate como Protectora o Asociación
            </p>
            <Link className="link" to="/create_company">
              <button className="btn">
                Registro protectoras
              </button>
            </Link>
          </div>
          <div className="col-lg-4 mx-4 my-4 boxini">
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

        <div className="row justify-content-center p-2 m-auto mb-5" id="pets">
          <h4>Algunos de las mascotas disponibles para adopción</h4>
          <div className="row petlist justify-content-evenly p-0">
            {spin ? pet.map((pet, index) => <Petcard key={index} pet={pet} />)


              :
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>}
          </div>
          <Link className="link" to="/pet_gallery">
            <button className="btn">
              Ver todas
            </button>
          </Link>
        </div>
      </div>
    </>

  );
};
