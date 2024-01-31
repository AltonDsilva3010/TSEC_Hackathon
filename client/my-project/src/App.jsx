import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from './Components/Common/Navbar'
import { connectWallet } from './utils/functions'
import { useSelector ,useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  React.useEffect(()=>{
    connectWallet(dispatch)
  },[])
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
