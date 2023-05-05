import { URL } from ".";
const HEADERS = {
  "Content-Type": "application/json",
};
export const createCompany = async (company, userId) => {
  try {
    const response = await fetch(
      `https://3001-dihero86-proyectofinalp-9vse1fmfwa3.ws-eu96.gitpod.io/api/company`,
      {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ ...company, user_id: userId }),
      }
    );
    const data = await response.json();

    return data;

    console.log(data);
    setCompany({
      name: "",
      cif: "",
      logo: "",
      adress: "",
      description: "",
      user_id: "",
    });

  } catch (error) {
    console.log("error register company", error);
  }
};


export const getAllCompanies = async () => {
  try {
    const res = await fetch(`${URL}/api/company`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERROR GET ALL COMPANIES", err);

export const addNewUser = async (data) => {
  try {
    const response = await fetch(
      `https://3001-dihero86-proyectofinalp-9vse1fmfwa3.ws-eu96.gitpod.io/api/user/register/client`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json(); // Parse response body as JSON
    console.log(result.id);
    return result.id; // Return ID of new user
  } catch (err) {
    console.log(err);

  }
};