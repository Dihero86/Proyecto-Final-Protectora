import React, { useEffect, useState, useContext } from "react";
import "../../styles/allUserAdoptionProcesses.css";
import { getAllUserAdoptionProcesses } from "../service/adoption_process.js";
import { getClient } from "../service/user.js";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AllUserAdoptionProcesses = () => {
  const [user, setUser] = useState({});
  const [adoption_processes, setAdoptionProcesses] = useState([]);
  const { store, actions } = useContext(Context)


  const getUserAdoptionProcesses = async () => {
    const userInfo = await getClient();
    setUser(userInfo);
    actions.addCompany(userInfo);
    const userProcesses = await getAllUserAdoptionProcesses(userInfo.id);
    console.log(userProcesses)
    setAdoptionProcesses(userProcesses);
  };

  useEffect(() => {
    getUserAdoptionProcesses();
  }, []);

  return (
    <div className="d-flex row dashcontainer">
      <div className="col-lg-2 flex-shrink-0 p-3 sidebardash">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <p className="sidebartitle">{user.name} {user.last_name}</p>
          </li>
          <li className="mb-1 list-item">
            <img
              src={
                user.avatar
                  ? user.avatar
                  : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
              }
              width={"100px"}
            />
          </li>

          <hr></hr>
          <Link className="sidelink" to={`/edit_user/${user.id}`}>
            <li className="mb-1">
              <p className="sidebartext">Editar usuario</p>
            </li>
          </Link>
        </ul>
      </div>

      <div className="col-lg-10 col-sm-12 px-5">
        <h2 className="titlesesion my-5">Mis procesos de adopción</h2>
        <div className="row b-background">
          {adoption_processes.map((adoption_process, index) => (

            <div className=" adoption-process-cardusuario p-0 my-2">
              <img
                src={
                  adoption_process.pet.pet_Gallery[0]
                    ? adoption_process.pet.pet_Gallery[0].image_url
                    : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                }
                className="pet-photo1"
              />
              <div className="card-body align-bottom ">
                <p className="card-title user-name">
                  {adoption_process.pet.name}
                </p>
                <p className="card-text m-0 adoption-process-description">
                  Protectora: {adoption_process.pet.company.name}
                </p>
                <p className="card-text m-0 adoption-process-sta">
                  Estado: {adoption_process.status}
                </p>
                <p className="card-text m-0 adoption-process-sta">
                  Mensaje: {adoption_process.description}
                </p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};
