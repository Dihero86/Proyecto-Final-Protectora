import React, { useEffect, useState } from "react";
import "../../styles/allVolunteers.css";
import { getAllVolunteers } from "../service/user.js";
import { useParams } from "react-router-dom";

export const AllVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const volunteers = await getAllVolunteers(params.company_id);
        setVolunteers(volunteers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVolunteers();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">Voluntarios</h1>
        </div>
        <div className="col-md-12 blue-background">
          <ul className="list">
            {volunteers.map((volunteer) => {
              return (
                <li key={volunteer.id} className="volunteer-item">
                  <div className="volunteer-card my-2 col-10 p-0">
                    <img
                      src={
                        volunteer.user.avatar
                          ? volunteer.user.avatar
                          : "https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                      }
                      className="volunteer-avatar"
                    />
                    <div className="card-body align-bottom volunteer-info">
                      <h5 className="card-title volunteer-full-name">
                        {volunteer.user.name} {volunteer.user.last_name}
                      </h5>
                      <p className="card-text m-0 volunteer-email">
                        email : {volunteer.user.email}
                      </p>
                    </div>
                  </div>
                  ;
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

{
}

// falta el onclick en el div de la volunteer-card para acceder a ese voluntario en particular
