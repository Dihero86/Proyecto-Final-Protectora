import React from "react";
import "../../styles/registerUser.css";
import { UserForm } from "../component/userForm.jsx";

export const RegisterUser = () => {
  return (
    <div className="row ">
      <h1 className="title m-5">Regístrate y empieza a adoptar</h1>
      <UserForm />
    </div>
  );
};
