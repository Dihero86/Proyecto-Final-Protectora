import React from "react";
import "../../styles/registerUser.css";
import { UserForm } from "../component/userForm.jsx";

const RegisterUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return <UserForm handleSubmit={handleSubmit} handleChange={handleChange} />;
};

export default RegisterUser;
