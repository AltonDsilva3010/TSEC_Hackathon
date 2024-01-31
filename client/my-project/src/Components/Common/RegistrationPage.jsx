import React from "react";
import RegistrationForm from "./RegistrationForm";
import { Outlet } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <div className="flex justify-center ">
      <Outlet />
    </div>
  );
};

export default RegistrationPage;
