
import { ethers } from "ethers";
import RegistrationABI from "../../contract/UserRegistration.json"
import { setStateDetails , setIsLoggedIn } from "../ReduxStore/slices/globalStateSlice";
import { useDispatch, useSelector } from "react-redux";


export const connectWallet = async (dispatch) => {

    const ContractAddress = "0xAFd2e7A378862801696F04F7A0a65A9DE7573FFa";
    const ContractABI = RegistrationABI.abi;
    try {
      let provider = new ethers.BrowserProvider(window.ethereum);
      let signer = await provider.getSigner();
      const contract = new ethers.Contract(
        ContractAddress,
        ContractABI,
        signer
      );
      console.log(provider,signer,contract)
      dispatch(setStateDetails({provider,signer,contract}))

      const transaction = await contract.getUserBoolean(signer);
      console.log(transaction)
      if(transaction == true)
        dispatch(setIsLoggedIn())
      
    } catch (error) {
      console.log(error);
    }
  };
