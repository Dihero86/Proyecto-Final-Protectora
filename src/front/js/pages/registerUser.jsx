import React, { useState } from "react";
import "../../styles/registerUser.css";
import { UserForm } from "../component/userForm.jsx";
import { addNewUser } from "../service/user";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
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
      addNewUser(user);
      navigate("/login_user");
    } else {
      console.log("las contraseñas no coinciden");
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="row ">
      <h1 className="title m-5">Empieza a adoptar</h1>
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
