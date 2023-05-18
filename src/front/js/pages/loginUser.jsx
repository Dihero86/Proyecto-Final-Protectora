import React, { useState } from "react";
import { loginUser } from "../service/user";
import dog2Image from "../../img/dog2.png";
import "../../styles/loginUser.css";
import { useNavigate } from "react-router-dom";

export const LoginUser = () => {

  const navigate = useNavigate();

  const [userAccess, setUserAccess] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setUserAccess({ ...userAccess, [target.name]: target.value });
  };

  const handleSubmbit = async (e) => {
    e.preventDefault();
    const data = await loginUser(userAccess);
    if (data == "admin" || data == "volunteer") {
      navigate("/")
    }
    else {
      navigate("/pet_gallery")
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex col-md-4 p-0 justify-content-start">
          <img src={dog2Image} className="imgleft" />
        </div>
        <div className="col-md-8">
          <h1 className="title">Acceso Usuario</h1>

          <form className="d-flex flex-column m-auto" onChange={handleChange} onSubmit={handleSubmbit}>

            <label htmlFor="inputEmail" className="form-label">
              EMAIL
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail"
              value={userAccess.email}
              required
            ></input>

            <label htmlFor="inputPassword" className="form-label">
              CONTRASEÑA
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="inputPassword"
              value={userAccess.password}
              required
            ></input>

            <button type="submit" value="Enviar" className="btn">Enviar</button>

          </form>
        </div>
      </div>
    </div>
  );
};
