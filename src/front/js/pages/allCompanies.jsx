import React, { useEffect, useState } from "react";
import "../../styles/allCompanies.css";
import { getAllCompanies } from "../service";

export const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getAllCompanies();
        setCompanies(companies);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompanies();
  }, []);

  const filterCities = (cityName) => {
    const result = companies.filter((company) => company.city == cityName);
    return setFilter(result);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">Protectoras/ Asociaciones/ Compañías</h1>
        </div>
        <div className="col-md-6">
          <button
            className="all-cities"
            type="button"
            onClick={() => {
              setFilter([]);
            }}
          >
            Ver todas
          </button>
        </div>
        <div className="col-md-6">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle city-menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtrar por ciudad
            </button>
            <ul className="dropdown-menu">
              {companies.map((company) => {
                return (
                  <li onClick={() => filterCities(company.city)}>
                    <p className="dropdown-item">{company.city}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-12 blue-background">
          <ul className="list">
            {filter.length == 0
              ? companies.map((company) => {
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
                })
              : filter.map((company) => {
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