import React, { useEffect, useState } from "react";
import "../../styles/allAdoptionProcesses.css";
import { getAllAdoptionProcesses } from "../service/adoption_process.js";
import { useParams } from "react-router-dom";

export const AllAdoptionProcesses = () => {
  const [adoption_processes, setAdoptionProcesses] = useState([]);
  const [filter, setFilter] = useState([]);
  const [select, setSelect] = useState({
    status: "",
  });
  const params = useParams();

  const getAdoptionProcesses = async (company_id) => {
    const data = await getAllAdoptionProcesses(company_id);
    setAdoptionProcesses(data);
    setFilter(data);
  };

  useEffect(() => {
    getAdoptionProcesses(params.company_id);
  }, []);

  const filterProccess = (adoption_process, selector) => {
    let status = true;
    if (selector.status != "") {
      status = selector.status === adoption_process.status;
    }
    return status;
  };

  const filterAdoptionProcesses = (event) => {
    const newSelection = { ...select, [event.target.name]: event.target.value };
    const result = adoption_processes.filter((adoption_process) =>
      filterProccess(adoption_process, newSelection)
    );
    if (result == []) {
      setSelect({
        status: "",
      });
    }
    setSelect({ ...select, [event.target.name]: event.target.value });
    setFilter([...result]);
  };

  const adoptionProcessStatus = () => {
    const status = adoption_processes.map(
      (adoption_process) => adoption_process.status
    );
    const listStatus = new Set(status);
    console.log("list status", listStatus);
    return [...listStatus];
  };

  const handleDescriptionChange = (adoptionProcessId, newDescription) => {
    updateAdoptionProcessDescription(adoptionProcessId, newDescription)
      .then((response) => {
        // Handle success or update UI if needed
        console.log("Description updated successfully:", response);
      })
      .catch((error) => {
        // Handle error or show error message
        console.log("Error updating description:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">Procesos de adopción</h1>
        </div>
        <div className="col-md-6">
          <button
            className="all-adoption-processes"
            type="button"
            onClick={() => {
              setSelect({
                status: "",
              });
              setFilter([...adoption_processes]);
            }}
          >
            Ver todos
          </button>
        </div>
        <div className="col-md-6">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle status-menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtrar por estado
            </button>
            <ul className="dropdown-menu">
              {adoptionProcessStatus().map((status) => {
                return (
                  <li onClick={filterAdoptionProcesses}>
                    <button
                      className={
                        select.status == status
                          ? "dropdown-item selected"
                          : "dropdown-item"
                      }
                      name="status"
                      value={status}
                    >
                      {status}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-12 adoption-process-background">
          {filter.map((adoption_process, index) => {
            return (
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
                        ? adoption_process.pet.pet_Gallery[0]
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
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Editar
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Edita el proceso de adopción
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <textarea
                            className="form-control"
                            rows="4"
                            value={adoption_process.description}
                            onChange={(e) => {
                              const newDescription = e.target.value;
                              handleDescriptionChange(
                                adoption_process.id,
                                newDescription
                              );
                            }}
                          ></textarea>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button type="button" className="btn btn-primary">
                            Guardar Cambios
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};
