import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createCompany = async (company, userId) => {
  try {
    const response = await fetch(`${URL}/api/register/company/user`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ ...company, user_id: userId }),
    });
    const data = await response.json();
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

export const addNewUser = async (data) => {
  try {
    const response = await fetch(`${URL}/api/register/company/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json(); // Parse response body as JSON
    return result.id; // Return ID of new user
  } catch (err) {
    console.log(err);
  }
};
