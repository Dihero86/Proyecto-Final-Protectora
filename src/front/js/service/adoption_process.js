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
  newDescription
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${URL}/api/adoption_process/${adoptionProcessId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERROR UPDATING ADOPTION PROCESS DESCRIPTION", err);
  }
};
