import React, { useEffect, useState } from "react";
import "../../styles/allAdoptionProcesses.css";
import { getAllAdoptionProcesses } from "../service/adoption_process.js";
import { useParams } from "react-router-dom";

export const AllAdoptionProcesses = () => {
  const [adoption_processes, setAdoptionProcesses] = useState([]);
  const [filter, setFilter] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchAdoptionProcesses = async () => {
      try {
        const adoption_processes = await getAllAdoptionProcesses(
          params.company_id
        );
        setAdoptionProcesses(adoption_processes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdoptionProcesses();
  }, []);

  const filterStatus = (adoptionProcessStatus) => {
    if (filter.length == 0) {
      const result = adoption_processes.filter(
        (adoption_process) => adoption_process.status == adoptionProcessStatus
      );
      return setFilter(result);
    } else {
      const result = filter.filter(
        (adoption_process) => adoption_process.status == adoptionProcessStatus
      );
      return setFilter(result);
    }
  };

  const adoptionProcessStatus = () => {
    const status = adoption_processes.map(
      (adoption_process) => adoption_process.status
    );
    const listStatus = new Set(status);
    return [...listStatus];
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
              setFilter([]);
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
              {adoptionProcessStatus().map((adoption_process) => {
                return (
                  <li onClick={() => filterStatus(adoption_process.status)}>
                    <p className="dropdown-item">{adoption_process.status}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-12 adoption-process-background">
          <ul className="adoption-process-list">
            {filter.length == 0
              ? adoption_processes.map((adoption_process) => {
                  return (
                    <li
                      key={adoption_process.id}
                      className="adoption-process-item"
                    >
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
                    </li>
                  );
                })
              : filter.map((adoption_process) => {
                  return (
                    <li
                      key={adoption_process.id}
                      className="adoption-process-item"
                    >
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
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};
