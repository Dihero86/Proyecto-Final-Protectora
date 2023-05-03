import React, { useEffect, useState } from "react";
import "../../styles/allCompanies.css";
import { getAllCompanies } from "../service";

export const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getAllCompanies();
        setCompanies(companies);
        companies.map((company) => {
          let city = company.city;
          return setCities(cities.push(city));
        });
        console.log(cities);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">Protectoras/ Asociaciones/ Compañías</h1>
        </div>
        <div className="col-md-12">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle city-menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ciudad
            </button>
            <ul className="dropdown-menu">
              {companies.map((company) => {
                return (
                  <li>
                    <a className="dropdown-item">{company.city}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-12 blue-background">
          <ul className="list">
            {companies.map((company) => {
              return (
                <li key={company.id} className="company-card">
                  {company.logo ? (
                    company.logo
                  ) : (
                    <img
                      src="https://res.cloudinary.com/djzijohkt/image/upload/v1683051273/icono_aq4qpy.webp"
                      className="card-img-top company-logo"
                      alt="..."
                    />
                  )}
                  <div className="company-info">
                    <p className="company-name">{company.name}</p>
                    <p className="company-address">
                      <i class="fa-solid fa-location-dot"></i>
                      {` ${company.adress}`} <br />
                      {company.city}
                    </p>
                    <p className="company-phone">
                      <i class="fa-solid fa-phone"></i>
                      {` ${company.phone} `}
                    </p>
                    <p className="company-email">
                      <i class="fa-solid fa-envelope"></i>
                      {` ${company.email} `}
                    </p>
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
