import { URL } from ".";

const HEADERS = {
    "Content-Type": "application/json",
  };

export const volunteerinvitation = async (email, mensaje) => {
    try {
      const BODY= {email:email,
      msg:mensaje}
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/api/volunteers/invite`, {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify(BODY),
      });
      
      return response.status
 
    } catch (error) {
      console.log("error", error);
    }
  };