import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark navbar-expand-lg " style={{ backgroundColor: "#275F70" }} >
			<div className="container-fluid" >
				<Link to='/'>
					<h1 className="text-white"> Petsbook</h1>
				</Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon white" ></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end text-white" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<a className="nav-link" aria-current="page" href="#">Protectoras</a>
						<a className="nav-link" href="#">Animales en adopción</a>
						<a className="nav-link" href="#">Colabora</a>
						<button className="btn" type="submit" style={{ backgroundColor: "#42A0BD" }}>Acceder</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
