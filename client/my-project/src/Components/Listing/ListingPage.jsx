import React from "react";
import { Outlet } from "react-router-dom";

const ListingPage = () => {
  return (
    <div className="flex justify-center">
      <Outlet />
    </div>
  );
};

export default ListingPage;
