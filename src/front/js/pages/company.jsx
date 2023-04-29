import React, { useState, useEffect, useContext } from "react";
import "../../styles/company.css";

export const FormCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    cif: "",
    logo: "",
    description: "",
    adress: "",
    user_id: 2,
  });

  const handleInputChange = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit was called!");
    try {
      const response = await fetch(
        "https://3001-dihero86-proyectofinalp-ue2i18bp853.ws-eu96.gitpod.io/api/company",
        {
          method: "POST",
          body: JSON.stringify(company),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCompany({
        name: "",
        cif: "",
        logo: "",
        adress: "",
        description: "",
        user_id: 2,
      });
    } catch (error) {
      console.log("error register company", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5">
        <h2 className="mb-5">Registros de Protectoras/Asociaciones</h2>
        <div className="row g-4">
          <h5 className="text-start">Datos de Usuario Administrador</h5>
          <div className="col-6 text-start">
            <label htmlFor="nombreAdministrador" className="form-label">
              Nombre Administrador
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              pattern="[A-Za-z\s]+"
              required
              title="Completa el nombre"
              placeholder="Añade el Nombre"
              name="name"
            />
          </div>
          <div className="col-6 text-start">
            <label htmlFor="Apellido" className="form-label">
              Apellidos Administrador
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              pattern="[A-Za-z\s]+"
              required
              title="last_name"
              name="last_name"
              placeholder="Añade el Apellido"
            />
          </div>
          <div className="col-6 text-start">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
            />
          </div>
          <div className="col-6 text-start">
            <label htmlFor="passsowrd" className="form-label">
              Constraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Ingrese su contraseña"
              name="password"
            />
          </div>
          <div className="col-6 text-start mb-5">
            <label htmlFor="password" className="form-label">
              Repetir contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Repita su contraseña"
              name="password"
            />
          </div>
        </div>

        <div className="row g-4">
          <h5 className="text-start mt-5">Datos de la Protectora/Asociación</h5>
          <div className="col-md-6 text-start">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              pattern="[A-Za-z\s]+"
              required
              title="Completa el nombre"
              placeholder="Añade el Nombre"
              name="name"
              value={company.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6 text-start">
            <label htmlFor="cif" className="form-label">
              CIF
            </label>
            <input
              type="text"
              className="form-control"
              id="cif"
              pattern="[A-HJNPQSUVW]{1}[0-9]{7}[0-9A-J]{1}"
              required
              title="Introduce un CIF válido"
              placeholder="Introduce el CIF"
              name="cif"
              onChange={handleInputChange}
              value={company.cif}
            />
          </div>
          <div className="col-6 text-start">
            <label htmlFor="adress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="adress"
              placeholder="Introduce tu dirección"
              name="adress"
              onChange={handleInputChange}
              value={company.adress}
            />
          </div>
          <div className="col-md-4 text-start">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="message-text"
              style={{ resize: "none" }}
              name="description"
              onChange={handleInputChange}
              value={company.description}
            ></textarea>
          </div>
          <div className="col-6 text-start">
            <label htmlFor="logo" className="form-label">
              Insertar Logo
            </label>
            <input
              type="text"
              className="form-control"
              id="logo"
              placeholder="Introduce tu dirección"
              name="logo"
              onChange={handleInputChange}
              value={company.logo}
            />
          </div>
        </div>
        <button type="submit" className="mt-5" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </form>
  );
};
