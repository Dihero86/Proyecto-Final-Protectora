import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../component/checkoutForm.jsx";
import { createPayClient } from "../service/payments"

const stripePromise = loadStripe("pk_test_51NEGODIZS5vliIyXLktOXBOehb3sX1ML5utD3iyagfRu3ySUpxNbj9wLBnzFE1Xqkh7eyLypNyI5eC5pKkriRj7i00WZJ9LkYQ");

export const Pago = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { store, actions } = useContext(Context)

    const obtainClient = async () => {
        const client = await createPayClient({ amount: store.amount });
        setClientSecret(client.clientSecret)

    }

    useEffect(() => {
        obtainClient()
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="container-fluid textoapadrina">
            <div className="row">
                <div className="col-lg-6 col-sm-12 p-5">
                    <img src={(store.pet).pet_Gallery[0].image_url} className="imgapadrina" />
                    <p className="my-4"> Vas a apadrinar a {store.pet.name} con un unico pago de €{store.amount}. Completa los datos de tu tarjeta de credito o debito para finalizar.</p>
                </div>
                <div className="col-lg-6 col-sm-12 p-5">
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}