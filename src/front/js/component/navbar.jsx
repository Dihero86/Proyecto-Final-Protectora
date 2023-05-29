import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    actions.deleteCompany();
    actions.setUserRol("")
    navigate("/");
  }

  return (
    <nav
      className="z-3 navbar navbar-dark navbar-expand-lg "
      style={{ backgroundColor: "#275F70", height: "8vh" }}
    >
      <div className="container-fluid">
        <Link className="link" to="/">
          <h1 className="text-white"><strong>Petsbook</strong> </h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon white"></span>
        </button>
        <div
          className="Z-3 collapse navbar-collapse justify-content-end text-white"
          id="navbarNavAltMarkup"
          style={{backgroundColor:"#275f70"}}
        >
          <div className="navbar-nav">
            <Link className="link" to="/companies">
              <p className="nav-link my-0">
                Protectoras
              </p>
            </Link>
            <Link className="link" to="/pet_gallery">
              <p className="nav-link my-0">
                Animales en adopción
              </p>
            </Link>
            <a className="nav-link" href="#">
              Colabora
            </a>
            {store.userRol=="" ?
              <Link className="link" to="/login_user">
                <button className="btn">
                  Acceder
                </button>
              </Link> :
              <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle my-0" data-bs-toggle="dropdown" aria-expanded="false">
                  {store.company.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    {store.userRol=="client"?               
                    <Link className="link" to="/my_profile">
                      <button className="dropdown-item" type="button">Mi espacio</button>
                    </Link>:
                    <Link className="link" to="/company_dashboard">
                      <button className="dropdown-item" type="button">Compañía</button>
                    </Link>
                    } 

                  </li>
                  <li><button onClick={handleClick} className="dropdown-item" type="button">Cerrar Sesion</button></li>
                </ul>
              </div>
            }

          </div>
        </div>
      </div>
    </nav >
  );
};
