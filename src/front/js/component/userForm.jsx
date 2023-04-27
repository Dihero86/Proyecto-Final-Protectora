import React, { useState } from "react";
import catImage from "../../img/cat.png";

export const UserForm = ({ handleSubmit, handleChange }) => {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h1 className="title">Regístrate y empieza a adoptar</h1>
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
              <label htmlFor="exampleInputEmail1" className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
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
              <button
                className="btn"
                type="submit"
                style={{ backgroundColor: "#42A0BD" }}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <div className="imagen">
            <img src={catImage} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
