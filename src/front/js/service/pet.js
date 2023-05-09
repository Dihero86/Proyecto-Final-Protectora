import { URL } from ".";


export const createPet = async (pet) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${URL}/api/pet/create/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: pet
        })
    }
    catch (error) {
        console.log("error", error)
    }
}