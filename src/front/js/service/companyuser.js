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
    return data;
  } catch (error) {
    console.log("error register company", error);
    throw error;
  }
};

export const addNewUserAndCompany = async (userData, companyData) => {
  try {
    const response = await fetch(`${URL}/api/register/company/user`, {
      method: "POST",
      body: JSON.stringify({ user: userData, company: companyData }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json(); // Parse response body as JSON

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};