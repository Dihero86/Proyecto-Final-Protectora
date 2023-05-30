import { URL } from ".";

export const getAllAdoptionProcesses = async (company_id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${URL}/api/adoption_process/company/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("ERROR GET ALL ADOPTION PROCESS OF A COMPANY", err);
  }
};

export const updateAdoptionProcessDescription = async (
  adoptionProcessId,
  updatedProcess
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${URL}/api/adoption_process/update/${adoptionProcessId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProcess),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERROR UPDATING ADOPTION PROCESS DESCRIPTION", err);
  }
};

export const getAllUserAdoptionProcesses = async (user_id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${URL}/api/adoption_process/company/user/${user_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("ERROR GET ALL USER ADOPTION PROCESSES", err);
  }
};
