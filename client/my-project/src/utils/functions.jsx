
import { ethers } from "ethers";
import RegistrationABI from "../../contract/UserRegistration.json"
import { setStateDetails } from "../ReduxStore/slices/globalStateSlice";

export const connectWallet = async (dispatch) => {
    const ContractAddress = "0x896b3098f4bDe0586dd352e3a1B9Aa2c978C8DF9";
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
      
    } catch (error) {
      console.log(error);
    }
  };