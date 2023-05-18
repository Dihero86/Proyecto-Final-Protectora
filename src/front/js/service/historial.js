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
    return await res.json();
  } catch (err) {
    console.log("Error getting pet history", err);
  }
};
