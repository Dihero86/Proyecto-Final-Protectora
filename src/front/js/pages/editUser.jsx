import React, { useState, useContext } from "react";
import "../../styles/registerUser.css";
import catImage from "../../img/cat3.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../service/user.js";

import { Context } from "../store/appContext";

export const EditUser = () => {
  const { store, actions } = useContext(Context);
  const { user_id } = useParams();
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editUser(user_id, user);

      if (response.ok) {
        localStorage.removeItem("token");
        actions.deleteCompany();
        actions.setUserRol("");
        navigate("/");
      } else {
        console.log("Error updating user details:", response.statusText);
      }
    } catch (error) {
      console.log("Error updating user details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="container-fluid">

      <div className="row">
        <div className="col-8 p-5">
          <h2 className="titlesesion">Modifica los datos</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                NOMBRE
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                onChange={handleChange}
                value={user.name}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputLastName" className="form-label">
                APELLIDOS
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                name="last_name"
                onChange={handleChange}
                value={user.last_name}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                onChange={handleChange}
                value={user.email}
                required
              ></input>
            </div>

            <div>
              <button className="btn m-5" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className="col-4 mx-0">
          <div className="imagen">
            <img src={catImage} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
