import React from 'react'
import Logo from "../../assets/images/logo.jpg"
const Navbar = () => {
    return (
        <div className='flex justify-between w-full'>

            <img 
                className='object-contain w-[50px] h-[50px]'
             src={Logo} alt='logo'  />
            <div>
                <button>
                    Connect Wallet
                </button>
                <button>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Navbar