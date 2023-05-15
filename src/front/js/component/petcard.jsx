import React from "react";
import "../../styles/petcard.css";
import { useNavigate } from "react-router-dom";

export const Petcard = ({ pet }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        console.log(pet.id)
    }

    return (
        <div onClick={handleClick} className="card col-lg-3 my-2 col-sm-10 p-0" id="cardpet">
            <img src={pet.pet_Gallery[0].image_url} className="petimage" />
            <div className="card-body align-bottom">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text m-0">Edad: {pet.age}</p>
                <p className="card-text">Ubicacion: Madrid</p>
            </div>
        </div>
    )
}