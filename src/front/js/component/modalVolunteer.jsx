import React from "react";
import "../../styles/modalVolunteer.css";

export const ModalVolunteer = () => {
    return (
        <>
            <div className="modal fade modalvolunteer" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Invitar a un voluntario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Un correo se enviara de forma automatica a la direccion de email que nos indique en la siguiente casilla.
                                Dicho correo contendrá un link que permitira acceder al formulario de registro al voluntario seleccionado.
                            </p>
                            <form>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Email del voluntario</label>
                                    <input type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Mensaje adicional</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}