import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHistorial } from "../service/historial";

export const Historial = () => {
  const [historyData, setHistoryData] = useState(null);
  const { pet_id } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistorial(pet_id);
        if (Array.isArray(data)) {
          setHistoryData(data);
        } else {
          console.log("Invalid history data:", data);
          setHistoryData([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, [pet_id]);

  return (
    <div>
      <h2>Pet History</h2>
      {historyData ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Create At</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map(
              ({ id, title, description, create_at, user_id }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{title}</td>
                  <td>{description}</td>
                  <td>{create_at}</td>
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
