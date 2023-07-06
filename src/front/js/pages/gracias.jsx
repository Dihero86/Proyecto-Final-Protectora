import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Gracias = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000)

    }, [])

    return (
        <>
            <h2 className="titlesesion my-5">Muchas Gracias por colaborar</h2>
            <p>Redirigiendo a la pagina principal...</p>
            <div class="d-flex justify-content-center">

                <div
                    className="spinner-border"
                    style={{ color: "#275F70", width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}