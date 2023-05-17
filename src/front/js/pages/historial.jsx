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
        <ul>
          {historyData.map(({ id, description }) => (
            <li key={id}>{description}</li>
          ))}
        </ul>
      ) : (
        <p>Loading history...</p>
      )}
    </div>
  );
};
