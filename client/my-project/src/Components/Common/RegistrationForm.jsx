import React from "react";
import { toast } from "react-toastify";
import { connectWallet } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Apis/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../ReduxStore/slices/globalStateSlice";
import registImage from "../../assets/images/register.jpg"
import Header from "./Header"
const RegistrationForm = () => {
  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [userDetails, setUserDetails] = React.useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    pinCode: "",
  });

  const [otpVerify, setOtpVerify] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const handleOTP = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setOtp(e.target.value);
  };
  const sendOTP = (phoneNumber)=>{
    axios.post("http://localhost:3001/send-otp" , {phoneNumber})
    .then(res => {
      if(res.data.success){
        toast.success("OTP sent Successfully")
      }else{
        toast.error("Failed to send OTP")
      }
    })
    .catch(err => {
      console.log(err)
      toast.error("Failed To send Otp")
    })
  }

  const verifyOTP = (obj)=>{
    axios.post("http://localhost:3001/verify-otp" , obj)
    .then(res => {
      if(res.data.success){
        toast.success("OTP verified Successfully")
      }else{
        toast.error("Invalid OTP")
      }
    })
    .catch(err => {
      console.log(err)
      toast.error("Error verifying OTP")
    })
  }
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // check whether entered otp is correct or not
    // set is mobile Verify
    if(otp === ""){
      toast.error("Enter OTP first")
      return
    }
    console.log(otp)
    const obj = {
      "phoneNumber" : userDetails.mobileNumber,
      "otp" : otp
    }
    verifyOTP(obj)
    setOtpVerify(true);
  };



  const handleOtpVerificationBtnClick = (e) => {
    e.preventDefault();
    console.log(userDetails.mobileNumber);
    if (userDetails.mobileNumber != "") {
      setOtpVerify((prev) => !prev);
      sendOTP(userDetails.mobileNumber)
    } else {
      toast.error("Enter Mobile Number First ");
    }
  };

  const isBtnDisabled = () => {
    if (
      userDetails.mobileNumber === "" ||
      userDetails.address === "" ||
      userDetails.pinCode === "" ||
      userDetails.fullName === "" ||
      userDetails.walletAddress === "" ||
      userDetails.email === ""
    ) {
      return true;
    }

    return false;
  };
  const submitForm = async (e) => {
    e.preventDefault();

    if (isBtnDisabled()) {
      console.log("Inside submit");
      toast.error("Please Fill Form Completely");
      return;
    } else if (!otpVerify) {
      toast("Please Verify Mobile First");
      return;
    } else {
      // console.log(userDetails)
      let formData = new FormData();
      formData.append("name", userDetails.fullName);
      formData.append("email", userDetails.email);
      formData.append("location", userDetails.address);
      formData.append("phone", userDetails.mobileNumber);
      formData.append("metamaskWalletAddress", userDetails.walletAddress);
      formData.append("pincode", userDetails.pinCode);

      const { contract } = globalState;
      const { signer } = globalState;
      console.log(contract);
      try {
        const transaction = await contract.registerUser(
          userDetails.fullName,
          userDetails.email,
          userDetails.mobileNumber,
          userDetails.address,
          userDetails.pinCode
        );
        const rc = await transaction.wait();
        console.log("RC", rc);
        toast.success("Successfully Registered");
        dispatch(setIsLoggedIn());
      } catch (error) {
        toast.error("Something Went Wrong . Please Try Again ");
      }

      // addUser(formData, globalState, navigator);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleConnectWallet = async (e) => {
    e.preventDefault();
    const res = await connectWallet();
    console.log(res);
    if (!res.error) {
      setUserDetails({
        ...userDetails,
        ["walletAddress"]: res.message,
      });
      // setuserDetails["walletAddress"] = address
      return;
    } else {
      toast(res.message);
    }
  };
  return (
    <div className="w-[100%] h-[100%]">
      <Header/>
    <div className="flex justify-center bg-gray-100 w-[90%] h-[500px] m-auto mt-[80px]">
      <div class="w-[60%] bg-cover" style={{backgroundImage: `url(${registImage})`}}></div>
      <div className="bg-white w-[40%] p-[40px] rounded-lg shadow-md ">
        <h2 className="text-xl relative font-semibold text-gray-700 text-center mb-4">
          Register
        </h2>

        <form className="space-y-4">
          <div className="flex flex-col w-full justify-between gap-[50px]">
            <div className="w-full">
              <div className="flex">
                <input
                  type="text"
                  id="farmer-name"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={userDetails.fullName}
                  onChange={handleChange}
                  className="form-input mt-1 mr-[10px] block indent-1.5 h-[40px] w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex mt-[10px]">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={userDetails.email}
                  onChange={handleChange}
                  className="form-input mr-[10px] mt-1 block indent-1.5 w-full h-[40px] border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex justify-between mt-[10px]">
                {/* DropDown Here */}
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={handleChange}
                  className="form-input mt-1 mr-[10px] indent-1.5 block w-full h-[40px] border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                {/* dropdown here instead of text */}
                <input
                  type="text"
                  name="pinCode"
                  placeholder="PinCode"
                  value={userDetails.pinCode}
                  onChange={handleChange}
                  className="form-input mt-1 indent-1.5 block w-full border rounded-md h-[40px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between mt-[10px]">
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={userDetails.mobileNumber}
                    onChange={handleChange}
                    className="form-input indent-1.5 mt-1 block w-full border rounded-md h-[40px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                  <button
                    className="bg-blue-500 text-white rounded-md ml-[10px] h-full"
                    onClick={handleOtpVerificationBtnClick}
                  >
                    Verify Number
                  </button>
                </div>
                {otpVerify && (
                  <div className="flex justify-between items-center mt-[10px]">
                    <input
                      type="text"
                      onChange={handleOTP}
                      value={otp}
                      placeholder="Enter Otp Here"
                      className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />

                    <button
                      className="bg-blue-500 p-[12px] text-white rounded-md ml-[10px] h-full"
                      onClick={handleOtpSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
              {/* <div>
                <label
                  htmlFor="contract-address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Metamask Wallet Address
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  value={userDetails.walletAddress}
                  onChange={handleChange}
                  id="contract-address"
                  disabled
                  className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                <button
                  className="bg-blue-500 py-[5px] px-[12px] text-white mt-[8px] rounded-lg"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              </div> */}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full w-full h-[40px] hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={submitForm}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};
export default RegistrationForm;
