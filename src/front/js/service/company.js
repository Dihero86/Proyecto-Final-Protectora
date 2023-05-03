import { URL } from ".";
const HEADERS = {
  "Content-Type": "application/json",
};

export const createCompany = async (company) => {
  try {
    const response = await fetch(`${URL}/api/company`, {
      methods: "POST",
      headers: HEADERS,
      body: JSON.stringify(company),
    });
    const data = await response.json();
    return data;
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
