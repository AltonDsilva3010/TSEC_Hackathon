import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
