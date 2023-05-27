import React, { useState, useEffect } from "react";
import { editCompany, getOneCompany } from "../service/company.js";
import { useParams, useNavigate } from "react-router-dom";

export const EditCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    cif: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
  });

  const params = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const company = await getOneCompany(params.company_id);
        setCompany(company);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompany();
  }, []);

  const handleInputChange = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await editCompany(company, company.id);
      console.log(data);
      navigate("/company_dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("es la company", company);
  return (
    <div className="container-fluid p-4 ">
      <h2 className="p-4">Editar datos de la compañía</h2>
      <form
        className="row"
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      >
        <div className="col-md-5 text-start">
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
        <div className="col-5 text-start">
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
            value={company.cif}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-5 text-start">
          <label htmlFor="adress" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="adress"
            placeholder="Introduce tu dirección"
            name="adress"
            value={company.adress}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-5 text-start">
          <label htmlFor="city" className="form-label">
            Ciudad
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Introduce tu dirección"
            name="city"
            value={company.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-5 text-start">
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
            value={company.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-5 text-start">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Introduce tu dirección de correo electrónico"
            name="email"
            value={company.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-5 text-start">
          <label className="form-label">Descripción</label>
          <select
            className="form-select"
            id="description"
            name="description"
            required
          >
            <option defaultValue={{}}>Selecciona una opción</option>
            <option>Protectora</option>
            <option>Asociación Animalista</option>
            <option>Refugio</option>
          </select>
        </div>
        <div className="col-md-5 text-start my-3 d-flex flex-column justify-content-center">
          <label className="form-label">Logo</label>
          <div className="botoninput d-flex justify-content-center">
            <label htmlFor="file-upload" id="subir" className="form-label">
              <i className="fas fa-cloud-upload-alt"></i> Subir logo
            </label>
            <input
              id="file-upload"
              type="file"
              className="form-control"
              name="fotos"
              placeholder="hola"
              style={{ display: "none" }}
              multiple
            />
          </div>
          <div className="fotos"></div>
        </div>
        <div>
          <button type="submit" className="col-md-2 mt-5">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
