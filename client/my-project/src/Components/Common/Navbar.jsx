import React from 'react'
import Logo from "../../assets/images/logo.jpg"
import { useSelector } from 'react-redux'
import {getOwnerAddress} from "../../ReduxStore/slices/globalStateSlice"

const Navbar = () => {

    const address = useSelector(state => state.globlaStateSlice.address)
    
    return (
        <div className='flex justify-center p-[10px] w-full mt-[10px] shadow-lg z-40'>
            <div className='flex justify-between items-center w-[85%] margin-auto'>
                <div className='flex items-center'>
                    <img
                        className='object-contain w-[50px] h-[50px] mr-[5px]'
                        src={Logo} alt='logo' />
                        <h1 className='font-bold'>Estate Chain</h1>
                </div>
                <div>
                    <button className='custom-button mr-[10px]'>
                        {address ? address.slice(0,10) + "....." + address.slice(38,42) : "Connect Wallet"}
                    </button>
                    <button className='custom-button'>
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar