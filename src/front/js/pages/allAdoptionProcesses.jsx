import React, { useEffect, useState } from "react";
import "../../styles/allAdoptionProcesses.css";
import {
  getAllAdoptionProcesses,
  updateAdoptionProcessDescription,
} from "../service/adoption_process.js";
import { useParams } from "react-router-dom";

export const AllAdoptionProcesses = () => {
  const [adoption_processes, setAdoptionProcesses] = useState([]);
  const [filter, setFilter] = useState([]);
  const [select, setSelect] = useState({
    status: "",
  });

  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
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
    const updatedProcess = {
      description: newDescription,
      status: editedStatus || "pending",
    };

    setEditedDescription(newDescription);
    setEditedStatus("");

    updateAdoptionProcessDescription(adoptionProcessId, updatedProcess)
      .then((response) => {
        console.log("Description updated successfully:", response);

        const updatedProcesses = adoption_processes.map((process) => {
          if (process.id === adoptionProcessId) {
            return {
              ...process,
              description: newDescription,
              status: updatedProcess.status,
            };
          }
          return process;
        });
        setAdoptionProcesses(updatedProcesses);
        setFilter(updatedProcesses);
      })
      .catch((error) => {
        console.log("Error updating description:", error);
      });
  };

  const handleStatusChange = (event) => {
    const selectedStatus =
      event.target.value === "" ? "pending" : event.target.value;
    setEditedStatus(selectedStatus);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="titlesesion my-5">Procesos de adopción</h2>
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
        <div className="col-md-12 b-background">
          <div className="row">
            {filter.map((adoption_process, index) => {
              return (
                <div key={index} className="adoption-process-item">
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
                        email: {adoption_process.user.email}
                      </p>
                      <p className="card-text m-0 pet-name">
                        Mascota: {adoption_process.pet.name}
                      </p>
                      <p className="card-text m-0 adoption-process-description">
                        Descripción: {adoption_process.description}
                      </p>
                      <p className="card-text m-0 adoption-process-status">
                        Estado: {adoption_process.status}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal-${adoption_process.id}`}
                    >
                      Editar
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal-${adoption_process.id}`}
                      tabIndex="-1"
                      aria-labelledby={`exampleModalLabel-${adoption_process.id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h2
                              className="modal-title fs-5"
                              id={`exampleModalLabel-${adoption_process.id}`}
                            >
                              Edita el proceso de adopción
                            </h2>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div>
                              <textarea
                                className="form-control"
                                rows="4"
                                style={{ resize: "none" }}
                                value={editedDescription}
                                onChange={(e) =>
                                  setEditedDescription(e.target.value)
                                }
                              ></textarea>
                            </div>
                            {editedDescription === "" && (
                              <p className="text">
                                Por favor, añade una nueva descripción.
                              </p>
                            )}
                            <div className="col-lg-4 col-sm-12">
                              <label className="form-label">Estado</label>
                              <select
                                className="form-select"
                                name="status"
                                value={editedStatus}
                                onChange={handleStatusChange}
                              >
                                <option value="">Seleccione Estado...</option>
                                <option value="pending">pending</option>
                                <option value="accepted">accepted</option>
                                <option value="refused">refused</option>
                              </select>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cerrar
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                handleDescriptionChange(
                                  adoption_process.id,
                                  editedDescription
                                );
                                setEditedDescription("");
                              }}
                              data-bs-dismiss="modal"
                            >
                              Guardar Cambios
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
