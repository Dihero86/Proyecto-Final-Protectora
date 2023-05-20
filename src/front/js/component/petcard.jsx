import React from "react";
import "../../styles/petcard.css";
import { useNavigate } from "react-router-dom";

export const Petcard = ({ pet }) => {

    const navigate = useNavigate();

    const handleClick = (event) => {
        navigate(`/one_pet/${pet.id}`)
    }

    const age = (date) => {
        const today = new Date();
        const birthday = new Date(date)
        let edad = today.getFullYear() - birthday.getFullYear()
        const mes = today.getMonth() - birthday.getMonth();

        if (edad < 1) {
            return "< 1 año"
        }
        if (mes < 0 || (mes === 0 && today.getDate() < birthday.getDate())) {
            edad--;
        }


        return edad + " años"
    }

    return (
        <div onClick={handleClick} className="card col-lg-3 m-2 col-sm-10 p-0" id="cardpet">
            <img src={pet.pet_Gallery[0].image_url} className="petimage" />
            <div className="card-body align-bottom">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text m-0">Edad: {age(pet.birth_date)}</p>
                <p className="card-text m-0">Ubicacion: {pet.company.city}</p>
                <p className="card-text m-0">Tipo: {pet.type}</p>
            </div>
        </div>
    )
}