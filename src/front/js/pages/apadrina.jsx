import React, { useState, useEffect, useContext } from "react";
import "../../styles/apadrina.css";
import { useNavigate, Link } from "react-router-dom";
import { getAllPets } from "../service/petgallery";
import { Context } from "../store/appContext";

export const Apadrina = () => {
    const [pets, setPets] = useState([]);
    const { store, actions } = useContext(Context);
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate();

    const getPets = async () => {
        const data = await getAllPets();
        setPets(data);
    };

    useEffect(() => {
        getPets();
    }, []);

    const handleChange = ({ target }) => {
        if (target.name == "animal") {
            console.log(target.selectedIndex)
            actions.addPet(pets[target.selectedIndex - 1])
        } else {
            setAmount(target.value)
        }
    }

    const handleSubmit = () => {
        actions.setCash(amount)
        navigate("/pago")
    }


    return (
        <>
            <h2 className="titlesesion my-5">Apadrina</h2>
            <div className="container-fluid textoapadrina">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 ">
                        <p>¿Eres amante de los animales y te gustaría colaborar con ellos para mejorar su estancia en su albergue? ¿Querrías adoptar un perro, pero no puedes por circunstancias personales?
                            Si la respuesta a alguna de estas preguntas es "sí", ¡el apadrinamiento es para ti!
                            Apadrinando un animal formarás parte de su recuperación durante su estancia en el albergue, ayudándo a cada asociación con los gastos derivados de su manutención y veterinario.
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        {store.userRol == "client" ?
                            <form onChange={handleChange} onSubmit={handleSubmit}>
                                <div className="position-relative">
                                    <label htmlFor="validationTooltipcash" className="form-label">¿Qué cantidad puedes donar?</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="validationTooltipUsernamePrepend">€</span>
                                        <input type="number" className="form-control my-0" id="validationTooltipcash" aria-describedby="validationTooltipUsernamePrepend" required />
                                        <div className="invalid-tooltip">
                                            Por favor escoja un monto a donar
                                        </div>
                                    </div>
                                    <div className="position-relative my-5">
                                        <label className="form-label">Mascota</label>
                                        <select className="form-select" id="Tamaño" name="animal" value={store.pet.name} placeholder="Seleccione una mascota" required>
                                            <option value="" disabled selected>Seleccione una mascota</option>
                                            {pets.map((pet) => <option key={pet.id}>{pet.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="position-relative my-5">
                                        {Object.keys(store.pet).length === 0 ? null : <img src={(store.pet).pet_Gallery[0].image_url} className="imgapadrina" />}
                                    </div>
                                </div>
                                <button className="submit">
                                    Pagar
                                </button>
                            </form> :
                            <div className="d-flex  flex-column mb-3">
                                <p>Para poder comenzar a apadrinar en necesario iniciar sesión</p>
                                <Link className="link" to="/login_user">
                                    <button className="btn">
                                        Acceder
                                    </button>
                                </Link>

                                <Link className="link" to="/register_user">
                                    <button className="btn">Registrarse</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div >
            </div >
        </>
    )
}