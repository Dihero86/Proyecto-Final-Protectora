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
  const [loginerror, setError] = useState(false)

  const handleChange = ({ target }) => {
    setUserAccess({ ...userAccess, [target.name]: target.value });
  };

  const handleSubmbit = async (e) => {
    e.preventDefault();
    const data = await loginUser(userAccess);
    if (data == undefined) {
      setError(true)
    }
    else {
      if (data.rol == "admin" || data.rol == "volunteer") {
        navigate("/company_dashboard")
      }
      else {
        navigate("/pet_gallery")
      }
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

          <form className="d-flex flex-column m-auto f-login" onChange={handleChange} onSubmit={handleSubmbit}>

            <label htmlFor="inputEmail" className="form-label">
              EMAIL
            </label>
            <input
              type="email"
              className="form-control inp-login"
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
              className="form-control inp-login"
              name="password"
              id="inputPassword"
              value={userAccess.password}
              required
            ></input>
            {loginerror ? <p className="errorlogin">Usuario o contraseña no validos</p> : null}
            <button type="submit" value="Enviar" className="btn">Enviar</button>

          </form>
        </div>
      </div>
    </div>
  );
};
