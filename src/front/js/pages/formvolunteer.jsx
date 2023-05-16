import React, { useState, useEffect, useContext } from "react";
import { UserForm } from "../component/userForm.jsx";

export const FormVolunteer = () => {
  return (
    <div className="row">
      <h1 className="title m-5">Empieza a colaborar como voluntario</h1>
      <UserForm />
    </div>
  );
};
