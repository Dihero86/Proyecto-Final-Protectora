import React, { useState, useEffect, useContext } from "react";
import "../../styles/company.css";

export const CreateCompany = () => {
  return (
    <div className="p-5">
      <h2 className="mb-5">Registros de Protectoras/Asociaciones</h2>
      <div className="row g-4">
        <h5 className="text-start">Datos de Usuario Administrador</h5>
        <div className="col-md-6 text-start">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Nombre Administrador
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-6 text-start">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Apellidos Administrador
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-12 text-start">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-md-6 text-start">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Constraseña
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-6 text-start mb-5">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Repetir contraseña
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="row g-4">
        <h5 className="text-start mt-5">Datos de la Protectora/Asociación</h5>
        <div className="col-md-6 text-start">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Nombre
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-6 text-start">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            CIF
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-6 text-start">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Dirección
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-6 text-start">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Ciudad
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-md-4 text-start">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Código Postal
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-4 text-start">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Provincia
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-4">
          <label htmlFor="formFile" className="form-label">
            Adjuntar logo
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>
      </div>
      <button type="button" className="mt-5">
        Enviar
      </button>
    </div>
  );
};

// usar xs y md para tamaño
