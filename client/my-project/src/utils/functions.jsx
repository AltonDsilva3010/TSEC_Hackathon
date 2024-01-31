import { ethers } from "ethers";
import RegistrationABI from "../contracts/UserRegistration.json";
import PropertyABI from "../contracts/PropertyMarket.json";
import {
  setStateDetails,
  setIsLoggedIn,
} from "../ReduxStore/slices/globalStateSlice";
import { useDispatch, useSelector } from "react-redux";

export const connectWallet = async (dispatch) => {
  const ContractAddress = "0xeD22e0a3BBCDd3B7A783EA2e80e401eeD61fF109";
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

export const connectWallettoLand = async (dispatch) => {
  const ContractAddress = "0xB8C7F1bB3014102AED9EB78146e16Ba6fD573A29";
  const ContractABI = PropertyABI.abi;
  try {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const contractland = new ethers.Contract(
      ContractAddress,
      ContractABI,
      signer
    );
    // console.log(provider, signer, contract);
    // dispatch(setStateDetails({ provider, signer, contract }));
    return { provider, signer, contractland };
    // const transaction = await contract.mint();
    // console.log(transaction);
    console.log("Connected to Land contract");
  } catch (error) {
    console.log(error);
  }
};

