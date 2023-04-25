import { URL } from ".";
const HEADERS = {
    "Content-Type": "application/json"
}

export const createPet = async (pet) => {
    try {
        const response = await fetch(`${URL}/api/pet/create`, {
            methods: "POST",
            headers: HEADERS,
            body: JSON.stringify(pet)
        });
        const data = await response.json()

    } catch (error) {
        console.log('error register pet', error)
    }
}