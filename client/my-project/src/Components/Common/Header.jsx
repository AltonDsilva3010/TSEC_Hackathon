import React from 'react'
import Logo from "../../assets/images/logo.jpg"
import { useSelector } from 'react-redux'
const Header = () => {
    const address = useSelector(state => state.globlaStateSlice.address)
    return (
        <div>
            <div className='p-[15px] bg-slate-100 shadow-lg w-full leading-3'>
                <div className='flex justify-between items-center w-[85%] m-auto'>
                    <div className='flex items-center ml-[10] '>
                        <img
                            className='object-contain w-[50px] h-[50px] mr-[5px]'
                            src={Logo} alt='logo' />
                        <h1 className='font-bold text-2xl'>Estate Chain</h1>
                    </div>
                    <div>
                        <button className='font-black custom-button text-xl p-[5px] mr-[30px] border-b-2'>
                            {address ? address.slice(0, 10) + "....." + address.slice(38, 42) : "Connect Wallet"}
                        </button>
                        <button className='font-black custom-button text-xl p-[5px] border-b-2'>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header