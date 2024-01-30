import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  useEffect(() => {
    // console.log(globalState);
    const connectWallet = async () => {
      // const FarmerContractAddress =
      //   "0xA5a0576C188Fad245706A5a53Aa5BDc3038DdaF4";
      // const FarmerContractABI = FarmerABI.abi;
      // try {
      //   let provider = new ethers.BrowserProvider(window.ethereum);
      //   let signer = await provider.getSigner();
      //   const contract = new ethers.Contract(
      //     FarmerContractAddress,
      //     FarmerContractABI,
      //     signer
      //   );
      //   // console.log(provider, signer, contract);
      //   dispatch(setStateDetails({ provider, signer, contract }));
      //   // setState({ provider, signer, contract });
      // } catch (error) {
      //   console.log(error);
      // }
    };

    connectWallet();
    //Backend Login Function
  }, []);
  return (
    <div className="App">
      <h1>Helllo</h1>
    </div>
  );
}

export default App;
