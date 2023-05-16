import React, { useState } from "react";
import { loginUser } from "../service/user";
import dog2Image from "../../img/dog2.png";
import "../../styles/loginUser.css";

export const LoginUser = () => {
  const [userAccess, setUserAccess] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setUserAccess({ ...userAccess, [target.name]: target.value });
  };

  const handleSubmbit = async (e) => {
    e.preventDefault();
    console.log(userAccess);
    await loginUser(userAccess);
    //falta useNavigate al perfil del usuario
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="imagen">
            <img src={dog2Image} className="img-fluid" />
          </div>
        </div>
        <div className="col-md-8 text-center">
          <h1 className="title">Acceso Usuario</h1>
          <form onChange={handleChange} onSubmit={handleSubmbit}>
            <div className="mb-3">
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
            </div>
            <div className="mb-3">
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
              <div className="m-3">
                <input type="submit" value="Enviar" className="btn"></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
