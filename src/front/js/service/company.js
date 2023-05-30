import { Navigate } from "react-router-dom";
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

export const companyDash = async () => {
  try {

    const token = localStorage.getItem("token");
    const response = await fetch(`${URL}/api/company/dashboard`, {
      method: ["GET"],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const editCompany = async (company, company_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL}/api/company/${company_id}`, {
      method: ["PUT"],
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: company,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
