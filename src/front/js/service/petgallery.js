import { URL } from ".";

export const getAllPets = async () => {
  try {
    const response = await fetch(`${URL}/api/pet/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting items: ", error);
  }
};

export const getOnePet = async (pet_id) => {
  try {
    const response = await fetch(`${URL}/api/pet/${pet_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error getting items: ", error);
  }
};

export const startAdoptionProcess = async (body, pet_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${URL}/api/adoption_process/create/${pet_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting items: ", error);
  }
};
