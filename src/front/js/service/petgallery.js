import { URL } from ".";

export const getAllPets = async () => {
  try {
    const response = await fetch(`${URL}/api/pet/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);

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
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error getting items: ", error);
  }
};
