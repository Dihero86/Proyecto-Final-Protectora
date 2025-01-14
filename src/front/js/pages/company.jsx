import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNewUserAndCompany, createCompany } from "../service/companyuser.js";

import "../../styles/company.css";

export const FormCompany = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [check, setCheck] = useState(false);
  const [spin, setSpin] = useState(true);

  const [company, setCompany] = useState({
    name: "",
    cif: "",
    logo: "",
    adress: "",
    city: "",
    phone: "",
    email: "",
    description: "",
    user_id: "",
  });

  const handleInputChange = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(false);
    if (user.password == passwordCheck) {
      const data = await addNewUserAndCompany(user, company);
      navigate("/login_user");
    } else {
      setSpin(true);
      setCheck(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="container">
      <div className="divtitle">
        <h2 className="titlesesion ">Registro Asociaciones</h2>
      </div>
      <form>

        {spin ? (
          <div className="p-4">
            <div className="row g-4">
              <h5 className="text-start tituloh5">Datos de Usuario</h5>
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
                  onChange={handleChange}
                  value={user.name}
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
                  onChange={handleChange}
                  value={user.last_name}
                />
              </div>
              <div className="row">
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
                    onChange={handleChange}
                    value={user.email}
                  />
                </div>
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
                  onChange={handleChange}
                  value={user.password}
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
                  value={passwordCheck}
                  onChange={(e) => {
                    setPasswordCheck(e.target.value);
                  }}
                  required
                />
                {check ? (
                  <p style={{ color: "red" }}>Las contraseñas no coinciden</p>
                ) : null}
              </div>
            </div>
            <div className="row g-4">
              <h5 className="text-start mt-5 tituloh5">
                Datos de la Protectora
              </h5>
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
                  required
                />
              </div>
              <div className="col-6 text-start">
                <label htmlFor="city" className="form-label">
                  Ciudad
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Introduce tu dirección"
                  name="city"
                  onChange={handleInputChange}
                  value={company.city}
                  required
                />
              </div>
              <div className="col-6 text-start">
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  pattern="[0-9]*"
                  className="form-control"
                  id="phone"
                  placeholder="Introduce tu número de teléfono"
                  name="phone"
                  onChange={handleInputChange}
                  value={company.phone}
                  required
                />
              </div>
              <div className="col-6 text-start">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Introduce tu dirección de correo electrónico"
                  name="email"
                  onChange={handleInputChange}
                  value={company.email}
                  required
                />
              </div>
              <div className="col-md-5 text-start">
                <label className="form-label">Descripción</label>
                <select
                  className="form-select"
                  id="description"
                  name="description"
                  onChange={handleInputChange}
                  value={company.description}
                  required
                >
                  <option defaultValue={{}}>Selecciona una opción</option>
                  <option>Protectora</option>
                  <option>Asociación Animalista</option>
                  <option>Refugio</option>
                </select>
              </div>
            </div>
            <button type="submit" className="mt-5" onClick={handleSubmit}>
              Enviar
            </button>
          </div>
        ) : (
          <div
            className="spinner-border"
            style={{ color: "#275F70", width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>

        )}
      </form>
    </div>
  );
};
