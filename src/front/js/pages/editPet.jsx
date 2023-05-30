import React, { useState, useEffect } from "react";
import { getOnePet, editPet } from "../service/petgallery.js";
import { useParams, useNavigate } from "react-router-dom";

export const EditPet = () => {
  const params = useParams();
  const [pet, setPet] = useState({
    type: "",
    name: "",
    birth_date: "",
    breed: "",
    size: "",
    description: "",
    status: "",
    pet_Gallery: [],
  });

  console.log("es el pet", pet);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const pet = await getOnePet(params.pet_id);
        setPet(pet);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPet();
  }, []);

  const handleInputChange = (event) => {
    setPet({
      ...pet,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await editPet(pet, pet.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Editar Mascota</h2>

      <form
        className="row g-3"
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      >
        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombreanimal"
            name="name"
            value={pet.name}
            required
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="edadanimal"
            name="birth_date"
            value={pet.birth_date}
            required
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Tipo Mascota</label>
          <select
            className="form-select"
            id="Tamaño"
            name="type"
            value={pet.type}
            required
          >
            <option defaultValue={{}}>Seleccione tipo de mascota...</option>
            <option>perro</option>
            <option>gato</option>
            <option>otro</option>
          </select>
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Tamaño</label>
          <select
            className="form-select"
            id="Tamaño"
            name="size"
            value={pet.size}
            required
          >
            <option defaultValue={{}}>Seleccione Tamaño...</option>
            <option>Grande</option>
            <option>Mediano</option>
            <option>Pequeño</option>
          </select>
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Raza</label>
          <input
            type="text"
            className="form-control"
            id="razanimal"
            aria-describedby="inputGroupPrepend"
            name="breed"
            value={pet.breed}
            required
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            id="estado"
            name="status"
            value={pet.status.type}
            required
          >
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
            {pet.pet_Gallery.map((ima, index) => (
              <img key={index} src={ima.image_url} style={{ width: "200px" }} />
            ))}
          </div>
        </div>

        <div className="col-12 ">
          <label className="form-label">DESCRIPCION</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={pet.description}
          ></textarea>
        </div>

        <div className="col-12">
          <button className="btn text-white mx-1">Volver</button>

          <button className="btn text-white mx-1" type="submit">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
