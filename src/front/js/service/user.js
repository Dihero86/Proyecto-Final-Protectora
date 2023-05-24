import { URL } from ".";

export const addNewUser = async (data) => {
  try {
    await fetch(`${URL}/api/user/register/client`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("err");
  }
};

export const loginUser = async (user) => {
  try {
    const res = await fetch(`${URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    console.log("ERROR LOGIN USER", err);
  }
};

export const addNewVolunteer = async (company_id, user) => {
  try {
    const res = await fetch(
      `${URL}/api/user/register/volunteer/${company_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("ERROR REGISTER VOLUNTEER", err);
  }
};

export const getAllVolunteers = async (company_id) => {
  try {
    const res = await fetch(`${URL}/api/volunteers/company/${company_id}`, {
      method: "GET",
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("ERROR GET ALL VOLUNTEERS OF A COMPANY", err);
  }
};

export const getClient = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/api/user/client`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("ERROR GET USER", err);
  }
};
