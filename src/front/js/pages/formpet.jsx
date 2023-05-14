import React, { useState, useEffect, useContext } from "react";
import { createPet } from "../service";
import "../../styles/formpet.css";

export const FormPet = () => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [max, setMax] = useState(false);

  const [pet, setPet] = useState({
    type: "perro",
    name: "",
    birth_date: "",
    breed: "",
    size: "",
    company_id: 2,
    description: "",
    status: "",
  });

  const handleChange = async ({ target }) => {
    if (target.name == "fotos" && target.files) {
      if (target.files.length > 5) {
        setMax(true);
      } else {
        setMax(false);
        setFile(target.files);
        const keyFiles = Object.keys(target.files);
        Promise.all(
          keyFiles.map((key) => readAsDataURL(target.files[key]))
        ).then((urls) => setFileUrl(urls));
      }
    }
    if (target.name != "fotos") {
      setPet({ ...pet, [target.name]: target.value });
    }
  };

  const readAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = function () {
        resolve(fr.result);
      };
      fr.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fotos = [...file];
    const form = new FormData();
    fotos.map((foto, index) => form.append(`foto${index}`, foto));
    form.append("pet", JSON.stringify(pet));
    await createPet(form);
  };

  return (
    <div className="container mt-3">
      <h2>Agregar Mascota</h2>

      <form className="row g-3" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombreanimal"
            name="name"
            required
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            type="text"
            className="form-control"
            id="edadanimal"
            name="birth_date"
            required
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Raza</label>
          <input
            type="text"
            className="form-control"
            id="razanimal"
            aria-describedby="inputGroupPrepend"
            name="breed"
            required
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Tamaño</label>
          <select className="form-select" id="Tamaño" name="size" required>
            <option defaultValue={{}}>Seleccione Tamaño...</option>
            <option>Grande</option>
            <option>Mediano</option>
            <option>Pequeño</option>
          </select>
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Estado</label>
          <select className="form-select" id="estado" name="status" required>
            <option defaultValue={{}}>Seleccione Estado...</option>
            <option>disponible</option>
            <option>fallecido</option>
            <option>adoptado</option>
          </select>
        </div>

        <div className="col-12 d-flex flex-column justify-content-center">
          <label className="form-label">Fotografias</label>
          <div className="botoninput d-flex justify-content-center">
            <label htmlFor="file-upload" id="subir" className="form-label">
              <i className="fas fa-cloud-upload-alt"></i>Subir fotos (max. 5)
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
          <div className="fotos">
            {max ? (
              <div className="alert alert-danger" role="alert">
                Maximo cinco Imagenes!!!
              </div>
            ) : (
              fileUrl.map((ima, index) => (
                <img key={index} src={ima} style={{ width: "200px" }} />
              ))
            )}
          </div>
        </div>

        <div className="col-12 ">
          <label className="form-label">DESCRIPCION</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
          ></textarea>
        </div>

        <div className="col-12">
          <button className="btn text-white" type="submit" disabled={max}>
            CREAR
          </button>
        </div>
      </form>
    </div>
  );
};
