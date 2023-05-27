import React, {useContext, useState,useEffect} from "react";
import "../../styles/modalVolunteer.css";
import { Context } from "../store/appContext";
import { volunteerinvitation } from "../service/volunteers";
import { URL } from "../service"; 


export const ModalVolunteer = () => {

    const{store,actions}=useContext(Context);
    const[msg,setMsg]=useState({
        email:"",
        message:""
    });
    const[send,setSend]=useState(false)

    const handleChange=(event)=>{
        setSend(false)
        setMsg({...msg,[event.target.name]:event.target.value})
    }

    const handleClick =async(event)=>{
        event.preventDefault();
        const defaultMessage= `Hola la asociacion ${store.company.name} quires que te unas como voluntario, para ello utiliza el siguiente enlace:\n${URL}/register_volunteer/${store.company.id}. Mensaje de la compañia: ${msg.message}`;
        
        const resp= await volunteerinvitation(msg.email,defaultMessage);

        if (resp===200){
            setSend(true)
        }
    }

    const resetSend=()=>{
        setSend(false)
    }

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
                            <form onChange={handleChange} >
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Email del voluntario</label>
                                    <input type="text" className="form-control" name="email" value={msg.email} id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Mensaje adicional</label>
                                    <textarea className="form-control" name="message" id="message-text" value={msg.message}></textarea>
                                </div>
                            </form>
                            {send? <p className="checksend" style={{color:"red"}}>Mensaje enviado!!!</p>:null}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={resetSend} data-bs-dismiss="modal" >Close</button>
                            <button type="Submit" className="btn btn-primary"  onClick={handleClick} >Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}