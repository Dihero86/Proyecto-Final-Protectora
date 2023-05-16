import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const getHistorial = async () => {
  try {
    const res = await fetch(`${URL}/api/history/<int:pet_id>`, {
      method: "GET",
      headers: HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error get Pet historial", err);
  }
};
