import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createCompany = async (company, userId, onSuccess, onError) => {
  try {
    const response = await fetch(`${URL}/api/register/company/user`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ ...company, user_id: userId }),
    });
    const data = await response.json();
    console.log(data);
    onSuccess(); // call the success handler
  } catch (error) {
    console.log("error register company", error);
    onError(error); // call the error handler with the error object
  }
};

export const addNewUserAndCompany = async (
  userData,
  companyData,
  onSuccess,
  onError
) => {
  try {
    const response = await fetch(`${URL}/api/register/company/user`, {
      method: "POST",
      body: JSON.stringify({ user: userData, company: companyData }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json(); // Parse response body as JSON
    console.log(data);
    onSuccess(data); // call the success handler with the response data
  } catch (err) {
    console.log(err);
    onError(err); // call the error handler with the error object
  }
};
