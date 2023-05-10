import { URL } from ".";
const HEADERS = { "Content-Type": "application/json" };

export const createPet = async (pet) => {
  try {
    const response = await fetch(`${URL}/api/pet/create/`, {
      method: "POST",
      //headers: HEADERS,
      body: pet,
    });
  } catch (error) {
    console.log("error", error);
  }
};
