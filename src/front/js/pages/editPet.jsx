import React, { useState, useEffect } from "react";
import { getOnePet, editPet } from "../service/petgallery.js";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/editPet.css";

export const EditPet = () => {

  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [max, setMax] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
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

  const getPet = async (id) => {
    const petdata = await getOnePet(id)
    setPet(petdata)
  }

  useEffect(() => {
    getPet(params.pet_id);
  }, []);

  const handleInputChange = ({ target }) => {
    if (target.name == "fotos" && target.files) {
      if (target.files.length > (5 - pet.pet_Gallery.length)) {
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
    await editPet(form, params.pet_id)
    navigate("/company_dashboard")
  }

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
              <i className="fas fa-cloud-upload-alt"></i>Subir fotos (Max: {5 - pet.pet_Gallery.length} nuevas)
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
          <div className="row my-4">
            <div className="col-lg-6 col-sm-12">
              <p>Imagenes subidas</p>
              {pet.pet_Gallery.map((ima, index) => (
                <img key={index} src={ima.image_url} className="fotos" />
              ))}
            </div>
            <div className="col-lg-6 col-sm-12">
              <p>Imagenes nuevas</p>
              {max ? (
                <div className="alert alert-danger" role="alert">
                  Maximo cinco Imagenes en total!!!
                </div>
              ) : (
                fileUrl.map((ima, index) => (
                  <img key={index} src={ima} className="fotos" />
                ))
              )}
            </div>
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
          <button className="btn text-white mx-1" onClick={() => navigate(`/one_pet/${pet.id}`)}>Volver</button>

          <button className="btn text-white mx-1" type="submit" disabled={max}>
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
