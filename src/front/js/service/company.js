import { URL } from ".";
const HEADERS = {
  "Content-Type": "application/json",
};

export const createCompany = async (company, userId) => {
  try {
    const response = await fetch(`${URL}/api/company`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ ...company, user_id: userId }),
    });
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
  }
};


export const getOneCompany = async (company_id) => {
  try {
    const response = await fetch(`${URL}/api/company/${company_id}`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error getOneCompany: ", error);
  }
};

export const addNewUsers = async (data) => {
  try {
    const response = await fetch(`${URL}/api/user/register/client`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result.id);
    return result.id;
  } catch (err) {
    console.log(err);
  }
};
