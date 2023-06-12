import { URL } from ".";


const HEADERS = {
    "Content-Type": "application/json",
};

export const createPayClient = async (amount) => {
    try {
        const response = await fetch(`${URL}/api/pay/create-payment-intent`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(amount),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error pago", error);
    }
};
