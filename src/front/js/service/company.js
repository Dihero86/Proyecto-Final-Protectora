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
  } catch (error) {
    console.log("error register company", error);
  }
};
