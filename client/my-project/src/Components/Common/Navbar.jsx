import React from 'react'
import { ethers } from "ethers";
import HeroImage from "../../assets/images/HeroImage_1.jpg"
import Logo from "../../assets/images/logo.jpg"
import { useSelector , useDispatch} from 'react-redux'
import {getOwnerAddress, setIsLoggedIn} from "../../ReduxStore/slices/globalStateSlice"
import {NavLink} from 'react-router-dom'
import RegistrationABI from "../../contracts/UserRegistration.json";
import {connectWallet} from '../../utils/functions'

const Navbar = () => {
    const address = useSelector(state => state.globlaStateSlice.address)
    const isLoggedIn = useSelector(state => state.globlaStateSlice.isLoggedIn)

    const dispatch = useDispatch()

    const connectWallets = async (dispatch) => {
    const ContractAddress = "0x417Bf7C9dc415FEEb693B6FE313d1186C692600F";
    const ContractABI = RegistrationABI.abi;
    try {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        console.log(provider, signer, contract);
        dispatch(setStateDetails({ provider, signer, contract }));

        const transaction = await contract.getUserBoolean(signer);
        console.log(transaction);
        if (transaction == true) dispatch(setIsLoggedIn());
    } catch (error) {
        console.log(error);
    }
    };

    return (
        <div className="none">
            <div className='p-[10px] w-full leading-3'>
                <div className='flex justify-between items-center w-[85%] m-auto'>
                    <div className='flex items-center ml-[10] mt-[20px]'>
                        <img
                            className='object-contain w-[50px] h-[50px] mr-[5px]'
                            src={Logo} alt='logo' />
                            <h1 className='font-bold text-2xl'>Estate Chain</h1>
                    </div>
                    {console.log(isLoggedIn)}
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

            <div className='absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%]'>
                <h3 className='text-[50px] font-bold text-center'>
                    Every Home has Potential <br></br> to inspire
                </h3>
                {isLoggedIn ? <div className='text-center mt-[20px]'>
                    <button className='custom-button mr-[10px]'>
                        {address ? address.slice(0,10) + "....." + address.slice(38,42) : "Connect Wallet"}
                    </button>
                </div> : 
                <div className='text-center mt-[20px]'>
                <button className='custom-button mr-[10px]'>
                    {address ? address.slice(0,10) + "....." + address.slice(38,42) : "Connect Wallet"}
                </button>
                <NavLink to ='/register' className='custom-button'>
                Register
                </NavLink>
            </div>}
            </div>
        </div>
    )
}

export default Navbar