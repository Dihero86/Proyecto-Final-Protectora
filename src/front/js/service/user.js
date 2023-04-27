import { URL } from ".";
const URL =
  "https://3001-dihero86-proyectofinalp-2twt2cbna02.ws-eu95.gitpod.io";

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
