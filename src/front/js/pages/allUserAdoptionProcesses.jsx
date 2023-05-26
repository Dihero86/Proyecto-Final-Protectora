import React, { useEffect, useState,useContext } from "react";
import "../../styles/allUserAdoptionProcesses.css";
import { getAllUserAdoptionProcesses } from "../service/adoption_process.js";
import { getClient } from "../service/user.js";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AllUserAdoptionProcesses = () => {
  const [user, setUser] = useState({});
  const [adoption_processes, setAdoptionProcesses] = useState([]);
  const {store,actions}=useContext(Context)

  const getUserAdoptionProcesses = async () => {
    const userInfo = await getClient();
    setUser(userInfo);
    actions.addCompany(userInfo)
    const userProcesses = await getAllUserAdoptionProcesses(userInfo.id);
    setAdoptionProcesses(userProcesses);
  };

  useEffect(() => {
    getUserAdoptionProcesses();
  }, []);

  return (
    <div className="d-flex row dashcontainer">
      <div className="col-lg-2 flex-shrink-0 p-3 sidebardash">
        <ul className="list-unstyled ps-0">
          <li className="mb-1 list-item">
            <img
              src={
                user.avatar
                  ? user.avatar
                  : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
              }
              className="user-avatar"
            />
            <p className="sidebartitle">
              {user.name} {user.last_name}
            </p>
          </li>
          <hr></hr>
          <Link className="sidelink" to="/register_user">
            <li className="mb-1">
              <p className="sidebartext">Editar usuario</p>
            </li>
          </Link>
        </ul>
      </div>

      <div className="col-lg-10 col-sm-12 px-5">
        <h2 className="dashboardtitle m-4">Mis procesos de adopción</h2>
        <div className="row blue-background">
          {adoption_processes.map((adoption_process, index) => (
            <li key={index} className="adoption-process-item">
              <div className=" adoption-process-card my-2">
                <img
                  src={
                    adoption_process.user.avatar
                      ? adoption_process.user.avatar
                      : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                  }
                  className="user-avatar"
                />
                <img
                  src={
                    adoption_process.pet.pet_Gallery[0]
                      ? adoption_process.pet.pet_Gallery[0].image_url
                      : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                  }
                  className="pet-photo"
                />
                <div className="card-body align-bottom adoption-process-info">
                  <p className="card-title user-name">
                    {adoption_process.user.name}{" "}
                    {adoption_process.user.last_name}
                  </p>
                  <p className="card-text m-0 user-email">
                    {adoption_process.user.email}
                  </p>
                  <p className="card-text m-0 pet-name">
                    {adoption_process.pet.name}
                  </p>
                  <p className="card-text m-0 adoption-process-description">
                    {adoption_process.description}
                  </p>
                  <p className="card-text m-0 adoption-process-status">
                    {adoption_process.status}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
