import React from "react";
import catImage from "../../img/cat.png";

export const UserForm = ({
  handleChange,
  handleSubmit,
  user,
  setPasswordCheck,
  passwordCheck,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-8 p-5">
          <h2 className="titlesesion my-5">Registro usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre
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
                Apellidos
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
                Email
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
                Contraseña
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
                Repetir contraseña
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
    </>
  );
};
