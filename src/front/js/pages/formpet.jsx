import React, { useState, useEffect, useContext } from "react";
import { createPet } from "../service";

export const FormPet = () => {

	const [pet, setPet] = useState({
		name: "",
		age: "",
		company_id: "",
		breed: "",
		size: "",
		photo: "",
		description: "",
		status_id: ""
	})

	return (
		<div className="container mt-3">
			<h1></h1>
			<h1>Agregar Mascota</h1>
			<form className="row g-3">
				<div className="col-6">
					<label className="form-label">NOMBRE</label>
					<input type="text" className="form-control" id="nombreanimal" required />
				</div>
				<div className="col-6">
					<label className="form-label">EDAD</label>
					<input type="text" className="form-control" id="edadanimal" required />
				</div>
				<div className="col-6">
					<label className="form-label">RAZA</label>
					<input type="text" className="form-control" id="razanimal" aria-describedby="inputGroupPrepend" required />
				</div>
				<div className="col-6">
					<label className="form-label">TAMAÑO</label>
					<select className="form-select" id="Tamaño" required>
						<option defaultValue={{}} >Seleccione Estado...</option>
						<option>Grande</option>
						<option>Mediano</option>
						<option>Pequeño</option>
					</select>
				</div>
				<div className="col-6">
					<label className="form-label">ESTADO</label>
					<select className="form-select" id="estado" required>
						<option defaultValue={{}} >Seleccione Estado...</option>
						<option>Estado1</option>
						<option>Estado2</option>
						<option>Estado3</option>
					</select>
				</div>
				<div className="col-6 d-flex flex-column">
					<label className="form-label">FOTOGRAFIAS</label>
					<div>
						<button className="btn mx-1 text-white" style={{ backgroundColor: "#42A0BD" }} >ADJUNTAR FOTO1</button>
						<button className="btn mx-1 text-white" style={{ backgroundColor: "#42A0BD" }} >ADJUNTAR FOTO2</button>
						<button className="btn mx-1 text-white" style={{ backgroundColor: "#42A0BD" }} >ADJUNTAR FOTO3</button>
					</div>
				</div>
				<div className="col-12 " >
					<label className="form-label">DESCRIPCION</label>
					<textarea className="form-control" id="description" style={{ height: "auto" }}></textarea>
				</div>
				<div className="col-12">
					<button className="btn text-white" style={{ backgroundColor: "#42A0BD" }} type="submit">CREAR</button>
				</div>
			</form>
		</div>
	);
};
