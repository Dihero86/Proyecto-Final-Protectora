import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { companyDash } from "../service";
import "../../styles/companyDashboard.css";
import { Petcard } from "../component/petcard.jsx";
import { Context } from "../store/appContext";
import { ModalVolunteer } from "../component/modalVolunteer.jsx";

export const CompanyDashboard = () => {
    const [pets, setPets] = useState([]);
    const [company, setCompany] = useState({});
    const { store, actions } = useContext(Context);
    const [spin, setSpin] = useState(false);
    const navigate = useNavigate();

    const getPets = async () => {
        const data = await companyDash();
        if (data.hasOwnProperty("msg")) {
            localStorage.removeItem("token");
            actions.deleteCompany();
            navigate("/login_user")
        }
        else {
            setPets(data.pets);
            setCompany(data.company)
            actions.addCompany(data.company)
            setSpin(true)
        }
    }

    useEffect(() => {
        getPets();
    }, []);

    return (
        <div className="d-flex row dashcontainer">

            <div className="col-lg-2 flex-shrink-0 p-3 sidebardash" >
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <p className="sidebartitle" >
                            {company.name}
                        </p>
                    </li>
                    <li className="mb-1 list-item">
                        <img
                            src={
                                company.logo
                                    ? company.logo
                                    : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                            }
                            width={"100 %"}
                        />
                    </li>
                    <hr></hr>
                    <Link className="sidelink" to="/edit_company">
                        <li className="mb-1">
                            <p className="sidebartext" >
                                Editar datos empresa
                            </p>
                        </li>
                    </Link>
                    <Link className="sidelink" to="/create_pet">
                        <li className="mb-1">
                            <p className="sidebartext" >
                                Agregar una mascota
                            </p>
                        </li>
                    </Link>
                    <Link className="sidelink" to={`/adoption_processes/${company.id}`}>
                        <li className="mb-1">
                            <p className="sidebartext" >
                                Procesos de Adopción
                            </p>
                        </li>
                    </Link>

                    <li className="mb-1">
                        <ModalVolunteer />
                        <p className="sidebartext" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                            Invitar a un Voluntario
                        </p>
                    </li>
                </ul>
            </div>

            <div className="col-lg-10 col-sm-12 px-5">

                <h2 className="dashboardtitle">Listado de Mascotas</h2>
                <div className="row blue-background">
                    {spin ? pets.map((pet, index) => <Petcard key={index} pet={pet} />) :
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                </div>

            </div>
        </div >


    );
};
