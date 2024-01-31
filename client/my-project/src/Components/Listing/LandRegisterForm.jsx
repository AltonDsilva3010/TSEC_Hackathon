import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { connectWallettoLand } from "../../utils/functions";

const LandRegisterForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { provider, signer, contractland } = connectWallettoLand(dispatch);
  }, []);

  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);
  const [LandDetails, setLandDetails] = React.useState({
    address: "",
    areaSize: "",
    unit: "",
    description: "",
    price: "",
    images: [],
  });

  const [IPFSHashes, setIPFSHashes] = useState([]);

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

    // Update state with the selected images
    setLandDetails((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImagesArray],
    }));

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
        setIPFSHashes((prevHashes) => [...prevHashes, ImgHash]);
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
      let formData = new FormData();
      formData.append("addressland", LandDetails.address);
      formData.append("areaSize", LandDetails.areaSize);
      formData.append("description", LandDetails.description);
      formData.append("price", LandDetails.price);
      formData.append("images", IPFSHashes);
      // addUser(formData, globalState, navigator);
      console.log(LandDetails);
      const { contract } = globalState;
      const { signer } = globalState;
      console.log(contract);
      try {
        const transaction = await contractland.mint(
          signer,
          "https://gateway.pinata.cloud/ipfs/QmS397wrvErhY55fEbeMY7PCQXUGi5iiiYSqaLdGRrRh6u"
        );
        const rc = await transaction.wait();
        console.log("RC", rc);
        toast.success("Successfully Registered");
        // dispatch(setIsLoggedIn());
      } catch (error) {
        toast.error("Something Went Wrong . Please Try Again ");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex  justify-center bg-gray-100 w-3/5 mt-[20px]">
      <div className="bg-white w-full p-[40px] rounded-lg shadow-md ">
        <h2 className="text-xl relative font-semibold text-gray-700 text-center mb-4">
          List a plot of Land
        </h2>

        <form className="space-y-4">
          <div className="flex flex-col w-full justify-between gap-[50px]">
            <div className="w-full">
              <div className="flex">
                <div className="w-[50%]">
                  <input
                    type="number"
                    id="farmer-name"
                    name="areaSize"
                    placeholder="Enter Land AreaSize"
                    value={LandDetails.areaSize}
                    onChange={handleChange}
                    className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="border  flex items-center w-[50%] border-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 visited:border-none">
                  <select
                    className="border-none w-[100%]  p-[8px]"
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
                  className="form-input mr-[10px] mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
                {/* dropdown here instead of text */}
              </div>
              <div className="flex justify-between mt-[10px]">
                {/* DropDown Here */}
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={LandDetails.price}
                  onChange={handleChange}
                  className="form-input mt-1 mr-[10px] block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                  className="form-control form-control-lg"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {LandDetails.images.length > 0 && (
                <div>
                  <h2>Selected Images:</h2>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {LandDetails.images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "150px",
                          height: "150px",
                          marginRight: "10px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={submitForm}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandRegisterForm;
