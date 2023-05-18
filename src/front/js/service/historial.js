import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const getHistorial = async (petId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/api/history/${petId}`, {
      method: "GET",
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } else {
      console.log("Error getting pet history:", res.status);
      return null;
    }
  } catch (err) {
    console.log("Error getting pet history:", err);
    return null;
  }
};

export const createHistorialEntry = async (petId, entryData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/api/history/${petId}`, {
      method: "POST",
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(entryData),
    });
    if (res.ok) {
      return await res.json();
    } else {
      console.log("Error creating historial entry:", res.status);
      return null;
    }
  } catch (err) {
    console.log("Error creating historial entry:", err);
    return null;
  }
};
