import React from 'react'
import Logo from "../../assets/images/logo.jpg"
const Navbar = () => {
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
                        Connect Wallet
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