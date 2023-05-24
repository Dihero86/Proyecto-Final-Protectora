import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { companyDash } from "../service";
import "../../styles/companyDashboard.css";
import { Petcard } from "../component/petcard.jsx";
import { Context } from "../store/appContext";

export const CompanyDashboard = () => {
  const [pets, setPets] = useState([]);
  const [company, setCompany] = useState({});
  const { store, actions } = useContext(Context);

  const getPets = async () => {
    const data = await companyDash();
    setPets(data.pets);
    setCompany(data.company);
    actions.addCompany(data.company);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className="d-flex row dashcontainer">
      <div className="col-lg-2 flex-shrink-0 p-3 sidebardash">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <p className="sidebartitle">{company.name}</p>
          </li>
          <hr></hr>
          <li className="mb-1">
            <p className="sidebartext">Editar datos empresa</p>
          </li>
          <Link className="sidelink" to="/create_pet">
            <li className="mb-1">
              <p className="sidebartext">Agregar una mascota</p>
            </li>
          </Link>
          <li className="mb-1">
            <p className="sidebartext">Procesos de Adopción</p>
          </li>
          <li className="mb-1">
            <p className="sidebartext">Invitar a un Voluntario</p>
          </li>
        </ul>
      </div>

      <div className="col-lg-10 col-sm-12 px-5">
        <h2 className="dashboardtitle">Listado de Mascotas</h2>
        <div className="row blue-background">
          {pets.map((pet, index) => (
            <Petcard key={index} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};
