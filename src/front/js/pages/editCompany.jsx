import React, { useState, useEffect, useContext } from "react";
import { editCompany, getOneCompany } from "../service/company.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditCompany = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [company, setCompany] = useState({
    name: store.company.name,
    cif: store.company.cif,
    adress: store.company.adress,
    logo: store.company.logo,
    city: store.company.city,
    phone: store.company.phone,
    email: store.company.email,
    description: store.company.description,
  });

  const handleInputChange = ({ target }) => {
    if (target.name == "logo" && target.files) {
      setFile(target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
    if (target.name != "logo") {
      setCompany({ ...company, [target.name]: target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("img", file);
    form.append("company", JSON.stringify(company));
    await editCompany(form, store.company.id);
    navigate("/company_dashboard");
  };

  return (
    <div className="container">
      <h2 className="titlesesion my-5">Editar datos de la compañía</h2>
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
          />
        </div>
        <div className="col-md-5 text-start">
          <label className="form-label">Descripción</label>
          <select
            className="form-select"
            id="description"
            name="description"
            value={company.description}
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
              name="logo"
              placeholder="hola"
              style={{ display: "none" }}
              multiple
            />
          </div>
          <div className="fotos">
            <img
              src={file ? fileUrl : company.logo}
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <div>
          <Link className="link" to="/company_dashboard">
            <button className="btn text-white mx-1">Volver</button>
          </Link>
          <button type="submit" className="btn text-white mx-1" >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
