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
    console.log(data);
    localStorage.setItem("token", data.token);
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
