import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import { Outlet } from 'react-router-dom'
import Navbar from "./Components/common/Navbar";
function App() {

  return (
    <div className="App">
      <div className="flex flex-col margin-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
