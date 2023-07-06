import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHistorial, createHistorialEntry } from "../service/historial";
import "../../styles/historial.css";

export const Historial = () => {
  const [historialData, setHistorialData] = useState(null);
  const [newEntry, setNewEntry] = useState({
    title: "",
    description: "",
  });
  const { pet_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistorial(pet_id);
        setHistorialData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, [pet_id]);

  const handleInputChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdEntry = await createHistorialEntry(pet_id, newEntry);
      setHistorialData([...historialData, createdEntry]);
      setNewEntry({
        title: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="titlesesion my-5">Historial de la mascota</h2>
      <form onSubmit={handleSubmit} className="historial">
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Título"
          value={newEntry.title}
          onChange={handleInputChange}
        />
        <textarea
          className="form-control"
          name="description"
          placeholder="Descripción"
          value={newEntry.description}
          onChange={handleInputChange}
          style={{ resize: "none" }}
          rows={4}
          cols={50}
          maxLength={200}
          required
        ></textarea>
        <button className="m-3 text-center" type="submit">
          Agregar al historial
        </button>
      </form>
      <div className="detalles">
        {historialData ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Fecha de creación</th>
              </tr>
            </thead>
            <tbody>
              {historialData.map(({ id, title, description, create_at }) => (
                <tr key={id}>
                  <th scope="row"></th>
                  <td>{title}</td>
                  <td>{description}</td>
                  <td>
                    {new Date(create_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading history...</p>
        )}
      </div>
      <button className="btn text-white my-2 mx-1" onClick={() => navigate("/company_dashboard")}>Volver</button>
    </div>
  );
};
