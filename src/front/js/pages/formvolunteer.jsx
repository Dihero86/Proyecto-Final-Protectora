import React, { useState, useEffect, useContext } from "react";
import { UserForm } from "../component/userForm.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addNewVolunteer } from "../service/user.js";

export const FormVolunteer = () => {
  const params = useParams();

  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password == passwordCheck) {
      addNewVolunteer(params.company_id, user);

      // navigate("/login_user");
    } else {
      alert("las contraseñas no coinciden");
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="container-fluid p-0">
      <UserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
        setPasswordCheck={setPasswordCheck}
        passwordCheck={passwordCheck}
      />
    </div>
  );
};
