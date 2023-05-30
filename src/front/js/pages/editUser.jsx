import React, { useState } from "react";
import "../../styles/registerUser.css";
import catImage from "../../img/cat.png";
import { useNavigate } from "react-router-dom";
import { editUser } from "../service/user.js";

export const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password === passwordCheck) {
      try {
        const response = await editUser(user);

        if (response.ok) {
          navigate("/login_user");
        } else {
          console.log("Error updating user details:", response.statusText);
        }
      } catch (error) {
        console.log("Error updating user details:", error);
      }
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="container-fluid">
      <h1>Modifica los datos</h1>
      <div className="row">
        <div className="col-8 p-5">
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
            <div className="mb-3">
              <label htmlFor="inputPassword1" className="form-label">
                CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword1"
                name="password"
                onChange={handleChange}
                value={user.password}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword2" className="form-label">
                REPETIR CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword2"
                name="passwordCheck"
                value={passwordCheck}
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                }}
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
