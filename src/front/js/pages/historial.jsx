import React, { useState, useEffect, useContext } from "react";

export const Historial = ({ petId }) => {
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await fetch(`/api/history/${petId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setHistoryData(data); // Store the fetched data
      } catch (err) {
        console.log("Error fetching pet history", err);
      }
    };

    fetchHistorial();
  }, [petId]);

  return (
    <div>
      <h2>Pet History</h2>
      {historyData ? (
        <ul>
          {historyData.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      ) : (
        <p>Loading history...</p>
      )}
    </div>
  );
};
