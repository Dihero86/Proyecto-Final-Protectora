import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import dogImage from "../../img/Rectangle 14.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="imagen" >
				<img src={dogImage} className="img-fluid" />
			</div>

		</div>
	);
};
