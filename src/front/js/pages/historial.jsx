import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHistorial } from "../service/historial";

export const Historial = () => {
  const [historialData, setHistorialData] = useState(null);
  const { pet_id } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistorial(pet_id);
        if (Array.isArray(data)) {
          setHistorialData(data);
        } else {
          console.log("Invalid history data:", data);
          setHistorialData([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, [pet_id]);

  return (
    <div>
      <h2>Historial de la mascota</h2>
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
            {historialData.map(
              ({ id, title, description, create_at, user_id }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
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
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading history...</p>
      )}
    </div>
  );
};
