import { ethers } from "ethers";
import RegistrationABI from "../contracts/UserRegistration.json";
import PropertyABI from "../contracts/PropertyMarket.json";
import {
  setStateDetails,
  setIsLoggedIn,
} from "../ReduxStore/slices/globalStateSlice";
import { useDispatch, useSelector } from "react-redux";

export const connectWallet = async (dispatch) => {
  const ContractAddress = "0x5Ab80351b6FAf4A80c348ebff4f40E9BC5282eAC";
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

// export const connectWallettoLand = async (dispatch) => {
//   const ContractAddress = "0x6acb49cdc584b5c9f4059E0Cb51d0716bA7c0D8B";
//   const ContractABI = PropertyABI.abi;
//   try {
//     let provider = new ethers.BrowserProvider(window.ethereum);
//     let signer = await provider.getSigner();
//     const contractland = new ethers.Contract(
//       ContractAddress,
//       ContractABI,
//       signer
//     );
//     // console.log(provider, signer, contract);
//     // dispatch(setStateDetails({ provider, signer, contract }));
//     return { provider, signer, contractland };
//     // const transaction = await contract.mint();
//     // console.log(transaction);
//     console.log("Connected to Land contract");
//   } catch (error) {
//     console.log(error);
//   }
// };
