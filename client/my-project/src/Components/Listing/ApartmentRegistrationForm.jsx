import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Common/Header";
import registImage from "../../assets/images/register.jpg"

const ApartmentRegistrationForm = () => {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const { provider, signer, contractland } = connectWallettoLand(dispatch);
  //   }, []);

  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);
  const [LandDetails, setLandDetails] = React.useState({
    address: "",
    areaSize: "",
    noRooms: "",
    parking: false,
    unit: "",
    description: "",
    price: "",
    images: "",
  });

  const isBtnDisabled = () => {
    if (
      LandDetails.areaSize === "" ||
      LandDetails.address === "" ||
      LandDetails.description === "" ||
      LandDetails.price === ""
    ) {
      return true;
    }

    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "landimages") {
    }
    setLandDetails({
      ...LandDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = event.target.files;
    const newImagesArray = Array.from(files);

    //Upload to the new image to IPFS
    newImagesArray.map(async (singleImage) => {
      console.log(singleImage);
      let ImgHash;
      try {
        const formDataNew = new FormData();
        formDataNew.append("file", singleImage);

        // console.log(file[i]);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formDataNew,
          headers: {
            pinata_api_key: "403a4001d5cc63b3ce0f",
            pinata_secret_api_key:
              "cd44bc63c6fdbabc149ce19412cc7c049d2ee4e5477ce8e9f824ef323a8a0c30",
            "Content-Type": "multipart/form-data",
          },
        });

        ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        LandDetails.images = ImgHash
        console.log(ImgHash);
      } catch (error) {
        console.log(error);
        console.log("Unable to Upload the Image");
      }
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (isBtnDisabled()) {
      console.log("Inside submit");
      toast.error("Please Fill Form Completely");
      return;
    } else {
      // console.log(userDetails)
      // addUser(formData, globalState, navigator);
      console.log(LandDetails);
      const { contract } = globalState;
      const { signer } = globalState;

      const data = JSON.stringify({
        pinataContent: {
          LandDetails
        },
        pinataMetadata: {
          name: "metadata.json",
        },
      });

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        headers: {
          pinata_api_key: `403a4001d5cc63b3ce0f`,
          pinata_secret_api_key: `cd44bc63c6fdbabc149ce19412cc7c049d2ee4e5477ce8e9f824ef323a8a0c30`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      console.log(contract);
      try {
        const transaction = await contract.mintApt(
          signer,
          "https://gateway.pinata.cloud/ipfs/QmS397wrvErhY55fEbeMY7PCQXUGi5iiiYSqaLdGRrRh6u",
          LandDetails.address,
          LandDetails.areaSize,
          LandDetails.noRooms,
          LandDetails.parking,
          LandDetails.unit,
          LandDetails.description,
          LandDetails.images,
          LandDetails.price
        );
        const receipt = await transaction.wait();

        const num = await contract.getTokenApt();

        console.log(num)

        console.log(parseInt(num.toString()));

        toast.success("Successfully Registered");
        // dispatch(setIsLoggedIn());
      } catch (error) {
        toast.error("Something Went Wrong . Please Try Again ");
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[100%] h-[100%]">
      <Header />
      <div className="flex justify-center bg-gray-100 w-[90%] h-[600px] m-auto mt-[80px]">
        <div class="w-[60%] bg-cover" style={{ backgroundImage: `url(${registImage})` }}></div>
        <div className="bg-white w-[40%] p-[40px] rounded-lg shadow-md ">
          <h2 className="text-xl relative font-semibold text-gray-700 text-center mb-4">
            List a plot of Land
          </h2>

          <form className="space-y-4">
            <div className="flex flex-col w-full justify-between gap-[50px]">
              <div className="w-full">
                <div className="flex flex-col">
                  <div className="w-full">
                    <input
                      type="number"
                      id="farmer-name"
                      name="areaSize"
                      placeholder="Enter Land AreaSize"
                      value={LandDetails.areaSize}
                      onChange={handleChange}
                      className="form-input mt-1 mb-[20px] indent-1.5 h-[40px] mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="border  flex items-center w-full border-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 visited:border-none">
                    <select
                      className="border-none w-[100%]  p-[8px] indent-1.5 h-[40px]"
                      onChange={handleChange}
                      name="unit"
                      value={LandDetails.unit}
                    >
                      <option value="">Select unit</option>
                      <option value={"Gundhas"}>Gundhas</option>
                      <option value={"Acres"}>Acres</option>
                      <option value={"Hectares"}>Hectares</option>
                    </select>
                  </div>
                </div>
                <div className="flex mt-[10px]">
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Address of the Plot"
                    value={LandDetails.address}
                    onChange={handleChange}
                    className="form-input mr-[10px] mt-1 block w-full border indent-1.5 h-[40px] rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="flex justify-between mt-[10px]">
                  {/* DropDown Here */}
                  <input
                    type="text"
                    name="description"
                    placeholder="Description for the Land(Geography)"
                    value={LandDetails.description}
                    onChange={handleChange}
                    className="form-input mt-1 mr-[10px] block w-full border rounded-md indent-1.5 h-[40px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                  {/* dropdown here instead of text */}
                </div>
                <div className="w-full mt-[10px]">
                  <input
                    type="number"
                    id="farmer-name"
                    name="noRooms"
                    placeholder="Enter Number of Rooms"
                    value={LandDetails.noRooms}
                    onChange={handleChange}
                    className="form-input mt-1 mb-[20px] indent-1.5 h-[40px] mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div className="w-full mt-[10px]">
                  Parking Available :
                  <div className="flex ">
                    <label className="mr-[10px]">
                      <input
                        type="radio"
                        name="parking"
                        value="yes"
                        checked={LandDetails.parking === 'yes'}
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                   
                    <label>
                      <input
                        type="radio"
                        name="parking"
                        value="no"
                        checked={LandDetails.parking === 'no'}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-[10px]">
                  {/* DropDown Here */}
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={LandDetails.price}
                    onChange={handleChange}
                    className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 indent-1.5 h-[40px] focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                  {/* dropdown here instead of text */}
                </div>
                <div className="flex mt-[10px]">
                  <label for="link">Add images: </label>
                  <input
                    type="file"
                    name="landImages"
                    id="link"
                    multiple="multiple"
                    className="form-control form-control-lg indent-1.5 h-[40px]"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none w-full indent-1.5 h-[40px] focus:ring focus:ring-blue-200"
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

export default ApartmentRegistrationForm;
