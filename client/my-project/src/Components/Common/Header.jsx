import React from 'react'
import Logo from "../../assets/images/logo.jpg"
import { useSelector , useDispatch} from 'react-redux'
import {getOwnerAddress, setIsLoggedIn} from "../../ReduxStore/slices/globalStateSlice"
import { NavLink } from 'react-router-dom'
const Header = () => {
    const address = useSelector(state => state.globlaStateSlice.address)
    const isLoggedIn = useSelector(state => state.globlaStateSlice.isLoggedIn)
    return (
        <NavLink to={"/"}>
            <div className='p-[15px] bg-slate-50 shadow-lg w-full leading-3'>
                <div className='flex justify-between items-center w-[85%] m-auto'>
                    <div className='flex items-center ml-[10] '>
                        <img
                            className='object-contain w-[50px] h-[50px] mr-[5px]'
                            src={Logo} alt='logo' />
                        <h1 className='font-bold text-2xl'>Estate Chain</h1>
                    </div>
                     {isLoggedIn ? <div>
                        <button className='font-black hover:custom-button text-xl p-[5px] mr-[30px] border-b-2' onClick={(event) => connectWallets(event)}>
                        {address ? address.slice(0,6) + "....." + address.slice(38,42) : "Connect Wallet"}
                        </button>
                        <NavLink to ='/listing' className='font-black hover:custom-button text-xl p-[5px] mr-[30px] border-b-2' onClick={(event) => connectWallets(event)}>
                        Sell Land
                        </NavLink>
                        <NavLink to ='/listingapt' className='font-black hover:custom-button text-xl p-[5px] mr-[30px] border-b-2' onClick={(event) => connectWallets(event)}>
                        Sell Apartment
                        </NavLink>
                    </div> : <div>
                        <button className='font-black hover:custom-button text-xl p-[5px] mr-[30px] border-b-2' onClick={(event) => connectWallets(event)}>
                        {address ? address.slice(0,6) + "....." + address.slice(38,42) : "Connect Wallet"}
                        </button>
                        <NavLink to ='/register' className='font-black hover:custom-button text-xl p-[5px] border-b-2'>
                            Register
                        </NavLink>
                    </div>}
                </div>
            </div>
        </NavLink>
    )
}

export default Header